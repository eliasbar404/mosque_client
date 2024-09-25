import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const events = [
  {
    id: 1,
    title: "Une séance de récitation et de mémorisation du Saint Coran",
    date: "May 5 - 7 May 2025",
    image: "/placeholder.svg?height=200&width=300",
    slug: "tech-conference-2024",
  },
  {
    id: 2,
    title: "Une séance de récitation et de mémorisation du Saint Coran",
    date: "July 16 - 17 July 2025",
    image: "/placeholder.svg?height=200&width=300",
    slug: "art-exhibition",
  },
  {
    id: 3,
    title: "Une séance de récitation et de mémorisation du Saint Coran",
    date: "3 Mars - 6 Mars 2025",
    image: "/placeholder.svg?height=200&width=300",
    slug: "music-festival",
  },
  {
    id: 3,
    title: "Une séance de récitation et de mémorisation du Saint Coran",
    date: "3 Mars - 6 Mars 2025",
    image: "/placeholder.svg?height=200&width=300",
    slug: "music-festival",
  },
]

export default function FutureEvents() {
  return (
      
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-4 px-4">
      {events.map((event) => (
        <Link href={`/events/${event.slug}`} key={event.id} className="group">
          <Card className="overflow-hidden transition-shadow duration-300 ease-in-out group-hover:shadow-xl">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <p className="text-muted-foreground">{event.date}</p>
            </CardHeader>
            <CardContent>
              <CardTitle>{event.title}</CardTitle>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>

  )
}