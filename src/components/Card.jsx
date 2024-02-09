import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

function Card({ name, src, id, onCLick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{
        scale: 0.8,
        borderRadius: "10%",
      }}
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Tilt glareEnable={true}>
        <div className="card" data-id={id} onClick={onCLick}>
          <img src={src} alt="card image" className="card-img" data-id={id} />
        </div>
      </Tilt>
    </motion.div>
  );
}

export default Card;
