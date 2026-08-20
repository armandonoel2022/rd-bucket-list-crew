import { motion } from "framer-motion";
import { Route } from "@/lib/bucketListData";
import { ROUTE_THEMES, DEFAULT_TAGLINE } from "@/lib/routeThemes";

const RouteHero = ({ route }: { route: Route }) => {
  const theme = ROUTE_THEMES[route.id];
  const tagline = theme?.tagline ?? DEFAULT_TAGLINE;

  return (
    <motion.div
      key={route.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="card-caribbean overflow-hidden p-0"
    >
      {theme?.image && (
        <div className="relative h-56 md:h-80 overflow-hidden">
          <motion.img
            src={theme.image}
            alt={theme.imageAlt ?? route.name}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
        </div>
      )}
      <div className="p-4 flex items-center gap-3">
        <motion.span
          className="text-2xl"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {route.icon}
        </motion.span>
        <div>
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground leading-tight">
            {route.name}
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-sm text-muted-foreground font-body italic"
          >
            {tagline}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default RouteHero;
