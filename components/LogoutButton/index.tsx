"use client"

import { useRouter } from 'next/navigation'
import { DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu'
import { signOut } from '@/lib/auth/auth-client'

const LogoutButton = () => {
    const router = useRouter();

    return (
        <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive" onClick={async () => {
                const result = await signOut();

                if (result.data) {
                    router.push("/");
                } else {
                    alert(result.error.message || "Failed to log out. Please try again.");
                }

            }}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
    )
}

export default LogoutButton