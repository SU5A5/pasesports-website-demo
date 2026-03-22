import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Sparkles } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

// A simple placeholder for the 3D scene since we don't have actual models
// In a real app, we'd load GLTF models for each sport
function SportScene({ sport }: { sport: string }) {
  // We'll just use simple geometry to represent the "vibe"
  const getColors = () => {
    switch (sport) {
      case 'Tennis': return { main: '#3A7BD5', glow: '#5BA3E0' };
      case 'Badminton': return { main: '#E8F4FD', glow: '#7BA8C4' };
      case 'Pickleball': return { main: '#22C55E', glow: '#4ade80' };
      case 'Football': return { main: '#16a34a', glow: '#22c55e' };
      case 'Cricket': return { main: '#ca8a04', glow: '#facc15' };
      default: return { main: '#3A7BD5', glow: '#5BA3E0' };
    }
  };

  const colors = getColors();

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050A14" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Court Lines (Abstract) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.99, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshBasicMaterial color={colors.main} transparent opacity={0.1} wireframe />
      </mesh>

      {/* Abstract Centerpiece */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[10, 0.1, 20]} />
        <meshStandardMaterial color={colors.main} emissive={colors.glow} emissiveIntensity={0.2} transparent opacity={0.4} />
      </mesh>

      {/* Particles */}
      <Sparkles count={250} scale={30} size={2} speed={0.2} opacity={0.5} color={colors.glow} />
    </group>
  );
}

export default function Hero3D({ activeSport }: { activeSport: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-void overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-raised via-void to-void opacity-80" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-void z-0">
      <Canvas camera={{ position: [0, 15, 30], fov: 45 }}>
        <Suspense fallback={<color attach="background" args={['#050A14']} />}>
          <color attach="background" args={['#050A14']} />
          <fog attach="fog" args={['#050A14', 20, 60]} />
          
          <ambientLight intensity={0.2} color="#050A14" />
          <directionalLight position={[10, 20, 5]} intensity={1.5} color="#5BA3E0" />
          <spotLight position={[0, 30, 0]} angle={0.3} penumbra={1} intensity={2} color="#E8F4FD" castShadow />

          <SportScene sport={activeSport} />
          
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0.3} 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.1} // Don't go below ground
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void pointer-events-none" />
    </div>
  );
}
