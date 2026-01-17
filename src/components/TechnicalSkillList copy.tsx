import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface TechnicalSkillListProps {
	skills: string[] // o tambien puedo usar Array<string>
}

export const TechnicalSkillList = ({skills}: TechnicalSkillListProps ) => {

	const [isNotScroll, setIsNotScroll] = useState<boolean>(false)

	const listRef = useRef< HTMLUListElement | null>(null);

	useEffect(() => {
		const el = listRef.current;
		
		if(!el) return;

		// Solo scroll si hay overflow
		// scrollWidth -> Ancho total del contenido de un elemento, incluyendo la parte que no se ve por overflow.
		// clientWidth -> Ancho visible del elemento, excluyendo scrollbars, márgenes y contenido oculto.
    if (el.scrollWidth <= el.clientWidth) {
			setIsNotScroll(true)
			return;
		};

    // Scroll hacia la derecha
    el.scrollTo({
      left: el.scrollWidth,
      behavior: "smooth",
    });

    // Volver al inicio después de un tiempo
    const timeout = setTimeout(() => {
      el.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }, 800);

    return () => clearTimeout(timeout);
	}, []);

	return (
		<ul
			ref={listRef}
			className={clsx(
				"flex space-x-2 overflow-x-auto no-scrollbar my-2 pl-4 pr-4 w-full max-w-md px-4",
				isNotScroll && "justify-end"
			)}
			style={{
				maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
				WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
			}}
		>
			{skills.map((item) => (
					<li
						key={item}
						className="border border-orange-400/30 rounded-sm px-2 text-orange-400 whitespace-nowrap lg:text-md"
					>
						<span>{item}</span>
					</li>
			))}
		</ul>
	)
	// return (
	// 	<div className="relative">
	// 		<div className="absolute top-0 left-0 w-6 h-full pointer-events-none bg-linear-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-transparent z-10"></div>
	// 		<ul
	// 			ref={listRef}
	// 			className="flex space-x-2 overflow-x-auto no-scrollbar my-2 pl-4 pr-6 max-w-md"
	// 		>
	// 			{skills.map((item) => (
	// 					<li
	// 						key={item}
	// 						className="border border-orange-400/30 rounded-sm px-2 text-orange-400/30 whitespace-nowrap lg:text-md"
	// 					>
	// 						<span>{item}</span>
	// 					</li>
	// 			))}
	// 		</ul>
	// 		<div className="absolute top-0 right-0 w-8 h-full pointer-events-none bg-linear-to-l from-neutral-950/90 via-neutral-950/70 to-neutral-transparent z-10"></div>
	// 	</div>
	// )
}


