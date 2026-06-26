import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float, Environment } from '@react-three/drei';
import './ShowroomBackup.css'; // Asegúrate de enlazar el CSS

// =====================================================================
// COMPONENTE 3D: BARÓMETRO ANEROIDE (Efecto Despiece / Vista Explosionada)
// =====================================================================
const BarometroMecanico3D = () => {
  const carcasaRef = useRef();
  const capsulaRef = useRef();
  const resorteRef = useRef();
  const palancaRef = useRef();
  const engranajeRef = useRef();
  const esferaRef = useRef();
  const agujaRef = useRef();
  const cristalRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Vibración simulando presión
    const vibracionPresion = Math.sin(time * 10) * 0.05;
    if (capsulaRef.current) capsulaRef.current.scale.y = 1 + vibracionPresion;
    if (agujaRef.current) agujaRef.current.rotation.z = -Math.PI / 4 + (vibracionPresion * 1.5);
    if (engranajeRef.current) engranajeRef.current.rotation.z = time * 0.5;

    // Efecto despiece (Explode)
    const explode = (Math.sin(time * 0.8) + 1) / 2; 

    if (cristalRef.current) cristalRef.current.position.z = 0.8 + (explode * 4.5);
    if (agujaRef.current) agujaRef.current.position.z = 0.55 + (explode * 3.5);
    if (esferaRef.current) esferaRef.current.position.z = 0.5 + (explode * 2.5);
    
    if (engranajeRef.current) {
      engranajeRef.current.position.z = 0.2 + (explode * 1.5);
      engranajeRef.current.position.x = explode * 1.2;
    }
    if (palancaRef.current) {
      palancaRef.current.position.z = 0.1 + (explode * 1.0);
      palancaRef.current.position.y = explode * 1.5;
      palancaRef.current.rotation.x = explode * Math.PI / 4;
    }
    if (resorteRef.current) {
      resorteRef.current.position.z = -0.2 - (explode * 0.5);
      resorteRef.current.position.x = -explode * 1.5;
    }
    
    if (capsulaRef.current) capsulaRef.current.position.z = -0.5 - (explode * 2.0);
    if (carcasaRef.current) carcasaRef.current.position.z = -0.8 - (explode * 3.5);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <mesh ref={carcasaRef} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 0.5, 64]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh ref={capsulaRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.4, 32, 5]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh ref={resorteRef} position={[0, 0, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ca8a04" metalness={1} roughness={0.2} />
        </mesh>
        <mesh ref={palancaRef} position={[0.5, 0.5, 0.1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 1.8, 0.05]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </mesh>
        <mesh ref={engranajeRef} position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh ref={esferaRef}>
          <circleGeometry args={[2, 64]} />
          <meshStandardMaterial color="#f8fafc" roughness={1} />
        </mesh>
        <mesh ref={agujaRef}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 32]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[0.04, 1.6, 0.02]} />
            <meshStandardMaterial color="#00a650" />
          </mesh>
        </mesh>
        <mesh ref={cristalRef} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.1, 2.1, 0.05, 64]} />
          <meshPhysicalMaterial transparent opacity={0.25} roughness={0.0} transmission={0.95} thickness={0.5} envMapIntensity={2.5} />
        </mesh>
      </group>
    </Float>
  );
};

// =====================================================================
// COMPONENTE PRINCIPAL EXPORTADO
// =====================================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const ShowroomBackup = () => {
  return (
    <section className="showroom-3d-section">
      <div className="showroom-info">
        <motion.span variants={fadeInUp} initial="hidden" whileInView="visible" className="subtitle-green">
          INGENIERÍA & AUTOMATIZACIÓN
        </motion.span>
        <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" className="title-white">
          Instrumentación de Fuerza y Presión
        </motion.h2>
        <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" className="text-light-gray">
          En CERTIMET ofrecemos soluciones integrales para la industria nacional a través de dos unidades clave: nuestro Laboratorio de Calibración acreditado bajo la norma ISO/IEC 17025:2017, especializado en servicios de calibración en múltiples magnitudes; y nuestra División de Automatización y Control Industrial.
        </motion.p>
        
        <div className="showroom-buttons-container">
          <motion.button variants={fadeInUp} initial="hidden" whileInView="visible" className="btn-glow-main">
            VER SERVICIOS DE CALIBRACIÓN
          </motion.button>
          <motion.button variants={fadeInUp} initial="hidden" whileInView="visible" className="btn-outline-white">
            VER NUESTRAS ACREDITACIONES
          </motion.button>
        </div>
      </div>

      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <Stage intensity={0.6} environment="city">
              <BarometroMecanico3D />
            </Stage>
          </Suspense>
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
        </Canvas>
        <p className="instruccion-arrastre">👆 Arrastre para explorar el mecanismo interno</p>
      </div>
    </section>
  );
};

export default ShowroomBackup;