import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroBanner from "@/components/HeroBanner";
import RecommendationCard from "@/components/RecommendationCard";
import AddRecommendationForm from "@/components/AddRecommendationForm";
import LoginScreen from "@/components/LoginScreen";
import VoteAlert from "@/components/VoteAlert";
import RouteMap from "@/components/RouteMap";
import RouteStops from "@/components/RouteStops";
import Dashboard from "@/components/Dashboard";
import { Route, loadRoutes, saveRoutes, getCurrentUser, setCurrentUser, clearCurrentUser } from "@/lib/bucketListData";

const Index = () => {
  const [routes, setRoutes] = useState<Route[]>(loadRoutes);
  const [activeTab, setActiveTab] = useState(0);
  const [user, setUser] = useState<string | null>(getCurrentUser);
  const [voteAlert, setVoteAlert] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    saveRoutes(routes);
  }, [routes]);

  const handleLogin = (name: string) => {
    setCurrentUser(name);
    setUser(name);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setUser(null);
  };

  const update = useCallback((fn: (draft: Route[]) => void) => {
    setRoutes((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      fn(next);
      return next;
    });
  }, []);

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const activeRoute = routes[activeTab];
  const totalVisited = routes.reduce((s, r) => s + r.items.filter((i) => i.visited).length, 0);
  const totalItems = routes.reduce((s, r) => s + r.items.length, 0);
  return (
    <div className="min-h-screen bg-background">
      <VoteAlert message={voteAlert} onDismiss={() => setVoteAlert(null)} />
      <HeroBanner />

      {/* User bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        <div className="card-caribbean p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-body">
              Hola, <span className="font-bold text-primary">{user}</span> 👋
            </p>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className={`text-xs font-bold transition-colors ${showDashboard ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                📊 Dashboard
              </button>
              <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cambiar usuario
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
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
      </div>

      {/* Dashboard */}
      {showDashboard && (
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <Dashboard routes={routes} />
        </div>
      )}

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
        {/* Map */}
        <RouteMap route={activeRoute} />

        {/* Fuel & rest stops */}
        <RouteStops
          fuelStops={activeRoute.fuelStops}
          restStops={activeRoute.restStops}
          onDeleteFuel={(id) => update((d) => { d[activeTab].fuelStops = d[activeTab].fuelStops.filter((f) => f.id !== id); })}
          onDeleteRest={(id) => update((d) => { d[activeTab].restStops = d[activeTab].restStops.filter((r) => r.id !== id); })}
          onAddFuel={(stop) => update((d) => { d[activeTab].fuelStops.push(stop); })}
          onAddRest={(stop) => update((d) => { d[activeTab].restStops.push(stop); })}
        />

        <AnimatePresence mode="popLayout">
          {activeRoute.items.map((item) => (
            <RecommendationCard
              key={item.id}
              item={item}
              currentUser={user}
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
                    setVoteAlert(`${user} votó por "${item.name}" 🎉`);
                  }
                })
              }
              onAddComment={(author, text) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) it.comments.push({ author, text });
                })
              }
              onUpdatePrice={(price) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) it.price = price;
                })
              }
              onUpdatePhoto={(url) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) it.photoUrl = url;
                })
              }
              onUpdateLocation={(lat, lng) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) { it.lat = lat; it.lng = lng; }
                })
              }
              onUpdateSocial={(field, value) =>
                update((d) => {
                  const it = d[activeTab].items.find((x) => x.id === item.id);
                  if (it) (it as any)[field] = value;
                })
              }
            />
          ))}
        </AnimatePresence>

        <AddRecommendationForm
          onAdd={(name, description, directions, price, photoUrl, lat, lng, facebook, instagram, menuUrl) =>
            update((d) => {
              d[activeTab].items.push({
                id: Math.random().toString(36).slice(2, 10),
                name, description, directions, price, photoUrl, lat, lng,
                facebook, instagram, menuUrl,
                visited: false, votes: [], comments: [],
              });
            })
          }
        />
      </div>

      {/* Footer */}
      <footer className="bg-ocean-deep text-card/80 text-center py-8 mt-12">
        <p className="font-display text-lg text-card">
          Próximo viaje: 2026 🌴
        </p>
      </footer>
    </div>
  );
};

export default Index;
