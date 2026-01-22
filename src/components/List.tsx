import type { ReactNode } from "react";
import { ServiceCard } from "./ServiceCard";
import { ProjectCard } from "./ProjectCard";

interface ListProps {
	children: ReactNode;
}

export const List = ({ children } : ListProps) => {
  return(
      <ul className="min-w-0 w-full flex flex-col space-y-2 items-end">
        {children}
      </ul>
  )
}

List.ServiceCard = ServiceCard;
List.ProjectCard = ProjectCard;
// List.BlogCard = BlogCard;






