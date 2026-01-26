import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/lib/auth/auth-client"
import LogoutButton from "../LogoutButton";

export function AvatarDropdown() {
    const { data: session } = useSession();

    const avatarImage = session?.user?.image || undefined;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                    <Avatar>
                        <AvatarImage src={avatarImage} />
                        <AvatarFallback className="bg-primary text-white">
                            {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <div className="border-b border-gray-200 mb-2">
                    <p className="px-2 py-2 text-xs font-small">Hello, {session?.user?.name || "User"}</p>
                    <p className="px-2 text-xs font-small pb-2">{session?.user?.email || ""}</p>
                </div>
                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
