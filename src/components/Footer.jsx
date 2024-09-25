import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4 p-4">
          {/* First part: Logo, information, and social media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold">l’Association des Musulmans d’Honfleur </span>
            </div>
            <p className="text-gray-300 max-w-md">
            Par la volonté d’Allah Le Tout Puissant, nous mettons à la dispostion des musulmans de Honfleur et sa région une mosquée. Une salle de prière (salat) pour la pratique d’un Islam digne, authentique et ouvert.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Second part: Links to website pages */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    L'Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos de nous
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                    Nos Services
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Adresse</h3>
              <p className="text-gray-300 max-w-md">
              51 Route Emile Renouf 14600 Honfleur, France
              </p>
              <h3 className="text-lg font-semibold my-2">Téléphone</h3>
              <p className="text-gray-300 max-w-md">
              09 55 80 69 38
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 p-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} l’Association des Musulmans d’Honfleur. Tous droits réservés.
        </div>
    </footer>
  )
}