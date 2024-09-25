import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Dons from "../assets/Dons.jpg"

export default function DonsAndContact() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 mx-4 px-4">
      <Card className="relative w-full h-[450px] xs:h-[350px] lg:h-[275px] overflow-hidden aspect-[16/9]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Dons})` }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative flex flex-col h-full bg-black/50 text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Soutenez-nous</CardTitle>
            <CardDescription className="text-gray-200">Contribuez aux charges de notre mosquée</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-100">
            Aidez la communauté musulmane en faisant un don aujourd'hui! Tous les dons contribuent au fonctionnement optimale de notre mosquée.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/donate" passHref>
              <Button className="w-full bg-white text-black hover:bg-gray-200">Faire un don</Button>
            </Link>
          </CardFooter>
        </div>
      </Card>

      <Card className="flex flex-col w-full h-[450px] xs:h-[350px] lg:h-[275px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Communiquer</CardTitle>
          <CardDescription>Nous aimerions avoir de vos nouvelles</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">
          Vous avez des questions ou vous souhaitez vous impliquer ? Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons dans les plus brefs délais.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/contact" passHref>
            <Button variant="outline" className="w-full">Contactez-nous</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}