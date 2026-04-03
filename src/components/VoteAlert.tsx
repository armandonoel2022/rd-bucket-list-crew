import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface Props {
  message: string | null;
  onDismiss: () => void;
}

const VoteAlert = ({ message, onDismiss }: Props) => {
  useEffect(() => {
    if (message) {
      const t = setTimeout(onDismiss, 3000);
      return () => clearTimeout(t);
    }
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4"
        >
          <div className="bg-primary text-primary-foreground rounded-xl shadow-2xl px-5 py-4 text-center font-body font-semibold text-sm">
            🗳️ {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoteAlert;
