import React, { useRef, useState, useEffect } from 'react';

export const CircularScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Escuchar el scroll
  const onScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={onScroll}
      className="h-[400px] overflow-y-auto border border-white/10 w-64 no-scrollbar px-10"
    >
      <div className="py-40"> {/* Padding para poder scrollear el primero y último */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Item key={i} index={i} containerScrollTop={scrollTop} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
};

const Item = ({ index, containerScrollTop, containerRef }: any) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState(0);

  useEffect(() => {
    if (itemRef.current && containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const itemOffsetTop = itemRef.current.offsetTop - containerScrollTop;
      
      // Calculamos el centro relativo (de -1 a 1)
      const centerRelative = (itemOffsetTop / containerHeight) * 2 - 1;
      
      // Aplicamos una parábola: x = (1 - y^2) * amplitud
      // Esto hace que en el centro (0) el valor sea máximo y en los bordes (1 o -1) sea 0
      const amplitude = 40; // Qué tanto se mete hacia los lados
      const moveX = (1 - Math.pow(centerRelative, 2)) * amplitude;
      
      setOffsetX(moveX);
    }
  }, [containerScrollTop]);

  return (
    <div
      ref={itemRef}
      style={{
        transform: `translateX(${offsetX}px)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="h-12 w-full bg-orange-500/20 border border-orange-400 mb-4 flex items-center justify-center rounded-lg"
    >
      Skill {index + 1}
    </div>
  );
};