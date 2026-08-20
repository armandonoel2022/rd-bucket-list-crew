import { FRIENDS } from "@/lib/bucketListData";
import { FRIEND_AVATARS } from "@/lib/friendAvatars";
import { motion } from "framer-motion";
import bannerImg from "@/assets/explorando-los-cuatro.png";
import logo from "@/assets/logo-rdx4.png";

interface Props {
  onLogin: (name: string) => void;
}

const LoginScreen = ({ onLogin }: Props) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl">
        <img src={bannerImg} alt="Juan Carlos, Matilde, Ruth y Armando con las camisetas Explorando Quisqueya" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 h-48 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute inset-x-0 top-3 flex flex-col items-center text-center">
          <motion.img
            src={logo}
            alt="Logo RD x 4"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 12 }}
            className="w-20 h-20 drop-shadow-2xl"
          />
          <p className="text-white/90 text-[11px] font-body uppercase tracking-[0.2em] mt-1 drop-shadow">
            Un destino, mil historias, cuatro amigos
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mt-6 space-y-3">
        <p className="text-center font-display text-lg font-bold text-foreground">
          ¿Quién eres?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {FRIENDS.map((name, i) => (
            <motion.button
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onLogin(name)}
              className="btn-turquoise text-base py-4 rounded-xl flex flex-col items-center gap-2"
            >
              <img
                src={FRIEND_AVATARS[name]}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/50 shadow-md"
              />
              <span>{name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
