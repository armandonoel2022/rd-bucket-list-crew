export interface Recommendation {
  id: string;
  name: string;
  description: string;
  directions: string;
  price?: string;
  photoUrl?: string;
  lat?: number;
  lng?: number;
  visited: boolean;
  votes: string[];
  comments: { author: string; text: string }[];
  facebook?: string;
  instagram?: string;
  menuUrl?: string;
}

export interface FuelStop {
  id: string;
  name: string;
  brand?: string;
  lat: number;
  lng: number;
  notes?: string;
}

export interface RestStop {
  id: string;
  name: string;
  description?: string;
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  icon: string;
  name: string;
  items: Recommendation[];
  fuelStops: FuelStop[];
  restStops: RestStop[];
}

export const FRIENDS = ["Juan Carlos", "Grisel", "Ruth", "Armando"];

// Santo Domingo as starting point
export const START_POINT = { lat: 18.4861, lng: -69.9312, name: "Santo Domingo (Punto de partida)" };

const uid = () => Math.random().toString(36).slice(2, 10);

export const DEFAULT_DATA: Route[] = [
  {
    id: "metro",
    icon: "🏙️",
    name: "Zona Metropolitana",
    fuelStops: [],
    restStops: [],
    items: [
      {
        id: uid(),
        name: "Restaurante El Conuco",
        description: "Recomendado por Andariego. Comida típica dominicana en ambiente colonial.",
        directions: "Calle Casimiro de Moya #152, Zona Colonial, Santo Domingo.",
        lat: 18.4722, lng: -69.8883,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Adrian Tropical (Malecón)",
        description: "Clásico del malecón con vista al mar Caribe. Mangú y jugos frescos.",
        directions: "Av. George Washington (Malecón), Santo Domingo.",
        lat: 18.4615, lng: -69.9160,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Zona Colonial a pie",
        description: "Recorrido peatonal por la primera ciudad del Nuevo Mundo.",
        directions: "Iniciar en Parque Colón, recorrer Calle Las Damas hasta la Fortaleza Ozama.",
        lat: 18.4736, lng: -69.8828,
        visited: false, votes: [], comments: [],
      },
    ],
  },
  {
    id: "sur",
    icon: "🌊",
    name: "Ruta del Sur",
    fuelStops: [
      { id: uid(), name: "Estación Total - San Cristóbal", brand: "Total", lat: 18.4167, lng: -70.1000, notes: "Última estación grande antes de Baní" },
      { id: uid(), name: "Isla Gasolinera - Baní", brand: "Isla", lat: 18.2833, lng: -70.3333, notes: "Llenar tanque antes de seguir a Barahona" },
      { id: uid(), name: "Propagas - Barahona", brand: "Propagas", lat: 18.2085, lng: -71.1000, notes: "En la entrada de Barahona" },
    ],
    restStops: [
      { id: uid(), name: "Parador de Baní (Salinas)", description: "Dulces y mangú en la carretera. Descanso obligado.", lat: 18.2800, lng: -70.3200 },
      { id: uid(), name: "Parador El Quemaíto", description: "Comida criolla frente al mar antes de llegar a Barahona.", lat: 18.1500, lng: -71.0800 },
    ],
    items: [
      {
        id: uid(),
        name: "Playa San Rafael",
        description: "Playa de agua dulce y salada en Barahona. Paisaje único.",
        directions: "Carretera Barahona-Enriquillo, km 17 al sur de Barahona.",
        lat: 18.0800, lng: -71.1800,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Restaurante El Cayo (Pedernales)",
        description: "Mariscos frescos frente al mar. Recomendado por Andariego.",
        directions: "Pedernales centro, frente a la playa principal.",
        lat: 18.0378, lng: -71.7453,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Lago Enriquillo",
        description: "El lago más grande del Caribe. Cocodrilos americanos, iguanas y flamencos.",
        directions: "Desde Barahona tomar carretera hacia Jimaní, entrada por La Descubierta.",
        lat: 18.5000, lng: -71.5833,
        visited: false, votes: [], comments: [],
      },
    ],
  },
  {
    id: "norte",
    icon: "⛰️",
    name: "Ruta del Norte",
    fuelStops: [
      { id: uid(), name: "Shell - La Vega", brand: "Shell", lat: 19.2200, lng: -70.5300, notes: "Buen punto para rellenar camino a Santiago" },
      { id: uid(), name: "Total - Santiago", brand: "Total", lat: 19.4500, lng: -70.6900, notes: "Entrada de Santiago por la autopista" },
      { id: uid(), name: "Isla - Puerto Plata", brand: "Isla", lat: 19.7933, lng: -70.6889, notes: "En la entrada de Puerto Plata" },
    ],
    restStops: [
      { id: uid(), name: "Parador Bonao", description: "Famoso por los dulces y el café. Parada clásica en la Duarte.", lat: 18.9419, lng: -70.4082 },
      { id: uid(), name: "Parador de Moca", description: "Descanso con comida criolla en la carretera hacia el Cibao.", lat: 19.3887, lng: -70.5233 },
    ],
    items: [
      {
        id: uid(),
        name: "27 Charcos de Damajagua",
        description: "Aventura acuática recomendada por William Ramos. ¡Imperdible!",
        directions: "Autopista Duarte, Puerto Plata. Señalización desde la carretera principal.",
        lat: 19.6300, lng: -70.7500,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Restaurante La Casita de Yaso",
        description: "Comida criolla en Puerto Plata. Mofongo relleno legendario.",
        directions: "Puerto Plata centro, cerca del parque central.",
        lat: 19.7900, lng: -70.6900,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Cascada El Limón",
        description: "Cascada de 40 metros en Samaná. Se llega a caballo o caminando.",
        directions: "Desde Las Terrenas tomar carretera a El Limón, 20 min.",
        lat: 19.2667, lng: -69.4333,
        visited: false, votes: [], comments: [],
      },
    ],
  },
  {
    id: "este",
    icon: "🌴",
    name: "Ruta del Este",
    fuelStops: [
      { id: uid(), name: "Shell - San Pedro de Macorís", brand: "Shell", lat: 18.4607, lng: -69.3083, notes: "En la autopista del Este" },
      { id: uid(), name: "Total - La Romana", brand: "Total", lat: 18.4274, lng: -68.9728, notes: "Antes de entrar a La Romana" },
      { id: uid(), name: "Isla - Higüey", brand: "Isla", lat: 18.6153, lng: -68.7078, notes: "Carretera a Punta Cana" },
    ],
    restStops: [
      { id: uid(), name: "Parador Juan Dolio", description: "Snacks y bebidas frías en la primera parada del este.", lat: 18.4270, lng: -69.4200 },
      { id: uid(), name: "Parador La Romana", description: "Descanso con vista al río Dulce antes de seguir.", lat: 18.4300, lng: -68.9700 },
    ],
    items: [
      {
        id: uid(),
        name: "Isla Saona",
        description: "Paraíso terrenal. Excursión en catamarán desde Bayahíbe.",
        directions: "Salida desde el muelle de Bayahíbe, La Romana.",
        lat: 18.1583, lng: -68.7278,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Altos de Chavón",
        description: "Réplica de villa mediterránea del siglo XVI. Arte y cultura.",
        directions: "Dentro de Casa de Campo, La Romana.",
        lat: 18.4167, lng: -68.9500,
        visited: false, votes: [], comments: [],
      },
      {
        id: uid(),
        name: "Playa Macao – Langosta fresca",
        description: "Playa virgen donde los pescadores venden langosta recién sacada del mar.",
        directions: "Punta Cana, tomar desvío hacia Macao por la carretera principal.",
        lat: 18.7500, lng: -68.4833,
        visited: false, votes: [], comments: [],
      },
    ],
  },
];

const STORAGE_KEY = "rdx4-bucket-list";

export function loadRoutes(): Route[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const data = JSON.parse(saved) as Route[];
      // Migrate old data: add fuelStops/restStops if missing
      return data.map((r, i) => ({
        ...r,
        fuelStops: r.fuelStops || DEFAULT_DATA[i]?.fuelStops || [],
        restStops: r.restStops || DEFAULT_DATA[i]?.restStops || [],
        items: r.items.map((item) => ({ ...item, lat: item.lat, lng: item.lng })),
      }));
    } catch {
      return DEFAULT_DATA;
    }
  }
  return DEFAULT_DATA;
}

export function saveRoutes(routes: Route[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
}

const USER_KEY = "rdx4-current-user";

export function getCurrentUser(): string | null {
  return localStorage.getItem(USER_KEY);
}

export function setCurrentUser(name: string) {
  localStorage.setItem(USER_KEY, name);
}

export function clearCurrentUser() {
  localStorage.removeItem(USER_KEY);
}
