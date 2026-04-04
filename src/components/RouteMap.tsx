import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Route, START_POINT } from "@/lib/bucketListData";

// Fix leaflet default icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const startIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const fuelIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const restIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function openGoogleMaps(lat: number, lng: number) {
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
}

function openWaze(lat: number, lng: number) {
  window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, "_blank");
}

function FitBounds({ route }: { route: Route }) {
  const map = useMap();
  useEffect(() => {
    const points: [number, number][] = [[START_POINT.lat, START_POINT.lng]];
    route.items.forEach((i) => { if (i.lat && i.lng) points.push([i.lat, i.lng]); });
    route.fuelStops.forEach((f) => points.push([f.lat, f.lng]));
    route.restStops.forEach((r) => points.push([r.lat, r.lng]));
    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), { padding: [30, 30] });
    }
  }, [route, map]);
  return null;
}

function GpsButtons({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="flex gap-1 mt-1">
      <button onClick={() => openGoogleMaps(lat, lng)} className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded font-bold">
        Google Maps
      </button>
      <button onClick={() => openWaze(lat, lng)} className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded font-bold">
        Waze
      </button>
    </div>
  );
}

interface Props {
  route: Route;
}

const RouteMap = ({ route }: Props) => {
  return (
    <div className="card-caribbean overflow-hidden">
      <div className="p-3 border-b border-border">
        <h3 className="font-display font-bold text-sm text-foreground">
          🗺️ Mapa de ruta: {route.icon} {route.name}
        </h3>
        <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
          <span>🔴 Partida</span>
          <span>🔵 Destino</span>
          <span>🟠 Gasolina</span>
          <span>🟢 Parador</span>
        </div>
      </div>
      <div className="h-[300px] md:h-[400px]">
        <MapContainer
          center={[START_POINT.lat, START_POINT.lng]}
          zoom={9}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds route={route} />

          {/* Start point */}
          <Marker position={[START_POINT.lat, START_POINT.lng]} icon={startIcon}>
            <Popup>
              <strong>📍 {START_POINT.name}</strong>
              <GpsButtons lat={START_POINT.lat} lng={START_POINT.lng} />
            </Popup>
          </Marker>

          {/* Destinations */}
          {route.items.filter((i) => i.lat && i.lng).map((item) => (
            <Marker key={item.id} position={[item.lat!, item.lng!]}>
              <Popup>
                <strong>{item.name}</strong>
                <br />
                <span className="text-xs">{item.description.slice(0, 60)}…</span>
                <GpsButtons lat={item.lat!} lng={item.lng!} />
              </Popup>
            </Marker>
          ))}

          {/* Fuel */}
          {route.fuelStops.map((f) => (
            <Marker key={f.id} position={[f.lat, f.lng]} icon={fuelIcon}>
              <Popup>
                <strong>⛽ {f.name}</strong>
                {f.notes && <><br /><span className="text-xs">{f.notes}</span></>}
                <GpsButtons lat={f.lat} lng={f.lng} />
              </Popup>
            </Marker>
          ))}

          {/* Rest stops */}
          {route.restStops.map((r) => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={restIcon}>
              <Popup>
                <strong>🅿️ {r.name}</strong>
                {r.description && <><br /><span className="text-xs">{r.description}</span></>}
                <GpsButtons lat={r.lat} lng={r.lng} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RouteMap;
