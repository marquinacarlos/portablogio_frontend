import { MessageCircle, Phone } from "lucide-react"

export const WhatsappIcon = () => {
	return(
		<span className="relative">
			<Phone 
				strokeWidth={2} 
				size={12} 
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
			/>
			<MessageCircle strokeWidth={1} />
		</span>
	)
}