import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"
// import icons
import { useSubAdminLogin } from "../../../hooks/useSubAdminLogin";
import { LayoutDashboard,House ,UserRoundPen ,Users ,Newspaper ,PartyPopper ,Settings,LogOut} from "lucide-react";
import { Link} from "react-router-dom";
const data = [
    {icon:<House/>,        title:"Home",      link:"/subadmin/dashboard"},
    {icon:<UserRoundPen />,title:"Profile",   link:"/subadmin/dashboard/profile"},
    {icon:<Users />,       title:"Users",     link:"/subadmin/dashboard/users"},
    {icon:<Newspaper />,   title:"Articles",  link:"/subadmin/dashboard/articles"},
    {icon:<PartyPopper />, title:"Events",    link:"/subadmin/dashboard/events"},
    {icon:<Settings />,    title:"Settings",  link:"/subadmin/dashboard/settings"},
    // {icon:<LogOut/>,       title:"Logout",},
];


const Sidebar = () => {
    const {logout} = useSubAdminLogin();
    
    return (
        <Sheet>
            <div className="shadow-lg py-1 px-2 bg-white fixed w-full">
                <SheetTrigger><LayoutDashboard size={32} className="font-black"/></SheetTrigger>
            </div>
            
            <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="flex mt-10 gap-3">
                    {
                        data.map((val,index)=>(
                            <SheetTitle key={index}><CustomLink data={val}/></SheetTitle>
                        ))
                    }

                    <Link onClick={()=>logout()}  className="flex gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100 hover:text-blue-900" >
                        <span><LogOut/></span>
                        <span className="font-mono font-black text-lg">Logout</span>
                    </Link>
                    
                </SheetHeader>
            </SheetContent>

        </Sheet>
)
}

export default Sidebar



export const CustomLink = (props)=>{
    // const {logout} = useAdminLogin();
    return (
        
        // eslint-disable-next-line react/prop-types
        <Link to={props.data.link} className="flex gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100 hover:text-blue-900" >
            {/* eslint-disable-next-line react/prop-types */}
            <span>{props.data.icon}</span>
            {/* eslint-disable-next-line react/prop-types */}
            <span className="font-mono font-black">{props.data.title}</span>
        </Link>
    )
}