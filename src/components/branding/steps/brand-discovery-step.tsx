'use client'

import { ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { valueOptions, problemOptions } from "@/constants/branding_constants";
import useBrandingStore from "@/stores/use-branding-store";
import TargerAudienceForm from './brand-discovery-step-components/target-audience-form';


export default function BrandDiscoveryStep() {
  const { brandDiscovery, updateBrandDiscovery, toggleValue, toggleProblem } = useBrandingStore();

  // Create helper functions with proper typing
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string): void => {
    updateBrandDiscovery(field, e.target.value);
  };
  
  const handleSliderChange = (value: number[], field: string): void => {
    updateBrandDiscovery(field, value[0]);
  };
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Brand Discovery</h1>
        <p className="mt-1 text-gray-600">Help us understand your brand by answering these strategic questions.</p>
      </div>
      
      <div className="space-y-8">
        {/* Question 1 - Business Details */}
        <Card>
          <CardHeader>
            <CardTitle>Describe your business</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <Label htmlFor="businessName" className="mb-2 block">What is the name of your business/brand?</Label>
              <Input 
              value={brandDiscovery.businessName}
              onChange={(e) => handleTextChange(e, 'businessName')}
            />
            </div>
            <div>
              <Label htmlFor="businessDescription" className="mb-2 block">Describe what your business does in 1-3 sentences</Label>
              <Textarea 
                id="businessDescription" 
                value={brandDiscovery.businessDescription}
                onChange={(e) => handleTextChange(e, 'businessDescription')}
              />
            </div>
          </CardContent>
        </Card>
        {/* End Question 1 */}


        {/* Question 2 - Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Who is your primary target audience?</CardTitle>
            <CardDescription>Define the demographics of your ideal customers.</CardDescription>
          </CardHeader>
          <TargerAudienceForm />
        </Card>
        {/* End Question 2 */}
        
        {/* Question 3 - Industry */}
        <Card>
          <CardHeader>
            <CardTitle>How would you describe your brand&apos;s industry or sector?</CardTitle>
            <CardDescription>This helps position your brand in the right context.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input 
              placeholder="E.g., Technology, Healthcare, Education, Retail..."
              value={brandDiscovery.industry}
              onChange={(e) => handleTextChange(e, 'industry')}
            />
          </CardContent>
        </Card>
        {/* End Question 3 */}
        
        {/* Question 4 - Values */}
        <Card>
          <CardHeader>
            <CardTitle>What are the top 3 values your brand stands for?</CardTitle>
            <CardDescription>Select up to 3 values that best represent your brand&apos;s core beliefs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {valueOptions.map((value) => (
                <div key={value.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`value-${value.id}`} 
                    checked={brandDiscovery.values.includes(value.id)}
                    onCheckedChange={() => toggleValue(value.id)}
                    disabled={brandDiscovery.values.length >= 3 && !brandDiscovery.values.includes(value.id)}
                  />
                  <Label 
                    htmlFor={`value-${value.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {value.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* End Question 4 */}
        
        {/* Question 5 - Competitors and Differentiation */}
        <Card>
          <CardHeader>
            <CardTitle>Who are your main competitors, and how would you like to differentiate from them?</CardTitle>
            <CardDescription>Understanding your competition helps define your unique position.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="competitors" className="mb-2 block">Main Competitors</Label>
              <Textarea 
                id="competitors" 
                placeholder="List your primary competitors..."
                value={brandDiscovery.competitors}
                onChange={(e) => handleTextChange(e, 'competitors')}
              />
            </div>
            <div>
              <Label htmlFor="differentiation" className="mb-2 block">Your Key Differentiation</Label>
              <Textarea 
                id="differentiation" 
                placeholder="What makes your brand different from competitors?"
                value={brandDiscovery.differentiation}
                onChange={(e) => handleTextChange(e, 'differentiation')}
              />
            </div>
          </CardContent>
        </Card>
        {/* End Question 5 */}
        
        {/* Question 6 - Brand Personality */}
        <Card>
          <CardHeader>
            <CardTitle>If your brand were a person, how would you describe their personality?</CardTitle>
            <CardDescription>Use the sliders to define your brand&apos;s personality traits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Formal</Label>
                <Label className="text-sm">Casual</Label>
              </div>
              <Slider 
                defaultValue={[brandDiscovery.personality.formalCasual]} 
                max={100} 
                step={1} 
                onValueChange={(value) => handleSliderChange(value, 'personality.formalCasual')}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Traditional</Label>
                <Label className="text-sm">Modern</Label>
              </div>
              <Slider 
                defaultValue={[brandDiscovery.personality.traditionalModern]} 
                max={100} 
                step={1} 
                onValueChange={(value) => handleSliderChange(value, 'personality.traditionalModern')}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm">Serious</Label>
                <Label className="text-sm">Playful</Label>
              </div>
              <Slider 
                defaultValue={[brandDiscovery.personality.seriousPlayful]} 
                max={100} 
                step={1} 
                onValueChange={(value) => handleSliderChange(value, 'personality.seriousPlayful')}
              />
            </div>
          </CardContent>
        </Card>
        {/* End Question 6 */}
        
        {/* Question 7 - Problems Solved */}
        <Card>
          <CardHeader>
            <CardTitle>What problems does your brand solve for customers?</CardTitle>
            <CardDescription>Select all that apply to your brand&apos;s offerings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {problemOptions.map((problem) => (
                <div key={problem.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`problem-${problem.id}`} 
                    checked={brandDiscovery.problemsSolved.includes(problem.id)}
                    onCheckedChange={() => toggleProblem(problem.id)}
                  />
                  <Label 
                    htmlFor={`problem-${problem.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {problem.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* End Question 7 */}
        
        {/* Question 8 - Business Goals */}
        <Card>
          <CardHeader>
            <CardTitle>What are your short-term and long-term business goals?</CardTitle>
            <CardDescription>Define your objectives to align your branding strategy.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shortTermGoals" className="mb-2 block">Short-term Goals (1 year)</Label>
              <Textarea 
                id="shortTermGoals" 
                placeholder="What do you want to achieve in the next year?"
                value={brandDiscovery.shortTermGoals}
                onChange={(e) => handleTextChange(e, 'shortTermGoals')}
              />
            </div>
            <div>
              <Label htmlFor="longTermGoals" className="mb-2 block">Long-term Goals (5 years)</Label>
              <Textarea 
                id="longTermGoals" 
                placeholder="Where do you see your brand in 5 years?"
                value={brandDiscovery.longTermGoals}
                onChange={(e) => handleTextChange(e, 'longTermGoals')}
              />
            </div>
          </CardContent>
        </Card>
        {/* End Question 8 */}
        
        {/* Question 9 - Visual Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Are there any specific visual elements or themes you&apos;d like to include or avoid?</CardTitle>
            <CardDescription>Share your preferences to guide the visual direction.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="visualPreferences" className="mb-2 block">Visual Elements to Include</Label>
              <Textarea 
                id="visualPreferences" 
                placeholder="E.g., nature imagery, geometric shapes, minimalist style..."
                value={brandDiscovery.visualPreferences}
                onChange={(e) => handleTextChange(e, 'visualPreferences')}
              />
            </div>
            <div>
              <Label htmlFor="visualAversions" className="mb-2 block">Visual Elements to Avoid</Label>
              <Textarea 
                id="visualAversions" 
                placeholder="E.g., cliché stock photos, specific colors, outdated styles..."
                value={brandDiscovery.visualAversions}
                onChange={(e) => handleTextChange(e, 'visualAversions')}
              />
            </div>
          </CardContent>
        </Card>
        {/* End Question 9 */}
      </div>
    </>
  );
}
