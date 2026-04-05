import { useState } from "react";
import { FuelStop, RestStop } from "@/lib/bucketListData";

function openGoogleMaps(lat: number, lng: number) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
}

function openWaze(lat: number, lng: number) {
  window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
}

interface Props {
  fuelStops: FuelStop[];
  restStops: RestStop[];
  onDeleteFuel: (id: string) => void;
  onDeleteRest: (id: string) => void;
  onAddFuel: (stop: FuelStop) => void;
  onAddRest: (stop: RestStop) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

const RouteStops = ({ fuelStops, restStops, onDeleteFuel, onDeleteRest, onAddFuel, onAddRest }: Props) => {
  const [addingFuel, setAddingFuel] = useState(false);
  const [addingRest, setAddingRest] = useState(false);
  const [fuelName, setFuelName] = useState("");
  const [fuelBrand, setFuelBrand] = useState("");
  const [fuelLat, setFuelLat] = useState("");
  const [fuelLng, setFuelLng] = useState("");
  const [fuelNotes, setFuelNotes] = useState("");
  const [restName, setRestName] = useState("");
  const [restDesc, setRestDesc] = useState("");
  const [restLat, setRestLat] = useState("");
  const [restLng, setRestLng] = useState("");

  const inputClass = "w-full bg-card border border-border rounded px-2 py-1 text-xs font-body placeholder:text-muted-foreground/50";

  const handleAddFuel = () => {
    if (fuelName.trim()) {
      onAddFuel({
        id: uid(),
        name: fuelName.trim(),
        brand: fuelBrand.trim() || undefined,
        lat: parseFloat(fuelLat) || 0,
        lng: parseFloat(fuelLng) || 0,
        notes: fuelNotes.trim() || undefined,
      });
      setFuelName(""); setFuelBrand(""); setFuelLat(""); setFuelLng(""); setFuelNotes("");
      setAddingFuel(false);
    }
  };

  const handleAddRest = () => {
    if (restName.trim()) {
      onAddRest({
        id: uid(),
        name: restName.trim(),
        description: restDesc.trim() || undefined,
        lat: parseFloat(restLat) || 0,
        lng: parseFloat(restLng) || 0,
      });
      setRestName(""); setRestDesc(""); setRestLat(""); setRestLng("");
      setAddingRest(false);
    }
  };

  return (
    <div className="card-caribbean p-4">
      <h3 className="font-display font-bold text-sm text-foreground mb-3">🛣️ Paradas en la Ruta</h3>

      {/* Fuel Stops */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-muted-foreground">⛽ Estaciones de Combustible</p>
          <button onClick={() => setAddingFuel(!addingFuel)} className="text-[10px] text-primary font-bold hover:underline">
            {addingFuel ? "Cancelar" : "＋ Agregar"}
          </button>
        </div>
        {addingFuel && (
          <div className="bg-muted/50 rounded-lg p-3 mb-2 space-y-2 border border-dashed border-secondary/40">
            <input value={fuelName} onChange={(e) => setFuelName(e.target.value)} placeholder="Nombre de la estación" className={inputClass} />
            <input value={fuelBrand} onChange={(e) => setFuelBrand(e.target.value)} placeholder="Marca (ej: Shell, Total)" className={inputClass} />
            <div className="flex gap-2">
              <input value={fuelLat} onChange={(e) => setFuelLat(e.target.value)} placeholder="Latitud" className={inputClass} />
              <input value={fuelLng} onChange={(e) => setFuelLng(e.target.value)} placeholder="Longitud" className={inputClass} />
            </div>
            <input value={fuelNotes} onChange={(e) => setFuelNotes(e.target.value)} placeholder="Notas" className={inputClass} />
            <button onClick={handleAddFuel} className="btn-turquoise text-xs w-full">Agregar estación</button>
          </div>
        )}
        {fuelStops.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {fuelStops.map((f) => (
              <div key={f.id} className="bg-muted rounded-lg p-3 text-sm relative group">
                <button
                  onClick={() => onDeleteFuel(f.id)}
                  className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  title="Eliminar"
                >🗑️</button>
                <p className="font-bold text-foreground">{f.name}</p>
                {f.brand && <p className="text-xs text-muted-foreground">Marca: {f.brand}</p>}
                {f.notes && <p className="text-xs text-muted-foreground italic">{f.notes}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openGoogleMaps(f.lat, f.lng)} className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
                    📍 Google Maps
                  </button>
                  <button onClick={() => openWaze(f.lat, f.lng)} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded font-bold">
                    🧭 Waze
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">No hay estaciones agregadas.</p>
        )}
      </div>

      {/* Rest Stops */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-muted-foreground">🅿️ Paradores</p>
          <button onClick={() => setAddingRest(!addingRest)} className="text-[10px] text-primary font-bold hover:underline">
            {addingRest ? "Cancelar" : "＋ Agregar"}
          </button>
        </div>
        {addingRest && (
          <div className="bg-muted/50 rounded-lg p-3 mb-2 space-y-2 border border-dashed border-secondary/40">
            <input value={restName} onChange={(e) => setRestName(e.target.value)} placeholder="Nombre del parador" className={inputClass} />
            <input value={restDesc} onChange={(e) => setRestDesc(e.target.value)} placeholder="Descripción" className={inputClass} />
            <div className="flex gap-2">
              <input value={restLat} onChange={(e) => setRestLat(e.target.value)} placeholder="Latitud" className={inputClass} />
              <input value={restLng} onChange={(e) => setRestLng(e.target.value)} placeholder="Longitud" className={inputClass} />
            </div>
            <button onClick={handleAddRest} className="btn-turquoise text-xs w-full">Agregar parador</button>
          </div>
        )}
        {restStops.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {restStops.map((r) => (
              <div key={r.id} className="bg-muted rounded-lg p-3 text-sm relative group">
                <button
                  onClick={() => onDeleteRest(r.id)}
                  className="absolute top-2 right-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  title="Eliminar"
                >🗑️</button>
                <p className="font-bold text-foreground">{r.name}</p>
                {r.description && <p className="text-xs text-muted-foreground">{r.description}</p>}
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openGoogleMaps(r.lat, r.lng)} className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded font-bold">
                    📍 Google Maps
                  </button>
                  <button onClick={() => openWaze(r.lat, r.lng)} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded font-bold">
                    🧭 Waze
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">No hay paradores agregados.</p>
        )}
      </div>
    </div>
  );
};

export default RouteStops;
