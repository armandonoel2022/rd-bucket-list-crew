export interface Recommendation {
  id: string;
  name: string;
  description: string;
  directions: string;
  price?: string;
  visited: boolean;
  votes: string[];
  comments: { author: string; text: string }[];
}

export interface Route {
  id: string;
  icon: string;
  name: string;
  items: Recommendation[];
}

export const FRIENDS = ["Juan Carlos", "Grisel", "Ruth", "Armando"];

const uid = () => Math.random().toString(36).slice(2, 10);

export const DEFAULT_DATA: Route[] = [
  {
    id: "metro",
    icon: "🏙️",
    name: "Zona Metropolitana",
    items: [
      {
        id: uid(),
        name: "Restaurante El Conuco",
        description: "Recomendado por Andariego. Comida típica dominicana en ambiente colonial.",
        directions: "Calle Casimiro de Moya #152, Zona Colonial, Santo Domingo.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Adrian Tropical (Malecón)",
        description: "Clásico del malecón con vista al mar Caribe. Mangú y jugos frescos.",
        directions: "Av. George Washington (Malecón), Santo Domingo.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Zona Colonial a pie",
        description: "Recorrido peatonal por la primera ciudad del Nuevo Mundo.",
        directions: "Iniciar en Parque Colón, recorrer Calle Las Damas hasta la Fortaleza Ozama.",
        visited: false,
        votes: [],
        comments: [],
      },
    ],
  },
  {
    id: "sur",
    icon: "🌊",
    name: "Ruta del Sur",
    items: [
      {
        id: uid(),
        name: "Playa San Rafael",
        description: "Playa de agua dulce y salada en Barahona. Paisaje único.",
        directions: "Carretera Barahona-Enriquillo, km 17 al sur de Barahona.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Restaurante El Cayo (Pedernales)",
        description: "Mariscos frescos frente al mar. Recomendado por Andariego.",
        directions: "Pedernales centro, frente a la playa principal.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Lago Enriquillo",
        description: "El lago más grande del Caribe. Cocodrilos americanos, iguanas y flamencos.",
        directions: "Desde Barahona tomar carretera hacia Jimaní, entrada por La Descubierta.",
        visited: false,
        votes: [],
        comments: [],
      },
    ],
  },
  {
    id: "norte",
    icon: "⛰️",
    name: "Ruta del Norte",
    items: [
      {
        id: uid(),
        name: "27 Charcos de Damajagua",
        description: "Aventura acuática recomendada por William Ramos. ¡Imperdible!",
        directions: "Autopista Duarte, Puerto Plata. Señalización desde la carretera principal.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Restaurante La Casita de Yaso",
        description: "Comida criolla en Puerto Plata. Mofongo relleno legendario.",
        directions: "Puerto Plata centro, cerca del parque central.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Cascada El Limón",
        description: "Cascada de 40 metros en Samaná. Se llega a caballo o caminando.",
        directions: "Desde Las Terrenas tomar carretera a El Limón, 20 min.",
        visited: false,
        votes: [],
        comments: [],
      },
    ],
  },
  {
    id: "este",
    icon: "🌴",
    name: "Ruta del Este",
    items: [
      {
        id: uid(),
        name: "Isla Saona",
        description: "Paraíso terrenal. Excursión en catamarán desde Bayahíbe.",
        directions: "Salida desde el muelle de Bayahíbe, La Romana.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Altos de Chavón",
        description: "Réplica de villa mediterránea del siglo XVI. Arte y cultura.",
        directions: "Dentro de Casa de Campo, La Romana.",
        visited: false,
        votes: [],
        comments: [],
      },
      {
        id: uid(),
        name: "Playa Macao – Langosta fresca",
        description: "Playa virgen donde los pescadores venden langosta recién sacada del mar.",
        directions: "Punta Cana, tomar desvío hacia Macao por la carretera principal.",
        visited: false,
        votes: [],
        comments: [],
      },
    ],
  },
];

const STORAGE_KEY = "rdx4-bucket-list";

export function loadRoutes(): Route[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
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
