import { useState } from "react";
import { Recommendation, FRIENDS } from "@/lib/bucketListData";
import { motion } from "framer-motion";

interface Props {
  item: Recommendation;
  currentUser: string;
  onToggleVisited: () => void;
  onDelete: () => void;
  onVote: (friend: string) => void;
  onAddComment: (author: string, text: string) => void;
  onUpdatePrice: (price: string) => void;
}

const RecommendationCard = ({ item, currentUser, onToggleVisited, onDelete, onVote, onAddComment, onUpdatePrice }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceValue, setPriceValue] = useState(item.price || "");

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onAddComment(currentUser, commentText.trim());
      setCommentText("");
    }
  };

  const handleSavePrice = () => {
    onUpdatePrice(priceValue.trim());
    setEditingPrice(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`card-caribbean p-5 ${item.visited ? "border-l-4 border-l-accent" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-lg text-foreground">{item.name}</h3>
            {item.visited ? (
              <span className="badge-visited">✔️ Visitado</span>
            ) : (
              <span className="badge-pending">Pendiente</span>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
          <p className="text-muted-foreground/70 text-xs mt-1 italic">📍 {item.directions}</p>
          
          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">💰 Presupuesto:</span>
            {editingPrice ? (
              <div className="flex items-center gap-1">
                <input
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSavePrice()}
                  placeholder="Ej: RD$500 por plato"
                  className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-body min-w-0 w-40"
                  autoFocus
                />
                <button onClick={handleSavePrice} className="text-xs text-primary font-bold">✓</button>
                <button onClick={() => setEditingPrice(false)} className="text-xs text-muted-foreground">✗</button>
              </div>
            ) : (
              <button
                onClick={() => { setPriceValue(item.price || ""); setEditingPrice(true); }}
                className="text-xs text-primary hover:underline"
              >
                {item.price || "Agregar precio"}
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button onClick={onToggleVisited} className="btn-turquoise text-xs !px-3 !py-1.5">
            {item.visited ? "Desmarcar" : "✔️ Visitado"}
          </button>
          <button onClick={onDelete} className="text-destructive hover:text-destructive/80 text-xs font-semibold transition-colors">
            🗑️ Eliminar
          </button>
        </div>
      </div>

      {/* Votes */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          🗳️ Votar para ir ({item.votes.length}/{FRIENDS.length}):
        </p>
        <div className="flex flex-wrap gap-2">
          {FRIENDS.map((f) => (
            <button
              key={f}
              onClick={() => onVote(f)}
              className={`vote-chip ${item.votes.includes(f) ? "voted" : ""}`}
            >
              {item.votes.includes(f) ? "✓" : "+"} {f}
            </button>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="mt-3">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-xs text-primary font-semibold hover:underline"
        >
          💬 {item.comments.length} comentario{item.comments.length !== 1 ? "s" : ""} {showComments ? "▲" : "▼"}
        </button>
        {showComments && (
          <div className="mt-2 space-y-2">
            {item.comments.map((c, i) => (
              <div key={i} className="bg-muted rounded-lg px-3 py-2 text-sm">
                <span className="font-bold text-primary">{c.author}:</span>{" "}
                <span className="text-foreground">{c.text}</span>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <span className="bg-primary/10 text-primary rounded-lg px-2 py-1.5 text-xs font-bold shrink-0">
                {currentUser}
              </span>
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmitComment()}
                placeholder="¿Por qué este lugar?"
                className="flex-1 bg-card border border-border rounded-lg px-3 py-1.5 text-sm font-body placeholder:text-muted-foreground/50 min-w-0"
              />
              <button onClick={handleSubmitComment} className="btn-coral text-xs !px-3">
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
