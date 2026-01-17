import '../css/background_animated.css';


export const BackgroundAnimated = () => {
	return (
		<div className="animatedwrapper">
			<div className="optimized-dot dot-red"></div>
			<div className="optimized-dot dot-purple"></div>
			<div className='absolute top-0 left-0 w-dvw h-dvh backdrop-blur-xl'></div>
		</div>
	)
}