// import { Link } from "react-router";
import { CarouselOfItems } from "./CarouselOfItems";
import type { Project } from "../types";

interface ProjectCardProps {
	project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
	return(
		<li className="min-w-0 w-full">
			<a 
				href={project.url}
				target="_blank"
				className="block font-extralight text-3xl text-end uppercase text-brand md:text-5xl lg:text-7xl"
			>
				{project.title}
			</a>
			<p 
				className="text-sm text-end text-balance text-text-secondary lg:text-lg"
			>
				{project.description}
			</p>
			<CarouselOfItems>
				{project.tech_stack.map((item) => (
					<CarouselOfItems.Item key={item} item={item} />
				))}
			</CarouselOfItems>
			<p 
				className="text-xs font-extrabold text-end text-border lg:text-md"
			>
				Jan 20, 2024
			</p>
		</li>
	)
}