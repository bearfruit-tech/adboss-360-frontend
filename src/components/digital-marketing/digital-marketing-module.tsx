 'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CampaignTable from './campaign-table';

export default function DigitalMarketingModule() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="social-media">Social Media & Content</TabsTrigger>
          <TabsTrigger value="email-marketing">Email Marketing</TabsTrigger>
          <TabsTrigger value="paid-advertising">Paid Advertising</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="home" className="mt-10 mx-6">
  <CampaignTable />
</TabsContent>
        
        <TabsContent value="social-media" className="mt-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">Social Media & Content - Coming Soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="email-marketing" className="mt-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">Email Marketing & Automation - Coming Soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="paid-advertising" className="mt-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">Paid Advertising & Campaign Management - Coming Soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-gray-500">Analytics & Integration - Coming Soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}