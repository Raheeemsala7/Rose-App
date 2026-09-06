"use client";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LocationEdit, LogOut, ScrollText, Settings, User } from "lucide-react";
import { Link } from "@/src/i18n/navigation";

const UserDropMenu = ({ name, firstName }: { name: string; firstName: string }) => {
    /* Initials for the avatar circle */
    const initials = firstName ? firstName.charAt(0).toUpperCase() : "U";

    const trigger = (
        <div className="flex items-center gap-1.5 cursor-pointer select-none">
            {/* Avatar circle — always visible */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-burgundy-700 dark:bg-blush-600 text-cream-50 text-sm font-bold flex-shrink-0">
                {initials}
            </div>
            {/* Name + chevron — hidden on mobile */}
            <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[10px] text-burgundy-400 dark:text-burgundy-400">Hello</span>
                <span className="text-sm font-semibold text-burgundy-800 dark:text-cream-100">{firstName}</span>
            </div>
            <ChevronDown size={14} className="hidden sm:block text-burgundy-400" />
        </div>
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={trigger} />

            <DropdownMenuContent
                className="w-56 z-[100] rounded-xl border border-cream-300 dark:border-burgundy-700 bg-cream-50 dark:bg-burgundy-900 shadow-xl py-1"
                align="end"
                sideOffset={8}
            >
                {/* User name header — plain div, not a GroupLabel (avoids Group context requirement) */}
                <div className="px-3 py-2 text-sm font-semibold text-burgundy-800 dark:text-cream-100 border-b border-cream-300 dark:border-burgundy-700 mb-1">
                    {name}
                </div>

                <DropdownMenuGroup className="p-1">
                    {[
                        { href: "/profile", icon: User, label: "Profile" },
                        { href: "/addresses", icon: LocationEdit, label: "My Addresses" },
                        { href: "/orders", icon: ScrollText, label: "Orders" },
                        { href: "/dashboard", icon: Settings, label: "Dashboard" },
                    ].map(({ href, icon: Icon, label }) => (
                        <DropdownMenuItem
                            key={href}
                            className="rounded-lg px-2 py-2 text-sm text-burgundy-800 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-burgundy-800 transition-colors cursor-pointer"
                        >
                            <Link href={href} className="flex items-center gap-2.5 w-full no-underline">
                                <Icon size={16} className="text-burgundy-500 dark:text-blush-400" />
                                {label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

                <DropdownMenuGroup className="p-1">
                    <DropdownMenuItem
                        onClick={() => signOut()}
                        className="rounded-lg px-2 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                        <span className="flex items-center gap-2.5 w-full">
                            <LogOut size={16} />
                            Log Out
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropMenu;
