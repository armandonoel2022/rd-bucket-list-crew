import { useEffect, useState } from "react";
import bannerImage from "@/assets/banner-group.jpeg";
import banner2 from "@/assets/banner-group-2.jpeg.asset.json";

const IMAGES = [
  { src: bannerImage, alt: "Juan Carlos, Matilde, Ruth y Armando" },
  { src: banner2.url, alt: "El grupo con las camisetas Explorando Quisqueya" },
];

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
      {IMAGES.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-card drop-shadow-lg mb-2 leading-tight tracking-tight">
          RD x 4 – Bucket List Viajero
        </h1>
        <p className="text-card/90 text-base md:text-lg font-body font-medium drop-shadow">
          Juan Carlos, Matilde, Ruth &amp; Armando
        </p>
        <p className="text-card/70 text-sm font-body mt-1">
          Próximo viaje: Septiembre 2026
        </p>
      </div>

      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {IMAGES.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            aria-label={`Ver foto ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-card" : "w-2 bg-card/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
