import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"
import { useMe } from "../hooks/useMe"
import { useAdminLogin } from "../hooks/useAdminLogin"
import { Link } from "react-router-dom"

import { House ,UserRoundPen ,Users ,Newspaper ,PartyPopper ,Settings,UserCog,LogOut } from "lucide-react";

const data = [
    {icon:<House/>,        title:"Home",      link:"/subadmin/dashboard"},
    {icon:<UserRoundPen />,title:"Profile",   link:"/subadmin/dashboard/profile"},
    // {icon:<UserCog />,     title:"Admins",    link:"/subadmin/dashboard/admins"},
    {icon:<Users />,       title:"Members",   link:"/subadmin/dashboard/members"},
    {icon:<Newspaper />,   title:"Articles",  link:"/subadmin/dashboard/articles"},
    {icon:<PartyPopper />, title:"Events",    link:"/subadmin/dashboard/events"},
    {icon:<Settings />,    title:"Settings",  link:"/subadmin/dashboard/settings"},
];

const SubAdminAvatar = () => {
    // eslint-disable-next-line no-unused-vars
    const { user, loading, error } = useMe("subadmin");
    const {logout} = useAdminLogin();

    return loading ? <div>Loading...</div>:(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={`http://localhost:8000/${user.profile_picture_url}`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    data.map((val,index)=>(
                    <DropdownMenuItem key={index} className="cursor-pointer">
                        <Link to={val.link} className="flex gap-3">
                            <span>{val.icon}</span>
                            <span className="font-mono font-black">{val.title}</span>
                        </Link>
                    </DropdownMenuItem>
                    ))
                }
                <DropdownMenuItem className="cursor-pointer" onClick={()=>logout()} >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
)
}

export default SubAdminAvatar