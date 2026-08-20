import { motion } from "framer-motion";
import bannerImage from "@/assets/explorando-los-cuatro.png";
import logo from "@/assets/logo-rdx4.png";

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[380px] md:h-[460px] overflow-hidden">
      <motion.img
        src={bannerImage}
        alt="Juan Carlos, Grisel, Ruth y Armando con las camisetas Explorando Quisqueya"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 md:pb-12 px-4 text-center">
        <motion.img
          src={logo}
          alt="Logo RD x 4"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 12 }}
          className="w-28 h-28 md:w-36 md:h-36 drop-shadow-2xl mb-2 animate-[pulse_6s_ease-in-out_infinite]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-5xl font-display font-bold text-card drop-shadow-lg mb-1 leading-tight tracking-tight"
        >
          RD x 4 – Bucket List Viajero
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-card/90 text-sm md:text-base font-body font-semibold tracking-[0.18em] uppercase drop-shadow"
        >
          Un destino, mil historias, cuatro amigos
        </motion.p>
        <p className="text-card/70 text-sm font-body mt-2">
          Juan Carlos, Grisel, Ruth &amp; Armando · Próximo viaje: Septiembre 2026
        </p>
      </div>
    </div>
  );
};

export default HeroBanner;
