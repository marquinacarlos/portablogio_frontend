import clsx from "clsx";
import { useLayoutEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

interface CarouselItemProps {
  item: string;
}

const CarouselItems = ({ item }: CarouselItemProps) => {
  return (
    <li
      key={item}
      className="shrink-0 inline-block w-fit px-3 py-1 bg-surface-hover/50 border border-border rounded-md text-sm text-accent font-medium whitespace-nowrap"
    >
      {item}
    </li>
  );
};

export const CarouselOfItems = ({ children }: PropsWithChildren) => {
  const [isNotScroll, setIsNotScroll] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let timeout: number;

    const checkScroll = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setIsNotScroll(!hasOverflow);

      if (hasOverflow) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        
        timeout = setTimeout(() => {
          el.scrollTo({ left: 0, behavior: "smooth" });
        }, 800);
      }
    };

    /**
     * requestAnimationFrame:
     * Es una función nativa del navegador que sirve para sincronizar tu código con el refresco
		 * de la pantalla (normalmente 60 o 144 veces por segundo).
		 * Imagina que el navegador es un animador que dibuja fotogramas. 
		 * requestAnimationFrame (rAF) es como levantar la mano y decirle: 
		 * "Espera, justo antes de que dibujes el siguiente cuadro, por favor ejecuta esta función".
     */
    const frame = requestAnimationFrame(checkScroll);

    return () => {
      cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <ul
      ref={listRef}
      className={clsx(
        "min-w-0 w-full my-2 px-4 flex space-x-2 overflow-x-auto no-scrollbar whitespace-nowrap py-2",
        isNotScroll ? "justify-end" : "justify-start"
      )}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8px, black calc(100% - 8px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)'
      }}
    >
      {children}
    </ul>
  );
};

CarouselOfItems.Item = CarouselItems;