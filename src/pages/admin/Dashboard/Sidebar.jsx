// import icons

import { House } from "lucide-react";
import { Link} from "react-router-dom";
import AdminAvatar from "../../../components/AdminAvatar";
// const data = [
//     {icon:<House/>,        title:"Home",      link:"/dashboard"},
//     {icon:<UserRoundPen />,title:"Profile",   link:"/dashboard/profile"},
//     {icon:<UserCog />,     title:"Admins",    link:"/dashboard/admins"},
//     {icon:<Users />,       title:"Members",   link:"/dashboard/members"},
//     {icon:<Newspaper />,   title:"Articles",  link:"/dashboard/articles"},
//     {icon:<PartyPopper />, title:"Events",    link:"/dashboard/events"},
//     {icon:<Settings />,    title:"Settings",  link:"/dashboard/settings"},
//     {icon:<LogOut/>,       title:"Logout",},
// ];


const Sidebar = () => {
    
    return (
        <div className="shadow-lg py-1 px-10 bg-white fixed w-full flex justify-between">
            <Link to={'/dashboard'}><House size={32} className="font-black"/></Link>
            <div><AdminAvatar/></div>
        </div>
            
)
}

export default Sidebar

            {/* <SheetContent side="left" className="w-[300px]">
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
            </SheetContent> */}

// export const CustomLink = (props)=>{
//     // const {logout} = useAdminLogin();
//     return (
        
//         // eslint-disable-next-line react/prop-types
//         <Link to={props.data.link} className="flex gap-2 p-2 rounded-md cursor-pointer hover:bg-slate-100 hover:text-blue-900" >
//             {/* eslint-disable-next-line react/prop-types */}
//             <span>{props.data.icon}</span>
//             {/* eslint-disable-next-line react/prop-types */}
//             <span className="font-mono font-black">{props.data.title}</span>
//         </Link>
//     )
// }
