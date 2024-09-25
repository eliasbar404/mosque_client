import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import bgHero from "../assets/bgHero.jpg"
export default function HeroWithExternalCard() {
  return (
    <section className="relative w-full min-h-[300px] md:w-2/3 overflow-hidden rounded-md p-4 aspect-[16/9] md:h-[450px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: `url(${bgHero})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 py-12 md:px-6">
        <div className="max-w-3xl space-y-2 sm:space-y-6 sm:mt-6">
          <h1 className="text-xl font-bold font-serif tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-100">
          Rejoignez notre famille
          </h1>
          <p className="max-w-[600px] font-bold text-md sm:text-2xl text-gray-50">
          Bienvenue à tous sur le site de l’Association des Musulmans d’Honfleur !
          </p>
          <div className="flex sm:flex-row justify-center">
            <Button variant="secondary" size="sm" className="sm:h-11 sm:px-8" asChild>
              <Link to="/register">Rejoignez-nous</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}