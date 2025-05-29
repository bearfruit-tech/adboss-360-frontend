"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getCookie, hasCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import ClientProjectSelect from "./client-project-select";


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

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-end border-b bg-background px-6 shadow-sm">
      <nav className="flex items-center gap-6">
        <ClientProjectSelect />
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
          <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}

