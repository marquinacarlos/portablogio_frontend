import type { ReactNode } from "react";
import './../css/blockquotes.css'

interface QuoteProps {
	children: ReactNode;
	className?: string;
}

export const Blockquote = ({ children, className }: QuoteProps) => {
	return(
		<blockquote className={`dobleQuotes ${className}`}>
        {children}
    </blockquote>
	)
}