import { AttendanceViewer } from './components/AttendanceViewer';
import { useState, useEffect } from 'react';

const Stars = () => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    setStars(Array.from({ length: 500 }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      delay: Math.random() * 4, size: Math.random() < 0.5 ? 1 : 2
    })));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {stars.map(s => (
        <div key={s.id} className="absolute bg-white rounded-full animate-[twinkle_4s_infinite]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px`, animationDelay: `${s.delay}s`, boxShadow: '0 0 4px 1px rgba(255,255,255,0.4)' }}
        />
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen text-white p-4 sm:p-8 flex justify-center items-center font-sans">
      <Stars />
      <AttendanceViewer />
    </div>
  );
}
