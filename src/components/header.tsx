"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import ClientProjectSelect from "./client-project-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";


export function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (hasCookie(Cookies.NAME)) {
      const cookieValue = getCookie(Cookies.NAME);
      if (cookieValue) {
        setUserName(`${cookieValue}`);
      }
    }
  }, []);

  const handleLogout = async () => {
    await signOut();

    // Clear all auth-related cookies
    deleteCookie(Cookies.BEARER_TOKEN);
    deleteCookie(Cookies.NAME);
    deleteCookie(Cookies.ORGANIZATION_ID);
    deleteCookie(Cookies.ORGANIZATION_NAME);
    deleteCookie(Cookies.ID);

    // Redirect to sign-in page
    window.location.href = "/sign-in";
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-end border-b bg-background px-6 shadow-sm">
      <nav className="flex items-center gap-6">
        <ClientProjectSelect />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

