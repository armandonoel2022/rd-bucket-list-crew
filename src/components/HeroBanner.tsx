import bannerImage from "@/assets/banner-group.jpeg";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
      <img
        src={bannerImage}
        alt="Juan Carlos, Armando, Ruth y Matilde"
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-display font-bold text-card drop-shadow-lg mb-2">
          🇩🇴 RD x 4 – Bucket List Viajero
        </h1>
        <p className="text-card/90 text-base md:text-lg font-body font-medium drop-shadow">
          Juan Carlos, Matilde, Ruth & Armando
        </p>
        <p className="text-card/70 text-sm font-body mt-1">
          Próximo viaje: Septiembre 2026
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
