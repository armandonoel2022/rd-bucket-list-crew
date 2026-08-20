import montecristi from "@/assets/rumbo-montecristi.jpeg";

export interface RouteTheme {
  tagline: string;
  image?: string;
  imageAlt?: string;
}

export const ROUTE_THEMES: Record<string, RouteTheme> = {
  metro: {
    tagline: "La ciudad que nos vio empezar, mil historias en cada esquina.",
  },
  sur: {
    tagline: "Rumbo al Sur: donde el desierto se enamora del Caribe.",
  },
  norte: {
    tagline: "Rumbo al Norte: montaña, neblina y café con amigos.",
  },
  este: {
    tagline: "Rumbo al Este: palmeras, arena blanca y risas sin horario.",
  },
  noroeste: {
    tagline: "Rumbo a Montecristi: donde la tierra, el mar y la sal se unen.",
    image: montecristi,
    imageAlt: "Rumbo a Montecristi – los cuatro amigos explorando Quisqueya",
  },
};

export const DEFAULT_TAGLINE = "Un destino, mil historias, cuatro amigos.";
