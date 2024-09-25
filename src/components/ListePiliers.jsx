import chahada from "../assets/chahada.jpg"
import Salat from "../assets/Salat.jpeg"
import Zakat from "../assets/Zakat.jpg"
import Sawm from "../assets/Sawm.jpg"
import Hajj from "../assets/Hajj.jpg"


const data = [
  { title: "Chahada (Profession de foi)", desc: "Attestation qu’il n'y a pas d'autre dieu qu'Allah, et que Muhammad est Son messager.", image: `${chahada}`},

  { title: "Salat (Prière)", desc: "L'accomplissement des cinq prières quotidiennes à des moments précis de la journée.", image: `${Salat}`},

  { title: "Zakat (Aumône)", desc: "Un don obligatoire aux personnes dans le besoin, représentant généralement 2,5 % de la richesse annuelle.", image: `${Zakat}`},

  { title: "Sawm (Jeûne)", desc: " Le jeûne du mois de Ramadan, consistant à s'abstenir de manger, boire et autres plaisirs, du lever au coucher du soleil.", image: `${Sawm}`},

  { title: "Hajj (Pèlerinage)", desc: " Le pèlerinage à La Mecque que tout musulman doit effectuer au moins une fois dans sa vie s’il en a les moyens.", image: `${Hajj}`},
]

const ListePiliers = () => {
  return (
    <div className="flex flex-col m-2">

      <div className="w-full space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:flex">
        {data.map((item, index) =>(
          <div key={index} className="relative  w-full h-[200px] overflow-hidden rounded-md aspect-[16/9] ">

            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${item.image})` }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            <div className="relative h-full flex flex-col items-center justify-center text-center text-white space-y-6 sm:space-y-2">

              <h2 className="text-lg font-bold w-2/3">{item.title}</h2>
              <p className="w-3/4 lg:w-full ">{item.desc}</p>

            </div>
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default ListePiliers