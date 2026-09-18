import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import HeroScene from './components/HeroScene.jsx';
import './App.css';

function App() {
  // 1. Membuat "jangkar" (ref) untuk menargetkan elemen HTML
  const containerRef = useRef(null);

  // 2. Menulis logika animasi GSAP
  useGSAP(() => {
    gsap.fromTo(
      '.hero-title, .hero-subtitle',
      { 
        y: 50,      // Mulai dari posisi 50 pixel di bawah
        opacity: 0  // Transparan (tidak terlihat)
      },
      { 
        y: 0,       // Bergerak ke posisi normalnya
        opacity: 1, // Muncul sepenuhnya
        duration: 1.5, // Durasi animasi (detik)
        stagger: 0.2,  // Jeda waktu antara judul dan sub-judul
        ease: 'power3.out' // Efek melambat di akhir (smooth)
      }
    );
  }, { scope: containerRef }); // Batasi animasi dalam container ini

  return (
    <main className="hero-container" ref={containerRef}>
      <HeroScene />
      <div className="text-wrapper">
        <h1 className="hero-title">Maeru</h1>
        <p className="hero-subtitle">Hello World!</p>
      </div>
    </main>
  );
}

export default App;