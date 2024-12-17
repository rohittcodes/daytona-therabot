"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import ProfileToggle from "./profile-toggle";
import { HomeIcon, LogOutIcon, MessageCircleMoreIcon, SquareLibrary } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/components/globals/mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";

const Sidebar = () => {

  const user = useCurrentUser();

  const handleSignOut = () => {
    signOut();
  }

  const pathname = usePathname();

    const menuItems = [
        {
            name: "Home",
            href: "/app",
            icon: HomeIcon,
        },
        {
            name: "Explore",
            href: "/app/explore",
            icon: SquareLibrary,
        },
        {
            name: "Chat with TheraBot",
            href: "/app/chat",
            icon: MessageCircleMoreIcon
        },
    ];

  return (
    <div className="h-full w-[64px] border-border border-[1px] rounded-md drop-shadow-sm shadow-border">
      <div className="flex flex-col items-center justify-between h-full py-4 space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/app">
            <Image
              src="/logo.svg"
              width={36}
              height={36}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
          <Separator />
        </div>
        <div className="flex flex-col items-center h-full space-y-4">
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index}>
                    <Button
                        variant="outline"
                        size="icon"
                        className={`hover:bg-secondary hover:text-indigo-600 ${pathname === item.href ? "bg-secondary text-indigo-600" : ""}`}
                    >
                        <item.icon />
                    </Button>
                </Link>
            ))}
        </div>
        <div className="flex flex-col items-center space-y-2">
          <ModeToggle />
          <ProfileToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={handleSignOut}
            className="hover:bg-secondary hover:text-indigo-600"
          >
            <LogOutIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
