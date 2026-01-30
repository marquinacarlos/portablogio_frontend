import { Link } from "react-router";

export const Logo = () => {
	return (
		<>
			<div className='flex flex-col w-fit items-center pl-1'>
				<Link 
					to={{ pathname: '/'}} 
					className='text-2xl font-bold lg:text-2xl'
				>
					Carlos Marquina
				</Link>
				<p className='text-[.6rem] lg:text-xs font-light tracking-[.3rem] uppercase text-accent pl-1.5'>
					Desarrollador web
				</p>
			</div>
		</>
	)
}