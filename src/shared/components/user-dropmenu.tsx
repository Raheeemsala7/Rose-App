"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ChevronDown, LocationEdit, LogOut, ScrollText, Settings, User } from "lucide-react"
import { Separator } from "./ui/separator"
import { Link } from "@/src/i18n/navigation"
const UserDropMenu = ({ name, firstName }: { name: string; firstName: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <div className="flex items-center gap-0.5">
                    <div className="flex flex-col gap-0.1">
                        <span className="text-zinc-500 text-xs">Hello</span>
                        <span className="text-base font-medium text-maroon-700 dark:text-soft-pink-200">{firstName}</span>
                    </div>
                    <ChevronDown className="text-zinc-500" />

                </div>
            } />
            <DropdownMenuContent className="w-61 relative z-100 bg-white dark:bg-zinc-600 rounded-xl" align="start">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className={"text-maroon-700 dark:text-soft-pink-200 text-base py-1.5 px-2"}>{name}</DropdownMenuLabel>
                    <Separator className="bg-zinc-100 dark:bg-zinc-700 mt-3" />
                    <div className="p-1.25">
                        <DropdownMenuItem className={"dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"}>
                            <Link href={"/profile"} className="flex items-center gap-2">
                                <User className="size-5" />
                                <span className="text-base"> Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"}>
                            <Link href={"/profile"} className="flex items-center gap-2">
                                <LocationEdit className="size-5" />
                                <span className="text-base"> My Addresses</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"}>
                            <Link href={"/profile"} className="flex items-center gap-2">
                                <ScrollText className="size-5" />
                                <span className="text-base"> Orders</span>
                            </Link>
                        </DropdownMenuItem>

                    </div>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <Separator className="bg-zinc-100 dark:bg-zinc-700 mb-1" />
                    <DropdownMenuItem className={"dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"}>
                        <Link href={"/profile"} className="flex items-center gap-2">
                            <Settings className="size-5" />
                            <span className="text-base"> Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <Separator className="bg-zinc-100 dark:bg-zinc-700 mt-1" />

                </DropdownMenuGroup>
                <DropdownMenuGroup className={"p-1.25"}>
                    <DropdownMenuItem
                        onClick={async() => {
                            await signOut({
                                // redirect:"/login"
                            })
                        }}
                        className={"flex items-center gap-2 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700"}>
                        <LogOut className="size-5" />
                        <span className="text-base"> Log Out</span>
                    </DropdownMenuItem>

                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropMenu