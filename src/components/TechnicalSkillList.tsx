import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";

interface TechnicalSkillListProps {
  skills: string[];
}

export const TechnicalSkillList = ({ skills }: TechnicalSkillListProps) => {
  const [isNotScroll, setIsNotScroll] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    // Usamos un ResizeObserver para medir el scroll de forma más robusta
    const checkScroll = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setIsNotScroll(!hasOverflow);

      if (hasOverflow) {
        // Animación inicial de scroll
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        
        const timeout = setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }, 800);
        
        return () => clearTimeout(timeout);
      }
    };

    // requestAnimationFrame:
		// Es una función nativa del navegador que sirve para sincronizar tu código con el refresco
		// de la pantalla (normalmente 60 o 144 veces por segundo).
		// Imagina que el navegador es un animador que dibuja fotogramas. 
		// requestAnimationFrame (rAF) es como levantar la mano y decirle: 
		// "Espera, justo antes de que dibujes el siguiente cuadro, por favor ejecuta esta función".
    const frame = requestAnimationFrame(checkScroll);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ul
      ref={listRef}
      className={clsx(
        "flex space-x-2 overflow-x-auto no-scrollbar my-2 px-4 w-full max-w-md",
        isNotScroll ? "justify-end" : "justify-start"
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)'
      }}
    >
      {skills.map((item) => (
        <li
          key={item}
          className="border border-orange-400/30 rounded-sm px-2 text-orange-400 whitespace-nowrap lg:text-md"
        >
          {item}
        </li>
      ))}
    </ul>
  );
};