import type React from "react"

export const Subtitle = ({children}: { children: React.ReactNode }) => {
	return (
		<h2 className="w-fit text-2xl z-10 lg:text-4xl lg:left-">
			{children}
		</h2>
		// <h2 className="w-fit absolute top-2 left-2 text-2xl z-10 lg:text-4xl lg:left-">
		// 	{children}
		// </h2>
	)
}