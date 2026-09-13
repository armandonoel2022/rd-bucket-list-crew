import { motion } from "framer-motion";

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md";
  readOnly?: boolean;
}

/** 0–5 stars. Tapping the same star again sets it back to 0 ("no me interesa"). */
const StarRating = ({ value, onChange, size = "md", readOnly = false }: Props) => {
  const dim = size === "sm" ? "text-sm" : "text-lg";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = value >= n;
        return (
          <motion.button
            key={n}
            type="button"
            disabled={readOnly}
            whileTap={readOnly ? undefined : { scale: 1.3 }}
            onClick={() => onChange?.(value === n ? 0 : n)}
            aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
            className={`${dim} leading-none transition-all ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"} ${
              filled ? "text-secondary" : "text-muted-foreground/40"
            }`}
          >
            {filled ? "★" : "☆"}
          </motion.button>
        );
      })}
    </div>
  );
};

export default StarRating;
