import { useState } from "react";

interface Props {
  onAdd: (name: string, description: string, directions: string, price?: string, photoUrl?: string, lat?: number, lng?: number) => void;
}

const AddRecommendationForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directions, setDirections] = useState("");
  const [price, setPrice] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);
      onAdd(
        name.trim(),
        description.trim(),
        directions.trim(),
        price.trim() || undefined,
        photoUrl.trim() || undefined,
        !isNaN(parsedLat) ? parsedLat : undefined,
        !isNaN(parsedLng) ? parsedLng : undefined
      );
      setName(""); setDescription(""); setDirections(""); setPrice(""); setPhotoUrl(""); setLat(""); setLng("");
      setOpen(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-coral w-full">
        ＋ Agregar recomendación
      </button>
    );
  }

  const inputClass = "w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-body placeholder:text-muted-foreground/50";

  return (
    <form onSubmit={handleSubmit} className="card-caribbean p-4 space-y-3 border-2 border-dashed border-secondary/40">
      <h4 className="font-display font-bold text-foreground">Nueva recomendación</h4>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del lugar / restaurante" className={inputClass} required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción corta (ej: Recomendado por Andariego)" className={inputClass} />
      <input value={directions} onChange={(e) => setDirections(e.target.value)} placeholder="Ruta / indicaciones (ej: Autopista Duarte, km 45)" className={inputClass} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="💰 Presupuesto / precios (ej: RD$500 por plato)" className={inputClass} />
      <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="📸 URL de foto del lugar" className={inputClass} />
      <div className="flex gap-2">
        <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="🌐 Latitud" className={`${inputClass} flex-1`} />
        <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="🌐 Longitud" className={`${inputClass} flex-1`} />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-turquoise flex-1">Agregar</button>
        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default AddRecommendationForm;
