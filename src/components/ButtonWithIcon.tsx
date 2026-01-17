import type { ReactNode } from "react";


interface ButtonWithIconProps {
	children: ReactNode;
	icon?: ReactNode;
	className?: string;
}

export const ButtonWithIcon = ({ children, icon, className }: ButtonWithIconProps) => {
	return(
		<button className={`flex items-center justify-center whitespace-nowrap py-1 px-3 bg-cyan-400 rounded-md gap-2 ${className}`}>
			{icon && <span className="shrink-0">{icon}</span>}
			<span>{children}</span>
		</button>
	)
}