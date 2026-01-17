import { WhatsappIcon } from "./WhatsappIcon"



export const floatButton = () => {
	return(
		<button className={`fixed bottom-0 right-0 bg-emerald-400 rounded-full w-8 h-8`}>
			<WhatsappIcon />
		</button>
	)
}