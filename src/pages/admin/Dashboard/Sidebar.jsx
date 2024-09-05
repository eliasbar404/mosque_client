import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet"
// import icons
import { LayoutDashboard,House ,UserRoundPen ,Users ,Newspaper ,PartyPopper ,Settings,LogOut} from "lucide-react";
import { Outlet , Link} from "react-router-dom";
const data = [
    {icon:<House/>,        title:"Home",      link:"/dashboard"},
    {icon:<UserRoundPen />,title:"Profile",   link:"/dashboard/profile"},
    {icon:<Users />,       title:"Users",     link:"/dashboard/users"},
    {icon:<Newspaper />,   title:"Articles",  link:"/dashboard/articles"},
    {icon:<PartyPopper />, title:"Events",    link:"/dashboard/events"},
    {icon:<Settings />,    title:"Settings",  link:"/dashboard/settings"},
    {icon:<LogOut/>,       title:"Logout",    link:"/logout"},
];


const Sidebar = () => {
    return (
        <Sheet>
            <div className="shadow-lg py-1 px-2">
                <SheetTrigger><LayoutDashboard size={32} className="font-black"/></SheetTrigger>
            </div>
            
            <SheetContent side="left" className="w-[300px]">
                <SheetHeader className="flex mt-10 gap-3">
                    {
                        data.map((val,index)=>(
                            <SheetTitle key={index}><CustomLink data={val}/></SheetTitle>
                        ))
                    }
                    
                </SheetHeader>
            </SheetContent>

            <div className="p-2">
                <Outlet/>
            </div>
        </Sheet>
)
}

export default Sidebar



export const CustomLink = (props)=>{
    return (
        
        // eslint-disable-next-line react/prop-types
        <Link to={props.data.link} className="flex gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100 hover:text-blue-900">
            {/* eslint-disable-next-line react/prop-types */}
            <span>{props.data.icon}</span>
            {/* eslint-disable-next-line react/prop-types */}
            <span>{props.data.title}</span>
        </Link>
    )
}
