import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Grid } from '@react-three/drei';

// Menggerakkan kamera sedikit mengikuti posisi mouse, biar terasa "hidup"
// tanpa harus bikin objek yang berputar sendiri. Posisi mouse diambil dari
// window (bukan event canvas), supaya canvas tetap bisa pointer-events: none
// dan tidak menghalangi klik pada teks/tombol di atasnya.
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useFrame(() => {
    const targetX = mouse.current.x * 1.2;
    const targetY = 1.4 - mouse.current.y * 0.4;

    // Lerp (interpolasi halus) supaya gerakannya smooth, bukan langsung nempel ke mouse
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0.4, 0);
  });

  return null;
}

// Grid lantai bergaya "digital space": dua layer garis (cell halus + section terang)
// yang memudar (fade) ke kejauhan supaya menyatu dengan background gelap.
function DigitalGrid() {
  return (
    <Grid
      position={[0, -1, 0]}
      args={[10.5, 10.5]}
      cellSize={0.5}
      cellThickness={0.6}
      cellColor="#1f2937"
      sectionSize={2.5}
      sectionThickness={1.2}
      sectionColor="#ffffff"
      fadeDistance={22}
      fadeStrength={1.5}
      infiniteGrid
      followCamera={false}
    />
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      camera={{ position: [0, 1.4, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
    >
      {/* Fog bikin grid perlahan menghilang ke warna background, kesan "ruang tanpa batas" */}
      <fog attach="fog" args={['#050505', 6, 20]} />
      <ambientLight intensity={0.6} />
      <DigitalGrid />
      <CameraRig />
    </Canvas>
  );
}