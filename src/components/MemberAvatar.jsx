import {LogOut} from "lucide-react"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuShortcut,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Avatar,AvatarFallback,AvatarImage,} from "@/components/ui/avatar"
import { useMe } from "../hooks/useMe"
import { useMemberLogin } from "../hooks/useMemberLogin"

const MemberAvatar = () => {
    // eslint-disable-next-line no-unused-vars
    const { user, loading, error } = useMe("member");
    const {logout} = useMemberLogin();

    return loading ? <div>Loading...</div>:(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={`http://localhost:8000/${user.profile_picture_url}`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.last_name} {user.first_name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={()=>logout()} >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
)


}

export default MemberAvatar