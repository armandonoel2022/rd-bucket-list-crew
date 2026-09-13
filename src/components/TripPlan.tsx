import { useState } from "react";
import { motion } from "framer-motion";
import {
  Route,
  Recommendation,
  FRIENDS,
  CATEGORY_LABELS,
  PlaceCategory,
  averageRating,
  totalStars,
  routeScore,
} from "@/lib/bucketListData";
import StarRating from "@/components/StarRating";

interface Props {
  routes: Route[];
  onToggleBreakfast: (routeId: string, itemId: string) => void;
}

const GROUPS: { key: PlaceCategory; title: string }[] = [
  { key: "restaurante", title: "🍽️ Restaurantes a visitar" },
  { key: "hotel", title: "🏨 Hospedaje" },
  { key: "playa", title: "🏖️ Playas y piscinas naturales" },
  { key: "atraccion", title: "🏞️ Atracciones y paseos" },
  { key: "cafe", title: "☕ Cafés y postres" },
  { key: "otro", title: "📌 Otros" },
];

const TripPlan = ({ routes, onToggleBreakfast }: Props) => {
  const ranked = [...routes]
    .map((r) => ({ route: r, score: routeScore(r) }))
    .sort((a, b) => b.score.stars - a.score.stars);

  const winner = ranked[0];
  const [selectedId, setSelectedId] = useState<string>(winner?.route.id ?? "");
  const selected = routes.find((r) => r.id === selectedId) ?? winner?.route;

  if (!selected) return null;

  const byCategory = (cat: PlaceCategory): Recommendation[] =>
    selected.items
      .filter((i) => (i.category ?? "otro") === cat)
      .sort((a, b) => totalStars(b) - totalStars(a));

  const placeRow = (item: Recommendation, isHotel: boolean) => (
    <div key={item.id} className="bg-muted rounded-lg p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground truncate">📍 {item.directions}</p>
          {item.price && <p className="text-xs text-muted-foreground mt-0.5">💰 {item.price}</p>}
        </div>
        <div className="shrink-0 text-right">
          <StarRating value={Math.round(averageRating(item))} size="sm" readOnly />
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {averageRating(item).toFixed(1)} · {totalStars(item)} ★ del grupo
          </p>
        </div>
      </div>
      {isHotel && (
        <button
          onClick={() => onToggleBreakfast(selected.id, item.id)}
          className={`mt-2 text-xs font-bold px-3 py-1 rounded-full transition-colors ${
            item.breakfastIncluded
              ? "bg-accent text-accent-foreground"
              : "bg-card text-muted-foreground border border-border hover:text-foreground"
          }`}
        >
          {item.breakfastIncluded ? "🥐 Desayuno incluido" : "Marcar desayuno incluido"}
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-foreground">🧭 Plan del Viaje</h2>

      {/* Winning route */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-caribbean p-4 border-l-4 border-l-secondary"
      >
        <p className="text-xs font-bold text-muted-foreground">RUTA GANADORA POR INTERÉS DEL GRUPO</p>
        <p className="font-display font-bold text-2xl text-foreground mt-1">
          {winner.route.icon} {winner.route.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {winner.score.stars} estrellas acumuladas · promedio {winner.score.avg.toFixed(1)} de 5
        </p>
      </motion.div>

      {/* Ranking */}
      <div className="card-caribbean p-4">
        <h3 className="font-display font-bold text-sm text-foreground mb-3">🏁 Ranking de rutas</h3>
        <div className="space-y-2">
          {ranked.map(({ route, score }, i) => (
            <button
              key={route.id}
              onClick={() => setSelectedId(route.id)}
              className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                route.id === selected.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"
              }`}
            >
              <span className="w-6 text-center font-display font-bold text-primary">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-sm font-bold truncate">{route.icon} {route.name}</span>
                <span className="block text-xs text-muted-foreground">
                  {score.rated} de {route.items.length} lugares calificados
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-sm font-bold text-secondary">{score.stars} ★</span>
                <span className="block text-[10px] text-muted-foreground">
                  de {FRIENDS.length * route.items.length * 5}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected route itinerary */}
      <div className="card-caribbean p-4 space-y-4">
        <h3 className="font-display font-bold text-base text-foreground">
          {selected.icon} Itinerario – {selected.name}
        </h3>

        {GROUPS.map(({ key, title }) => {
          const items = byCategory(key);
          if (!items.length) return null;
          return (
            <div key={key}>
              <p className="text-xs font-bold text-muted-foreground mb-2">
                {title} ({items.length})
              </p>
              <div className="space-y-2">{items.map((i) => placeRow(i, key === "hotel"))}</div>
            </div>
          );
        })}

        {/* Fuel stops */}
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2">
            ⛽ Estaciones de combustible ({selected.fuelStops.length})
          </p>
          {selected.fuelStops.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">Sin estaciones registradas.</p>
          ) : (
            <div className="space-y-2">
              {selected.fuelStops.map((f) => (
                <div key={f.id} className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-bold text-foreground">{f.name}</p>
                  {f.notes && <p className="text-xs text-muted-foreground">{f.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rest stops */}
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2">
            🛑 Paradores ({selected.restStops.length})
          </p>
          {selected.restStops.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">Sin paradores registrados.</p>
          ) : (
            <div className="space-y-2">
              {selected.restStops.map((s) => (
                <div key={s.id} className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-bold text-foreground">{s.name}</p>
                  {s.description && <p className="text-xs text-muted-foreground">{s.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground italic">
          Cada lugar se organiza por su categoría ({Object.values(CATEGORY_LABELS).join(", ")}). Puedes cambiarla desde la tarjeta del lugar.
        </p>
      </div>
    </div>
  );
};

export default TripPlan;
