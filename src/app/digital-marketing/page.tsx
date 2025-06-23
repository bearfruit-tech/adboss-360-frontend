 'use client'

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MenuItem } from "@/types/menu-items.enum"
import { Header } from "@/components/header"
import DigitalMarketingModule from "@/components/digital-marketing/digital-marketing-module"

export default function DigitalMarketingPage() {
  return (
    <div className="flex bg-background font-lexend">
      <DashboardSidebar activeMenuItem={MenuItem.DigitalMarketing} />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-normal">Digital Marketing</h1>
          
          <section className="mt-8">
            <DigitalMarketingModule />
          </section>
        </main>
      </div>
    </div>
  );
}