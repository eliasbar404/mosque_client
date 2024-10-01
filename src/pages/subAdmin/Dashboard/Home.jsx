import { UserRoundPen ,Users ,Newspaper ,PartyPopper ,Settings,LogOut,Mail} from "lucide-react";
import { Link } from "react-router-dom";
import { useSubAdminLogin } from "../../../hooks/useSubAdminLogin";

const data = [
    {icon:<UserRoundPen size={100}/>,title:"Profile",   link:"/subadmin/dashboard/profile"},
    // {icon:<UserCog size={100}/>,     title:"Admins",    link:"/dashboard/admins"},
    {icon:<Users size={100}/>,       title:"Members",   link:"/subadmin/dashboard/members"},
    {icon:<Mail size={100}/>,        title:"Contacts",  link:"/subadmin/dashboard/contacts"},
    {icon:<Newspaper size={100}/>,   title:"Articles",  link:"/subadmin/dashboard/articles"},
    {icon:<PartyPopper size={100}/>, title:"Events",    link:"/subadmin/dashboard/events"},
    {icon:<Settings size={100}/>,    title:"Settings",  link:"/subadmin/dashboard/settings"},
];

const Home = () => {
    const {logout} = useSubAdminLogin();
    
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
                <span className="font-mono font-black text-2xl">Logout</span>
            </Link>
    </div>
)
}

export default Home