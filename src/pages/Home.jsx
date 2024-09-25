import HeroSection from "../components/HeroSection"
import ListePiliers from "../components/ListePiliers"
import Mawaqit from "../components/Mawaqit"
import ArticleSlider from "../components/ArticleSlider"
import FutureEvents from "../components/FutureEvents"
import DonsAndContact from "../components/DonsAndContact"
import Footer from "../components/Footer"


const Home = () => {
    return (
        <>

            <div className="flex flex-col md:flex-row md:h-[90%] py-6 px-2 gap-2">
                <HeroSection />
                <Mawaqit />
            </div>

            <div className="w-full py-8">
                <h2 className="text-3xl text-center font-bold mb-4">Les Cinq Piliers de l'Islam</h2>
                <ListePiliers />
            </div>
            
            <div className="w-full py-8">
                <h1 className="text-3xl text-center font-bold mb-4">Articles</h1>
                <ArticleSlider />
            </div>

            <div className="w-full py-8">
                <h2 className="text-3xl text-center font-bold mb-4"> Événements</h2>
                <FutureEvents />
            </div>

            <div className="w-full py-8">
               <DonsAndContact /> 
            </div>

            <div className="w-full pt-8">
                <Footer />
            </div>

        </>
    ) 
}

export default Home