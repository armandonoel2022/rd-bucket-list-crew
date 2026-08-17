import { supabase } from "@/integrations/supabase/client";
import { Route, DEFAULT_DATA, loadRoutes, mergeWithDefaults, saveRoutes } from "@/lib/bucketListData";

const STATE_ID = "rdx4";
const TABLE = "shared_state";

/**
 * Loads the shared trip data from the cloud.
 * If the cloud is still empty, it seeds it with whatever this device had locally
 * (or the defaults) so nothing is lost on the first migration.
 */
export async function fetchSharedRoutes(): Promise<Route[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", STATE_ID)
    .maybeSingle();

  if (error) {
    console.error("[cloudSync] fetch error", error);
    return loadRoutes();
  }

  if (data?.data) {
    const routes = mergeWithDefaults(data.data as unknown as Route[]);
    saveRoutes(routes);
    return routes;
  }

  // First run: seed the cloud with local data / defaults
  const seed = loadRoutes();
  await saveSharedRoutes(seed);
  return seed.length ? seed : DEFAULT_DATA;
}

export async function saveSharedRoutes(routes: Route[], user?: string | null) {
  saveRoutes(routes);
  const { error } = await supabase
    .from(TABLE)
    .upsert(
      {
        id: STATE_ID,
        data: routes as unknown as never,
        updated_by: user ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  if (error) console.error("[cloudSync] save error", error);
  return !error;
}

/** Realtime subscription: calls onChange whenever another device updates the data. */
export function subscribeSharedRoutes(onChange: (routes: Route[]) => void) {
  const channel = supabase
    .channel("shared_state_changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: TABLE, filter: `id=eq.${STATE_ID}` },
      (payload) => {
        const next = (payload.new as { data?: unknown } | null)?.data;
        if (next) {
          const routes = mergeWithDefaults(next as Route[]);
          saveRoutes(routes);
          onChange(routes);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
