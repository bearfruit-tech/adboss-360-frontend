import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import { authClient } from "@/lib/auth-client";

export function Header() {
    const [userName, setUserName] = useState("")
     const {data, error, isPending} = authClient.useListOrganizations()

    if(!isPending){
      if(!error){
        if(data[0] != null){
          const organizationId: string|null = data[0].id;
          const organizationName: string|null = data[0].name;
          if(organizationId != null && organizationName != null){
          setCookie(Cookies.ORGANIZATION_ID, organizationId);
          setCookie(Cookies.ORGANIZATION_NAME, organizationName);
          }
        }
      }else{
        console.log("Error getting an organization!")
      }
    }
    
    useEffect(() => {
      if(hasCookie("name")){
        const cookieValue =  getCookie(Cookies.NAME)
        if(cookieValue){
          setUserName(`${cookieValue}`)
        }
      }
  
    }, [])

    return <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-end border-b bg-background px-6 shadow-sm">
      <nav className="flex items-center gap-6">
        <Button variant="link" className="text-foreground">
          Client
        </Button>
        <Button variant="link" className="text-foreground">
          Project
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
          <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  }