import { List } from "../components/List";

const projects = [
	{
		id: 1,
		title: "Flowventory",
		slug: "flowventory_slug",
		description: "Una aplicación POS (Point of sale) para el manejo, gestión y control de inventario para tiendas de cualquier tipo",
		tech_stack: [
			"Javascript",
			"React",
			"Supabase",
			"Storage",
			"Autenticación",
			"SQL",
			"PostgreSQL"
		]
	},
	{
		id: 2,
		title: "Minitweet",
		slug: "minitweet_slug",
		description: "Una red social inspirada en Reddit y Twitter para compartir ideas, fotos, interactuar con publicaciones y chatear.",
		tech_stack: [
			"Javascript",
			"Vue",
			"Firebase",
			"Firestore",
			"Autenticación",
			"NoSQL DB"
		]
	}
];

export const ProjectsPage = () => {
	return (
		<>
			<List>
				{projects.map((project) => (
					<List.ProjectCard key={project.id} project={project} />
				))}
			</List>
		</>
	)
}