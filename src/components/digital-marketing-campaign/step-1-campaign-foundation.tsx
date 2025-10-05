'use client'

import { useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useDigitalMarketingCampaignStore from "@/stores/use-digital-marketing-campaign-store";
import TargetAudienceForm from './target-audience-form';

export default function Step1CampaignFoundation() {
  const { campaignFoundation, updateCampaignFoundation, toggleSecondaryGoal } = useDigitalMarketingCampaignStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string): void => {
    updateCampaignFoundation(field, e.target.value);
  };

  const handleRadioChange = (value: string, field: string): void => {
    updateCampaignFoundation(field, value);
  };

  const handleCheckboxChange = (checked: boolean, goal: string): void => {
    if (checked || !checked) {
      toggleSecondaryGoal(goal);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaign Foundation & Strategy</h1>
        <p className="mt-1 text-gray-600">Define the core parameters and strategic foundation for your digital marketing campaign.</p>
      </div>

      <div className="space-y-8">
        {/* Campaign Basics */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Basics</CardTitle>
            <CardDescription>Essential information about your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="campaignName" className="mb-2 block">Campaign Name</Label>
              <Input
                id="campaignName"
                value={campaignFoundation.campaignName}
                onChange={(e) => handleTextChange(e, 'campaignName')}
                placeholder="Enter a descriptive campaign name"
              />
            </div>

            <div>
              <Label htmlFor="productService" className="mb-2 block">Product/Service Being Promoted</Label>
              <Textarea
                id="productService"
                value={campaignFoundation.productService}
                onChange={(e) => handleTextChange(e, 'productService')}
                placeholder="Describe what you're promoting in this campaign"
                rows={3}
              />
            </div>

            <div>
              <Label className="mb-3 block">Campaign Objective</Label>
              <RadioGroup value={campaignFoundation.campaignObjective} onValueChange={(value) => handleRadioChange(value, 'campaignObjective')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product-launch" id="product-launch" />
                  <Label htmlFor="product-launch">Product Launch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="brand-awareness" id="brand-awareness" />
                  <Label htmlFor="brand-awareness">Brand Awareness</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lead-generation" id="lead-generation" />
                  <Label htmlFor="lead-generation">Lead Generation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seasonal-promotion" id="seasonal-promotion" />
                  <Label htmlFor="seasonal-promotion">Seasonal Promotion</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rebranding" id="rebranding" />
                  <Label htmlFor="rebranding">Rebranding Announcement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="event-marketing" id="event-marketing" />
                  <Label htmlFor="event-marketing">Event Marketing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer-acquisition" id="customer-acquisition" />
                  <Label htmlFor="customer-acquisition">Customer Acquisition</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="re-engagement" id="re-engagement" />
                  <Label htmlFor="re-engagement">Re-engagement Campaign</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">Primary Goal</Label>
              <RadioGroup value={campaignFoundation.primaryGoal} onValueChange={(value) => handleRadioChange(value, 'primaryGoal')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="increase-sales" id="increase-sales" />
                  <Label htmlFor="increase-sales">Increase Sales</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="generate-leads" id="generate-leads" />
                  <Label htmlFor="generate-leads">Generate Leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="build-awareness" id="build-awareness" />
                  <Label htmlFor="build-awareness">Build Awareness</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="drive-traffic" id="drive-traffic" />
                  <Label htmlFor="drive-traffic">Drive Website Traffic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boost-engagement" id="boost-engagement" />
                  <Label htmlFor="boost-engagement">Boost Engagement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="increase-conversions" id="increase-conversions" />
                  <Label htmlFor="increase-conversions">Increase Conversions</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">Secondary Goals (select all that apply)</Label>
              <div className="space-y-2">
                {[
                  { id: 'grow-email-list', label: 'Grow Email List' },
                  { id: 'increase-social-followers', label: 'Increase Social Media Followers' },
                  { id: 'improve-brand-perception', label: 'Improve Brand Perception' },
                  { id: 'drive-app-downloads', label: 'Drive App Downloads' },
                  { id: 'promote-content', label: 'Promote Content' },
                  { id: 'support-sales-team', label: 'Support Sales Team' },
                  { id: 'educate-market', label: 'Educate Market' },
                  { id: 'competitive-positioning', label: 'Competitive Positioning' }
                ].map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal.id}
                      checked={campaignFoundation.secondaryGoals.includes(goal.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(!!checked, goal.id)}
                    />
                    <Label htmlFor={goal.id}>{goal.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Who is your primary target audience?</CardTitle>
            <CardDescription>Define the demographics of your ideal customers.</CardDescription>
          </CardHeader>
          <TargetAudienceForm />
        </Card>

        {/* Budget & Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Budget & Timeline</CardTitle>
            <CardDescription>Campaign duration and financial parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="totalBudget" className="mb-2 block">Total Campaign Budget</Label>
              <Input
                id="totalBudget"
                value={campaignFoundation.totalBudget}
                onChange={(e) => handleTextChange(e, 'totalBudget')}
                placeholder="e.g., $10,000"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="campaignStartDate" className="mb-2 block">Campaign Start Date</Label>
                <Input
                  id="campaignStartDate"
                  type="date"
                  value={campaignFoundation.campaignStartDate}
                  onChange={(e) => handleTextChange(e, 'campaignStartDate')}
                />
              </div>

              <div>
                <Label htmlFor="campaignEndDate" className="mb-2 block">Campaign End Date</Label>
                <Input
                  id="campaignEndDate"
                  type="date"
                  value={campaignFoundation.campaignEndDate}
                  onChange={(e) => handleTextChange(e, 'campaignEndDate')}
                />
              </div>
            </div>

            <div>
              <Label className="mb-3 block">Campaign Urgency</Label>
              <RadioGroup value={campaignFoundation.urgency} onValueChange={(value) => handleRadioChange(value, 'urgency')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="time-sensitive" id="time-sensitive" />
                  <Label htmlFor="time-sensitive">Time-Sensitive (Limited window)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Timeline</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ongoing" id="ongoing" />
                  <Label htmlFor="ongoing">Ongoing/Evergreen</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Brand & Messaging */}
        <Card>
          <CardHeader>
            <CardTitle>Brand & Messaging</CardTitle>
            <CardDescription>Define your campaign&apos;s messaging and positioning</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="uniqueValueProposition" className="mb-2 block">Unique Value Proposition</Label>
              <Textarea
                id="uniqueValueProposition"
                value={campaignFoundation.uniqueValueProposition}
                onChange={(e) => handleTextChange(e, 'uniqueValueProposition')}
                placeholder="What makes your offering unique and valuable?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="keyMessages" className="mb-2 block">Key Messages</Label>
              <Textarea
                id="keyMessages"
                value={campaignFoundation.keyMessages}
                onChange={(e) => handleTextChange(e, 'keyMessages')}
                placeholder="Main messages you want to communicate (one per line or comma-separated)"
                rows={4}
              />
            </div>

            <div>
              <Label className="mb-3 block">Brand Tone & Voice</Label>
              <RadioGroup value={campaignFoundation.brandTone} onValueChange={(value) => handleRadioChange(value, 'brandTone')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional & Authoritative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friendly" id="friendly" />
                  <Label htmlFor="friendly">Friendly & Conversational</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inspirational" id="inspirational" />
                  <Label htmlFor="inspirational">Inspirational & Motivational</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="playful" id="playful" />
                  <Label htmlFor="playful">Playful & Humorous</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="luxury" id="luxury" />
                  <Label htmlFor="luxury">Luxury & Sophisticated</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="educational" id="educational" />
                  <Label htmlFor="educational">Educational & Informative</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="competitiveAdvantages" className="mb-2 block">Competitive Advantages</Label>
              <Textarea
                id="competitiveAdvantages"
                value={campaignFoundation.competitiveAdvantages}
                onChange={(e) => handleTextChange(e, 'competitiveAdvantages')}
                placeholder="What advantages do you have over competitors?"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="competitorContext" className="mb-2 block">Competitor Context</Label>
              <Textarea
                id="competitorContext"
                value={campaignFoundation.competitorContext}
                onChange={(e) => handleTextChange(e, 'competitorContext')}
                placeholder="Who are your main competitors and how are they positioning themselves?"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
