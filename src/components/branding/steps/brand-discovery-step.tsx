'use client'

import { ChangeEvent, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { valueOptions, problemOptions } from "@/constants/branding_constants";
import useBrandingStore from "@/stores/use-branding-store";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TargetAudience, TargetAudienceType } from '@/types/branding/target-audience.interface';
import { Button } from '@/components/ui/button';

const TargerAudienceSection = () => {
  const [businessType, setBusinessType] = useState<TargetAudienceType|string>()
    const [targetAudience, setTargetAudience] = useState<TargetAudience>({
      targetAudienceType: TargetAudienceType.BUSINESS,
      companySize: "",
      industry: "",
      annualRevenue: "",
      decisionMakerRole: "",
      geographicMarket: "",
      ageRange: [0, 0],
      gender: "",
      income: "",
      education: "",
      location: ""
    })
    const {updateTargetAudience, brandDiscovery} = useBrandingStore()

  return (
    <>  
        {brandDiscovery.targetAudience.length && brandDiscovery.targetAudience.map((audience, i) => (
          <CardContent key={i}>
            <h1>Lorem ipsum dolor sit amet.</h1>
          </CardContent>
        ))}

        <CardContent className="space-y-4 border-2 mx-2 py-4 mb-3 rounded-lg">
            <div className="mb-5">
              <Label htmlFor="targetAudienceType" className="mb-4 block">Is your target audience an individual consumer or a business?</Label>
              <RadioGroup defaultValue={TargetAudienceType.BUSINESS} onValueChange={setBusinessType}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={TargetAudienceType.INDIVIDUAL_CONSUMER} />
                    <Label htmlFor=''>Individual Consumer (B2C)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={TargetAudienceType.BUSINESS} />
                    <Label htmlFor=''> Business (B2B)</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-2 block">Age Range</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm">{targetAudience.ageRange[0]}</span>
                <Slider 
                  defaultValue={targetAudience.ageRange} 
                  min={18} 
                  max={65} 
                  step={1} 
                  onValueChange={(value) => setTargetAudience({...targetAudience, ageRange:[value[0], value[1]]})}
                  className="flex-1"
                />
                {/* <span className="text-sm">{brandDiscovery.targetAudience[0].ageRange[1] ?? "hello"}</span> */}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender" className="mb-2 block">Gender Distribution</Label>
                <Select 
                  value={targetAudience.gender}
                  onValueChange={(value) => setTargetAudience({...targetAudience, gender: value})}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="predominantly-male">Predominantly Male</SelectItem>
                    <SelectItem value="predominantly-female">Predominantly Female</SelectItem>
                    <SelectItem value="equal-distribution">Equal Distribution</SelectItem>
                    <SelectItem value="non-binary-focus">Primarily Non-binary</SelectItem>
                    <SelectItem value="all-inclusive">All Inclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="income" className="mb-2 block">Income Level</Label>
                <Select 
                  value={targetAudience.income}
                  onValueChange={(value) => setTargetAudience({...targetAudience, income: value})}
                >
                  <SelectTrigger id="income">
                    <SelectValue placeholder="Select income level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget-conscious</SelectItem>
                    <SelectItem value="middle">Middle income</SelectItem>
                    <SelectItem value="upper-middle">Upper middle income</SelectItem>
                    <SelectItem value="affluent">Affluent</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education" className="mb-2 block">Education Level</Label>
                <Select 
                  value={targetAudience.education}
                  onValueChange={(value) => setTargetAudience({...targetAudience, education: value})}
                >
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="some-college">Some College</SelectItem>
                    <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
                    <SelectItem value="masters">Master&apos;s Degree</SelectItem>
                    <SelectItem value="phd">PhD or Doctorate</SelectItem>
                    <SelectItem value="mixed">Mixed Education Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location" className="mb-2 block">Geographic Location</Label>
                <Input 
                  id="location" 
                  placeholder="Urban, Rural, Global, Region names..."
                  value={targetAudience.location}
                  onChange={(e) => setTargetAudience({...targetAudience, location: e.target.value})}
                />
              </div>
            </div>
            {businessType != "" && businessType == TargetAudienceType.INDIVIDUAL_CONSUMER &&
             <div className="">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="">
                  <Label htmlFor="Company Size" className="mb-2 block">Company Size</Label>
                  <Select 
                    value={targetAudience.companySize}
                    onValueChange={(value) => setTargetAudience({...targetAudience, companySize: value})}
                  >
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Company Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start-up">Startup (1-10 employees)</SelectItem>
                      <SelectItem value="small-business">Small business (11-50 employees)</SelectItem>
                      <SelectItem value="mid-size">Mid-size company (51-500 employees)</SelectItem>
                      <SelectItem value="large-company">Large enterprise (500+ employees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Label htmlFor="Industry/Sector" className="mb-2 block">Industry/Sector</Label>
                  <Select 
                    value={targetAudience.industry}
                    onValueChange={(value) => setTargetAudience({...targetAudience,industry: value })}
                  >
                    <SelectTrigger id="Industry/Sector">
                      <SelectValue placeholder="Industry/Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Financial services">Financial services</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Professional services">Professional services</SelectItem>
                      <SelectItem value="Non-profit">Non-profit</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="Other (specify)">Other (specify)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="">
                  <Label htmlFor="Annual Revenue Range" className="mb-2 block">Annual Revenue Range</Label>
                  <Select 
                    value={targetAudience.annualRevenue}
                    onValueChange={(value) => setTargetAudience({...targetAudience, annualRevenue: value})}
                  >
                    <SelectTrigger id="AnnualRevenueRange">
                      <SelectValue placeholder="Annual Revenue Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Under R1M">Under R1M</SelectItem>
                      <SelectItem value="R1M - R10M">R1M - R10M</SelectItem>
                      <SelectItem value="R10M - R100M">R10M - R100M</SelectItem>
                      <SelectItem value="R100M - R1B">R100M - R1B</SelectItem>
                      <SelectItem value="R1B+">R1B+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="">
                  <Label htmlFor="Decision Maker Role/Level" className="mb-2 block">Decision Maker Role/Level</Label>
                  <Select 
                    value={targetAudience.decisionMakerRole}
                    onValueChange={(value) => setTargetAudience({...targetAudience, decisionMakerRole: value})}
                  >
                    <SelectTrigger id="DecisionMakerRole/Level">
                      <SelectValue placeholder="Decision Maker Role/Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C-Suite (CEO, CTO, CMO, etc.)">C-Suite (CEO, CTO, CMO, etc.)</SelectItem>
                      <SelectItem value="VP/Director level">VP/Director level</SelectItem>
                      <SelectItem value="Manager level">Manager level</SelectItem>
                      <SelectItem value="Individual contributor/specialist">Individual contributor/specialist</SelectItem>
                      <SelectItem value="Procurement/purchasing">Procurement/purchasing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <Label htmlFor="Geographic Market" className="mb-2 block">Geographic Market</Label>
                  <Select 
                    value={targetAudience.geographicMarket}
                    onValueChange={(value) => setTargetAudience({...targetAudience,geographicMarket: value})}
                  >
                    <SelectTrigger id="GeographicMarket">
                      <SelectValue placeholder="Geographic Market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Local/regional">Local/regional</SelectItem>
                      <SelectItem value="National">National</SelectItem>
                      <SelectItem value="International">International</SelectItem>
                      <SelectItem value="Global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className=""></div>
              </div>
             </div>
            }

          </CardContent>
          <div className="pl-6 flex items-center gap-4">
            <Button onClick={() => updateTargetAudience(targetAudience)}>Save</Button>
            <Button>Add</Button>
          </div>
      </>
  )
}

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

        {/* Question 1 - Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Who is your primary target audience?</CardTitle>
            <CardDescription>Define the demographics of your ideal customers.</CardDescription>
          </CardHeader>
          <TargerAudienceSection />

          {/* <div className="pl-6 flex items-center gap-4">
            <Button>Save</Button>
            <Button>Add</Button>
          </div> */}
        </Card>
        {/* End Question 1 */}
        
        {/* Question 2 - Industry */}
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
        {/* End Question 2 */}
        
        {/* Question 3 - Values */}
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
        {/* End Question 3 */}
        
        {/* Question 4 - Competitors and Differentiation */}
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
        {/* End Question 4 */}
        
        {/* Question 5 - Brand Personality */}
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
        {/* End Question 5 */}
        
        {/* Question 6 - Problems Solved */}
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
        {/* End Question 6 */}
        
        {/* Question 7 - Business Goals */}
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
        {/* End Question 7 */}
        
        {/* Question 8 - Visual Elements */}
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
        {/* End Question 8 */}
      </div>
    </>
  );
}
