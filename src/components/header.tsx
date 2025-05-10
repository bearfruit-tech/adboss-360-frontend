import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { apiRequest } from "@/api";
import { HttpMethods } from "@/constants/api_methods";
import { APIRoutes } from "@/constants/api_routes";

export function Header() {
    const [userName, setUserName] = useState("")
    
    useEffect(() => {
      if(hasCookie("name")){
        const cookieValue =  getCookie("name")
        if(cookieValue){
          setUserName(`${cookieValue}`)
        }
      }
  
      if(getACookie().found){
        apiRequest(HttpMethods.GET, APIRoutes.ORGANIZATIONS.GET_ORGANIZATION+`/${getACookie().id}`)
          .then(response => {
            console.log(response)
            setCookie("organizationName", response?.name);
            setCookie("organizationId", response?.id)
          })
          .catch(err => {
            console.log(err)
          })
      }
  
    }, [])
  
    const getACookie = (): {found: boolean, id: string} =>  {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === "id") {
          console.log(cookieValue)
          return {found: true, id: cookieValue};
        }
      }
      return {found: false, id: ""};
    }

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