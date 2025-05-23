"use client"

import Link from "next/link"
import {
  Home,
  Briefcase,
  BarChart2,
  Search,
  Calendar,
  LineChart,
  FileText,
  Lightbulb,
  Plus,
  MessageSquare,
  HelpCircle,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { MenuItem } from "@/types/menu-items.enum";
import { getCookie, hasCookie } from "cookies-next";
import { Cookies } from "@/constants/cookies";
import { useEffect, useState } from "react";

type DashboardSidebarProps = {
    activeMenuItem: MenuItem
}

export function DashboardSidebar({
    activeMenuItem,
}:DashboardSidebarProps) {

  const [organisationName, setOrganisationName] = useState("");

  useEffect(() => {
    if(hasCookie(Cookies.NAME)) {
      const cookieValue =  getCookie(Cookies.ORGANIZATION_NAME)
      if(cookieValue){
        setOrganisationName(`${cookieValue}`)
      }
    }

  }, [])
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar className="border-r font-lexend font-light text-text-black">
        <SidebarHeader className="flex flex-row items-center gap-2 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light">
            <span className="text-md font-semibold">{organisationName.charAt(0).toUpperCase()}</span>
          </div>
          <span className="text-md font-medium text-text-black">{organisationName || ""}</span>
        </SidebarHeader>
        <SidebarContent className="px-5 text-text-black text-xs">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.Home ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="/dashboard">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem >
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.BrandManagement ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="/branding">
                  <Briefcase className="h-5 w-5" />
                  <span>Brand Management</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
            <SidebarMenuButton asChild className={activeMenuItem === MenuItem.DigitalMarketing ? "bg-purple-light-bg text-slate-700" : ""}>
              <Link href="/digital-marketing">
                <BarChart2 className="h-5 w-5" />
                <span>Digital Marketing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.MarketingResearch ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="#">
                  <Search className="h-5 w-5" />
                  <span>Marketing Research</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.MediaPlanning ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="#">
                  <Calendar className="h-5 w-5" />
                  <span>Media Planning</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.MarketingStrategy ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="#">
                  <LineChart className="h-5 w-5" />
                  <span>Marketing Strategy</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.ProposalAndPitchDevelopment ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="#">
                  <FileText className="h-5 w-5" />
                  <span>Proposal & Pitch Development</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className={activeMenuItem === MenuItem.ExperientialMarketing ? "bg-purple-light-bg text-slate-700" : ""}>
                <Link href="#">
                  <Lightbulb className="h-5 w-5" />
                  <span>Experiential Marketing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="bg-primary text-white hover:bg-slate-800">
                <button className="flex justify-center text-sm font-normal">
                  <span>New Campaign</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button>
                  <Plus className="h-5 w-5" />
                  <span>Invite team</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button>
                  <MessageSquare className="h-5 w-5" />
                  <span>Feedback</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button>
                  <HelpCircle className="h-5 w-5" />
                  <span>Help and docs</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
