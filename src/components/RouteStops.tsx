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
}

const RouteStops = ({ fuelStops, restStops }: Props) => {
  if (fuelStops.length === 0 && restStops.length === 0) return null;

  return (
    <div className="card-caribbean p-4">
      <h3 className="font-display font-bold text-sm text-foreground mb-3">🛣️ Paradas en la Ruta</h3>

      {fuelStops.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-muted-foreground mb-2">⛽ Estaciones de Combustible</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {fuelStops.map((f) => (
              <div key={f.id} className="bg-muted rounded-lg p-3 text-sm">
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
        </div>
      )}

      {restStops.length > 0 && (
        <div>
          <p className="text-xs font-bold text-muted-foreground mb-2">🅿️ Paradores</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {restStops.map((r) => (
              <div key={r.id} className="bg-muted rounded-lg p-3 text-sm">
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
        </div>
      )}
    </div>
  );
};

export default RouteStops;
