import { useState } from "react";
import { Recommendation, FRIENDS } from "@/lib/bucketListData";
import { FRIEND_AVATARS } from "@/lib/friendAvatars";
import { motion } from "framer-motion";

function openGoogleMaps(lat: number, lng: number) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
}

function openWaze(lat: number, lng: number) {
  window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
}

interface Props {
  item: Recommendation;
  currentUser: string;
  onToggleVisited: () => void;
  onDelete: () => void;
  onVote: (friend: string) => void;
  onAddComment: (author: string, text: string) => void;
  onUpdatePrice: (price: string) => void;
  onUpdatePhoto: (url: string) => void;
  onUpdateLocation: (lat: number, lng: number) => void;
  onUpdateSocial: (field: "facebook" | "instagram" | "menuUrl", value: string) => void;
}

const RecommendationCard = ({ item, currentUser, onToggleVisited, onDelete, onVote, onAddComment, onUpdatePrice, onUpdatePhoto, onUpdateLocation, onUpdateSocial }: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceValue, setPriceValue] = useState(item.price || "");
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [photoValue, setPhotoValue] = useState(item.photoUrl || "");
  const [editingLocation, setEditingLocation] = useState(false);
  const [latValue, setLatValue] = useState(item.lat?.toString() || "");
  const [lngValue, setLngValue] = useState(item.lng?.toString() || "");
  const [editingSocial, setEditingSocial] = useState<"facebook" | "instagram" | "menuUrl" | null>(null);
  const [socialValue, setSocialValue] = useState("");

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

  const handleSavePhoto = () => {
    onUpdatePhoto(photoValue.trim());
    setEditingPhoto(false);
  };

  const handleSaveLocation = () => {
    const lat = parseFloat(latValue);
    const lng = parseFloat(lngValue);
    if (!isNaN(lat) && !isNaN(lng)) {
      onUpdateLocation(lat, lng);
    }
    setEditingLocation(false);
  };

  const handleSaveSocial = (field: "facebook" | "instagram" | "menuUrl") => {
    onUpdateSocial(field, socialValue.trim());
    setEditingSocial(null);
    setSocialValue("");
  };

  const socialField = (label: string, icon: string, field: "facebook" | "instagram" | "menuUrl", placeholder: string) => (
    <div className="mt-1 flex items-center gap-2">
      <span className="text-xs font-semibold text-muted-foreground">{icon} {label}:</span>
      {editingSocial === field ? (
        <div className="flex items-center gap-1">
          <input
            value={socialValue}
            onChange={(e) => setSocialValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveSocial(field)}
            placeholder={placeholder}
            className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-body min-w-0 w-48"
            autoFocus
          />
          <button onClick={() => handleSaveSocial(field)} className="text-xs text-primary font-bold">✓</button>
          <button onClick={() => setEditingSocial(null)} className="text-xs text-muted-foreground">✗</button>
        </div>
      ) : item[field] ? (
        <div className="flex items-center gap-1">
          <a href={item[field]} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate max-w-[150px]">
            {field === "menuUrl" ? "Ver menú" : item[field]!.replace(/https?:\/\/(www\.)?/, "").slice(0, 30)}
          </a>
          <button onClick={() => { setSocialValue(item[field] || ""); setEditingSocial(field); }} className="text-xs text-muted-foreground hover:text-foreground">✏️</button>
        </div>
      ) : (
        <button
          onClick={() => { setSocialValue(""); setEditingSocial(field); }}
          className="text-xs text-primary hover:underline"
        >
          Agregar
        </button>
      )}
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`card-caribbean p-5 ${item.visited ? "border-l-4 border-l-accent" : ""}`}
    >
      {/* Photo */}
      {item.photoUrl && (
        <div className="mb-3 rounded-lg overflow-hidden max-h-48">
          <img src={item.photoUrl} alt={item.name} className="w-full h-48 object-cover" />
        </div>
      )}

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

          {/* GPS Buttons */}
          {item.lat && item.lng && (
            <div className="flex gap-2 mt-2">
              <button onClick={() => openGoogleMaps(item.lat!, item.lng!)} className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded-full font-bold hover:brightness-110 transition-all">
                📍 Google Maps
              </button>
              <button onClick={() => openWaze(item.lat!, item.lng!)} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-bold hover:brightness-110 transition-all">
                🧭 Waze
              </button>
            </div>
          )}
          
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

          {/* Photo URL */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">📸 Foto:</span>
            {editingPhoto ? (
              <div className="flex items-center gap-1">
                <input
                  value={photoValue}
                  onChange={(e) => setPhotoValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSavePhoto()}
                  placeholder="URL de la foto"
                  className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-body min-w-0 w-48"
                  autoFocus
                />
                <button onClick={handleSavePhoto} className="text-xs text-primary font-bold">✓</button>
                <button onClick={() => setEditingPhoto(false)} className="text-xs text-muted-foreground">✗</button>
              </div>
            ) : (
              <button
                onClick={() => { setPhotoValue(item.photoUrl || ""); setEditingPhoto(true); }}
                className="text-xs text-primary hover:underline"
              >
                {item.photoUrl ? "Cambiar foto" : "Agregar foto"}
              </button>
            )}
          </div>

          {/* Location */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">🌐 Ubicación:</span>
            {editingLocation ? (
              <div className="flex items-center gap-1">
                <input value={latValue} onChange={(e) => setLatValue(e.target.value)} placeholder="Lat" className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-body w-20" />
                <input value={lngValue} onChange={(e) => setLngValue(e.target.value)} placeholder="Lng" onKeyDown={(e) => e.key === "Enter" && handleSaveLocation()} className="bg-card border border-border rounded-lg px-2 py-1 text-xs font-body w-20" />
                <button onClick={handleSaveLocation} className="text-xs text-primary font-bold">✓</button>
                <button onClick={() => setEditingLocation(false)} className="text-xs text-muted-foreground">✗</button>
              </div>
            ) : (
              <button
                onClick={() => { setLatValue(item.lat?.toString() || ""); setLngValue(item.lng?.toString() || ""); setEditingLocation(true); }}
                className="text-xs text-primary hover:underline"
              >
                {item.lat && item.lng ? `${item.lat.toFixed(4)}, ${item.lng.toFixed(4)}` : "Agregar ubicación"}
              </button>
            )}
          </div>

          {/* Social & Menu */}
          {socialField("Facebook", "📘", "facebook", "https://facebook.com/...")}
          {socialField("Instagram", "📷", "instagram", "https://instagram.com/...")}
          {socialField("Menú", "📋", "menuUrl", "URL del menú (imagen o PDF)")}
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

      {/* Votes with avatars */}
      <div className="mt-4">
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          🗳️ Votar para ir ({item.votes.length}/{FRIENDS.length}):
        </p>
        <div className="flex flex-wrap gap-2">
          {FRIENDS.map((f) => (
            <button
              key={f}
              onClick={() => onVote(f)}
              className={`vote-chip ${item.votes.includes(f) ? "voted" : ""} flex items-center gap-1.5`}
            >
              <img src={FRIEND_AVATARS[f]} alt={f} className="w-5 h-5 rounded-full object-cover" />
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
              <div key={i} className="bg-muted rounded-lg px-3 py-2 text-sm flex items-start gap-2">
                <img src={FRIEND_AVATARS[c.author]} alt={c.author} className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-primary">{c.author}:</span>{" "}
                  <span className="text-foreground">{c.text}</span>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <img src={FRIEND_AVATARS[currentUser]} alt={currentUser} className="w-8 h-8 rounded-full object-cover shrink-0" />
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
