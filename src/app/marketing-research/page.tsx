'use client'

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MenuItem } from "@/types/menu-items.enum"
import { Header } from "@/components/header"
import MarketingResearchModule from "@/components/marketing-research/marketing-research-module"

export default function MarketingResearchPage() {
  return (
    <div className="flex bg-background font-lexend">
      <DashboardSidebar activeMenuItem={MenuItem.MarketingResearch} />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-normal">Marketing Research</h1>
          
          <section className="mt-8">
            <MarketingResearchModule />
          </section>
        </main>
      </div>
    </div>
  );
} 