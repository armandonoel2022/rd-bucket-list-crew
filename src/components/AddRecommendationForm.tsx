import { useState } from "react";

interface Props {
  onAdd: (name: string, description: string, directions: string, price?: string) => void;
}

const AddRecommendationForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [directions, setDirections] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), description.trim(), directions.trim(), price.trim() || undefined);
      setName("");
      setDescription("");
      setDirections("");
      setPrice("");
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

  return (
    <form onSubmit={handleSubmit} className="card-caribbean p-4 space-y-3 border-2 border-dashed border-secondary/40">
      <h4 className="font-display font-bold text-foreground">Nueva recomendación</h4>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del lugar / restaurante"
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-body placeholder:text-muted-foreground/50"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción corta (ej: Recomendado por Andariego)"
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-body placeholder:text-muted-foreground/50"
      />
      <input
        value={directions}
        onChange={(e) => setDirections(e.target.value)}
        placeholder="Ruta / indicaciones (ej: Autopista Duarte, km 45)"
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-body placeholder:text-muted-foreground/50"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="💰 Presupuesto / precios (ej: RD$500 por plato)"
        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm font-body placeholder:text-muted-foreground/50"
      />
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
