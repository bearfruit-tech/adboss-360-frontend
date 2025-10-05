'use client'

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MenuItem } from "@/types/menu-items.enum"
import { Header } from "@/components/header"
import DigitalMarketingCampaignModule from "@/components/digital-marketing-campaign/digital-marketing-campaign-module"

export default function DigitalMarketingCampaignPage() {
  return (
    <div className="flex bg-background font-lexend">
      <DashboardSidebar activeMenuItem={MenuItem.DigitalMarketing} />
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-normal">Digital Marketing Campaign</h1>

          <section className="mt-8">
            <DigitalMarketingCampaignModule />
          </section>
        </main>
      </div>
    </div>
  );
}
