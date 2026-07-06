import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Logos.css';

// 1. IMPORTACIONES
import rec283 from '../../image/brands/Recurso 283.webp';
import rec284 from '../../image/brands/Recurso 284.webp';
import rec285 from '../../image/brands/Recurso 285.webp';
import rec286 from '../../image/brands/Recurso 286.webp';
import rec287 from '../../image/brands/Recurso 287.webp';
import rec288 from '../../image/brands/Recurso 288.webp';
import rec289 from '../../image/brands/Recurso 289.webp'; 
import rec290 from '../../image/brands/Recurso 290.webp';
import rec291 from '../../image/brands/Recurso 291.webp';
import rec292 from '../../image/brands/Recurso 292.webp';
import rec293 from '../../image/brands/Recurso 293.webp';
import rec294 from '../../image/brands/Recurso 294.webp';
import rec295 from '../../image/brands/Recurso 295.webp';
import rec296 from '../../image/brands/Recurso 296.webp';
import rec297 from '../../image/brands/Recurso 297.webp';
import rec298 from '../../image/brands/Recurso 298.webp';
import rec299 from '../../image/brands/Recurso 299.webp';
import rec300 from '../../image/brands/Recurso 300.webp';
import rec301 from '../../image/brands/Recurso 301.webp';
import rec302 from '../../image/brands/Recurso 302.webp';
import rec303 from '../../image/brands/Recurso 303.webp';
import rec304 from '../../image/brands/Recurso 304.webp';

// Importación de las manos
import manosImg from '../../image/manos.png';

const brandsData = [
  { id: 283, src: rec283 }, { id: 284, src: rec284 }, { id: 285, src: rec285 },
  { id: 286, src: rec286 }, { id: 287, src: rec287 }, { id: 288, src: rec288 },
  { id: 289, src: rec289 }, { id: 290, src: rec290 }, { id: 291, src: rec291 },
  { id: 292, src: rec292 }, { id: 293, src: rec293 }, { id: 294, src: rec294 },
  { id: 295, src: rec295 }, { id: 296, src: rec296 }, { id: 297, src: rec297 },
  { id: 298, src: rec298 }, { id: 299, src: rec299 }, { id: 300, src: rec300 },
  { id: 301, src: rec301 }, { id: 302, src: rec302 }, { id: 303, src: rec303 },
  { id: 304, src: rec304 },
];

const chunkArray = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
};

// Como ahora hay manos a la derecha, agrupamos de a 4 para que encajen a la izquierda
const logoChunks = chunkArray(brandsData, 4);

// 2. CONFIGURACIÓN DE ANIMACIONES
const containerScrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" }, 
  visible: { 
    opacity: 1, y: 0, filter: "blur(0px)", 
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  },
  exit: { 
    opacity: 0, y: -40, filter: "blur(8px)", 
    transition: { duration: 0.3 } 
  }
};

const Logos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logoChunks.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="alianzas-section">
      <motion.div
        className="alianzas-card-container"
        variants={containerScrollVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="alianzas-title">Alianzas Estratégicas</h2>

        {/* Las manos con posición absoluta */}
        <img src={manosImg} alt="Manos Alianza" className="alianzas-hands" />

        <div className="alianzas-carousel-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="alianzas-grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {logoChunks[currentIndex].map((brand) => (
                <motion.div 
                  className="alianza-item" 
                  key={brand.id}
                  variants={itemVariants}
                >
                  <img src={brand.src} alt={`Marca ${brand.id}`} className="alianza-img" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </section>
  );
};

export default Logos;