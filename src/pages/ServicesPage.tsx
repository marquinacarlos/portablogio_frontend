import { List } from "../components/List"
import { Subtitle } from "../components/Subtitle"

const services = [
  {
    id: 1,
    title: "Tutoria personalizada",
    description: "una breve desccripcion",
    price: 15,
    features:null
  },
  {
    id: 2,
    title: "Single Page | One page",
    description: "una breve desccripcion",
    price: 150,
    features:null
  },
  {
    id: 3,
    title: "E-commerce",
    description: "una breve desccripcion",
    price: 1000,
    features:null
  },
  {
    id: 4,
    title: "Personal blog",
    description: "una breve desccripcion",
    price: 600,
    features:null
  },
]

export const ServicesPage = () => {
	return (
    <>
      <Subtitle>Services</Subtitle>
      <List>
        {services.map((item) => (
          <List.ServiceCard key={item.id} service={item} />
        ))}
      </List>
    </>
	)
}