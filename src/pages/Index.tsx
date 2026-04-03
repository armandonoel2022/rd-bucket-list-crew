import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroBanner from "@/components/HeroBanner";
import RecommendationCard from "@/components/RecommendationCard";
import AddRecommendationForm from "@/components/AddRecommendationForm";
import { Route, loadRoutes, saveRoutes } from "@/lib/bucketListData";

const Index = () => {
  const [routes, setRoutes] = useState<Route[]>(loadRoutes);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    saveRoutes(routes);
  }, [routes]);

  const update = useCallback((fn: (draft: Route[]) => void) => {
    setRoutes((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      fn(next);
      return next;
    });
  }, []);

  const activeRoute = routes[activeTab];
  const totalVisited = routes.reduce((s, r) => s + r.items.filter((i) => i.visited).length, 0);
  const totalItems = routes.reduce((s, r) => s + r.items.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner />

      {/* Stats bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="card-caribbean p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-primary">{totalItems}</p>
              <p className="text-xs text-muted-foreground">Lugares</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-accent">{totalVisited}</p>
              <p className="text-xs text-muted-foreground">Visitados</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-display font-bold text-secondary">{totalItems - totalVisited}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: totalItems ? `${(totalVisited / totalItems) * 100}%` : "0%" }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 text-right">
              {totalItems ? Math.round((totalVisited / totalItems) * 100) : 0}% completado
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide">
          {routes.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveTab(i)}
              className={`tab-caribbean whitespace-nowrap ${i === activeTab ? "active" : ""}`}
            >
              {r.icon} {r.name}
              <span className="ml-1.5 text-xs opacity-70">({r.items.length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {activeRoute.items.map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              onToggleVisited={() =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) it.visited = !it.visited;
                })
              }
              onDelete={() =>
                update((d) => {
                  d[activeTab].items = d[activeTab].items.filter((x) => x.id !== item.id);
                })
              }
              onVote={(friend) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (!it) return;
                  if (it.votes.includes(friend)) {
                    it.votes = it.votes.filter((v) => v !== friend);
                  } else {
                    it.votes.push(friend);
                  }
                })
              }
              onAddComment={(author, text) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) it.comments.push({ author, text });
                })
              }
            />
          ))}
        </AnimatePresence>

        <AddRecommendationForm
          onAdd={(name, description, directions) =>
            update((d) => {
              d[activeTab].items.push({
                id: Math.random().toString(36).slice(2, 10),
                name,
                description,
                directions,
                visited: false,
                votes: [],
                comments: [],
              });
            })
          }
        />
      </div>

      {/* Footer */}
      <footer className="bg-ocean-deep text-card/80 text-center py-8 mt-12">
        <p className="font-display text-lg text-card">
          Hecho con ❤️ para Juan Carlos, Matilde, Ruth y Armando
        </p>
        <p className="text-sm mt-1 text-card/60">
          Próximo viaje: Septiembre 2025 🌴
        </p>
      </footer>
    </div>
  );
};

export default Index;
