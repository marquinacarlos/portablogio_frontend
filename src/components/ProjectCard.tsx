import { Link } from "react-router";
import { TechnicalSkillList } from "./TechnicalSkillList";
import type { Project } from "../types";

interface ProjectCardProps {
	project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
	return(
		<li className="flex flex-col w-full items-end">
			<Link 
				to={{ pathname: `/${project.slug}`}} 
				className="font-extralight text-3xl text-end uppercase text-orange-400 md:text-5xl lg:text-7xl">
				{project.title}
			</Link>
			<p className="w-fit max-w-sm text-sm text-end text-neutral-400 lg:max-w-md lg:text-lg">
				{project.description}
			</p>
			<TechnicalSkillList skills={project.tech_stack} />
			<p className="text-xs font-extrabold text-end text-neutral-700 lg:text-md">
				Jan 20, 2024
			</p>
		</li>
	)
}