import { House } from "lucide-react";
import { Link} from "react-router-dom";
import AdminAvatar from "../../../components/AdminAvatar";



const Sidebar = () => {
    
    return (
        <div className="shadow-lg py-1 px-10 bg-white fixed w-full flex justify-between">
            <Link to={'/dashboard'}><House size={32} className="font-black"/></Link>
            <div><AdminAvatar/></div>
        </div>
            
)
}

export default Sidebar


