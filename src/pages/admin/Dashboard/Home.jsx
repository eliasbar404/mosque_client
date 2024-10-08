import { UserRoundPen ,Users ,Newspaper ,PartyPopper ,Settings,LogOut,UserCog,Mail} from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminLogin } from "../../../hooks/useAdminLogin";

const data = [
    {icon:<UserRoundPen size={100}/>,title:"Profil",   link:"/dashboard/profile"},
    {icon:<UserCog size={100}/>,     title:"Admins",    link:"/dashboard/admins"},
    {icon:<Users size={100}/>,       title:"Membres",   link:"/dashboard/members"},
    {icon:<Mail size={100}/>,        title:"Messages",  link:"/dashboard/contacts"},
    {icon:<Newspaper size={100}/>,   title:"Articles",  link:"/dashboard/articles"},
    {icon:<PartyPopper size={100}/>, title:"Événements",    link:"/dashboard/events"},
    {icon:<Settings size={100}/>,    title:"Paramètres",  link:"/dashboard/settings"},


];

const Home = () => {
    const {logout} = useAdminLogin();
    
    return (
    <div className="grid grid-cols-5 gap-x-2 gap-y-10 px-10 py-16">
            {data.map((val,index)=>(
                <Link to={val.link} key={index} className="inline-flex flex-col items-center justify-center bg-white p-2 w-[200px] h-[200px] rounded-lg transition-all hover:bg-blue-400 hover:text-slate-50 hover:scale-110">
                    <span>{val.icon}</span>
                    <span className="font-mono font-black text-2xl">{val.title}</span>
                </Link>
            ))}

            <Link onClick={()=>logout()}  className="inline-flex flex-col items-center justify-center bg-white p-2 w-[200px] h-[200px] rounded-lg transition-all hover:bg-blue-400 hover:text-slate-50 hover:scale-110" >
                <span><LogOut size={100}/></span>
                <span className="font-mono font-black text-2xl">Déconnexion</span>
            </Link>
    </div>
)
}

export default Home