import { Route, FRIENDS } from "@/lib/bucketListData";

interface Props {
  routes: Route[];
}

const Dashboard = ({ routes }: Props) => {
  // --- Ranking by votes ---
  const allItems = routes.flatMap((r) =>
    r.items.map((item) => ({ ...item, routeName: r.name, routeIcon: r.icon }))
  );
  const sortedByVotes = [...allItems].sort((a, b) => b.votes.length - a.votes.length);
  const top5 = sortedByVotes.slice(0, 5);

  // --- Cost per route ---
  const routeCosts = routes.map((r) => {
    const prices = r.items
      .map((i) => i.price)
      .filter(Boolean)
      .map((p) => {
        const match = p!.match(/[\d,.]+/);
        return match ? parseFloat(match[0].replace(",", "")) : 0;
      })
      .filter((n) => n > 0);
    const total = prices.reduce((s, n) => s + n, 0);
    return { route: r, total, count: prices.length };
  });
  const cheapest = [...routeCosts].filter((c) => c.total > 0).sort((a, b) => a.total - b.total)[0];

  // --- Vote consensus ---
  const unanimous = allItems.filter((i) => i.votes.length === FRIENDS.length);

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-xl text-foreground">📊 Dashboard Comparativo</h2>

      {/* Top 5 by votes */}
      <div className="card-caribbean p-4">
        <h3 className="font-display font-bold text-sm text-foreground mb-3">🏆 Top 5 – Más Votados</h3>
        {top5.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no hay votos. ¡Voten por sus lugares favoritos!</p>
        ) : (
          <div className="space-y-2">
            {top5.map((item, i) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="text-lg font-display font-bold text-primary w-6 text-center">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.routeIcon} {item.routeName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-primary">{item.votes.length}/{FRIENDS.length}</span>
                  <p className="text-[10px] text-muted-foreground">votos</p>
                </div>
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden shrink-0">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(item.votes.length / FRIENDS.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unanimous picks */}
      {unanimous.length > 0 && (
        <div className="card-caribbean p-4 border-l-4 border-l-accent">
          <h3 className="font-display font-bold text-sm text-foreground mb-2">🎯 Unanimidad – ¡Todos quieren ir!</h3>
          <div className="flex flex-wrap gap-2">
            {unanimous.map((item) => (
              <span key={item.id} className="badge-visited text-xs">
                {item.routeIcon} {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Cost comparison */}
      <div className="card-caribbean p-4">
        <h3 className="font-display font-bold text-sm text-foreground mb-3">💰 Comparación de Costos por Ruta</h3>
        <div className="space-y-3">
          {routeCosts.map(({ route, total, count }) => (
            <div key={route.id} className={`flex items-center gap-3 p-2 rounded-lg ${cheapest && cheapest.route.id === route.id ? "bg-accent/10 border border-accent/30" : ""}`}>
              <span className="text-lg">{route.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">{route.name}</p>
                <p className="text-xs text-muted-foreground">{count} precio{count !== 1 ? "s" : ""} registrado{count !== 1 ? "s" : ""}</p>
              </div>
              <div className="text-right shrink-0">
                {total > 0 ? (
                  <>
                    <p className="text-sm font-bold text-foreground">RD${total.toLocaleString()}</p>
                    {cheapest && cheapest.route.id === route.id && (
                      <span className="text-[10px] text-accent font-bold">✓ Más económica</span>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Sin precios</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 italic">
          * Basado en los precios registrados en cada recomendación. Agreguen precios para mejorar la comparación.
        </p>
      </div>

      {/* Per-friend engagement */}
      <div className="card-caribbean p-4">
        <h3 className="font-display font-bold text-sm text-foreground mb-3">👥 Actividad por Viajero</h3>
        <div className="grid grid-cols-2 gap-3">
          {FRIENDS.map((f) => {
            const voteCount = allItems.filter((i) => i.votes.includes(f)).length;
            const commentCount = allItems.reduce((s, i) => s + i.comments.filter((c) => c.author === f).length, 0);
            return (
              <div key={f} className="bg-muted rounded-lg p-3 text-center">
                <p className="font-bold text-sm text-foreground">{f}</p>
                <p className="text-xs text-muted-foreground mt-1">🗳️ {voteCount} votos · 💬 {commentCount} comentarios</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
