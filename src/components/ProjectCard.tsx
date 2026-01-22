import { Link } from "react-router";
import { CarouselOfItems } from "./CarouselOfItems";
import type { Project } from "../types";

interface ProjectCardProps {
	project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
	console.log(project)
	return(
		<li className="min-w-0 w-full">
			<Link 
				to={{ pathname: `/${project.slug}`}} 
				className="font-extralight text-3xl text-end uppercase text-orange-400 md:text-5xl lg:text-7xl"
			>
				{project.title}
			</Link>
			<p 
				className="w-fit max-w-sm text-sm text-end text-amber-100/70 lg:max-w-md lg:text-lg"
			>
				{project.description}
			</p>
			<CarouselOfItems>
				{project.tech_stack.map((item) => (
					<CarouselOfItems.Item key={item} item={item} />
				))}
			</CarouselOfItems>
			<p 
				className="text-xs font-extrabold text-end text-neutral-700 lg:text-md"
			>
				Jan 20, 2024
			</p>
		</li>


	
		// 	<TechnicalSkillList skills={project.tech_stack} />
		
	)
}