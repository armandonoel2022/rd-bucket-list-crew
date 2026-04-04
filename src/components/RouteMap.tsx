import { useEffect, useRef } from "react";
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

function gpsButtons(lat: number, lng: number) {
  return `<div style="display:flex;gap:4px;margin-top:4px">
    <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" style="font-size:10px;background:#0d9488;color:white;padding:2px 8px;border-radius:4px;text-decoration:none;font-weight:bold">Google Maps</a>
    <a href="https://waze.com/ul?ll=${lat},${lng}&navigate=yes" target="_blank" style="font-size:10px;background:#f97316;color:white;padding:2px 8px;border-radius:4px;text-decoration:none;font-weight:bold">Waze</a>
  </div>`;
}

interface Props {
  route: Route;
}

const RouteMap = ({ route }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView(
      [START_POINT.lat, START_POINT.lng],
      9
    );
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
    }).addTo(map);

    const points: L.LatLngExpression[] = [[START_POINT.lat, START_POINT.lng]];

    // Start marker
    L.marker([START_POINT.lat, START_POINT.lng], { icon: startIcon })
      .addTo(map)
      .bindPopup(`<strong>📍 ${START_POINT.name}</strong>${gpsButtons(START_POINT.lat, START_POINT.lng)}`);

    // Destinations
    route.items.forEach((item) => {
      if (item.lat && item.lng) {
        points.push([item.lat, item.lng]);
        L.marker([item.lat, item.lng])
          .addTo(map)
          .bindPopup(`<strong>${item.name}</strong><br><span style="font-size:12px">${item.description.slice(0, 60)}…</span>${gpsButtons(item.lat, item.lng)}`);
      }
    });

    // Fuel stops
    route.fuelStops.forEach((f) => {
      points.push([f.lat, f.lng]);
      L.marker([f.lat, f.lng], { icon: fuelIcon })
        .addTo(map)
        .bindPopup(`<strong>⛽ ${f.name}</strong>${f.notes ? `<br><span style="font-size:12px">${f.notes}</span>` : ""}${gpsButtons(f.lat, f.lng)}`);
    });

    // Rest stops
    route.restStops.forEach((r) => {
      points.push([r.lat, r.lng]);
      L.marker([r.lat, r.lng], { icon: restIcon })
        .addTo(map)
        .bindPopup(`<strong>🅿️ ${r.name}</strong>${r.description ? `<br><span style="font-size:12px">${r.description}</span>` : ""}${gpsButtons(r.lat, r.lng)}`);
    });

    // Fit bounds
    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points as [number, number][]), { padding: [30, 30] });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [route]);

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
      <div ref={mapRef} className="h-[300px] md:h-[400px]" />
    </div>
  );
};

export default RouteMap;
