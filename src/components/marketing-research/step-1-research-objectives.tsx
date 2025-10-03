'use client'

import { useEffect, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useMarketingResearchStore from "@/stores/use-marketing-research-store";

export default function Step1ResearchObjectives() {
  const { researchObjectives, updateResearchObjectives, toggleArrayValue } = useMarketingResearchStore();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Create helper functions with proper typing
  const handleTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string): void => {
    updateResearchObjectives(field, e.target.value);
  };
  
  const handleSelectChange = (value: string, field: string): void => {
    updateResearchObjectives(field, value);
  };

  const handleCheckboxChange = (checked: boolean, field: string, value: string): void => {
    if (checked) {
      toggleArrayValue(field, value);
    } else {
      toggleArrayValue(field, value);
    }
  };
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Research Objectives & Scope Definition</h1>
        <p className="mt-1 text-gray-600">Define your research goals, objectives, and scope for this marketing research project.</p>
      </div>
      
      <div className="space-y-8">
        {/* Business Context */}
        <Card>
          <CardHeader>
            <CardTitle>Business Context</CardTitle>
            <CardDescription>Tell us about the business this research is for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName" className="mb-2 block">What is the name of the business/organization this research is for?</Label>
              <Input 
                id="businessName"
                value={researchObjectives.businessName}
                onChange={(e) => handleTextChange(e, 'businessName')}
                placeholder="Enter business name"
              />
            </div>
            
            <div>
              <Label htmlFor="industry" className="mb-2 block">What industry or sector does this business operate in?</Label>
              <Select value={researchObjectives.industry} onValueChange={(value) => handleSelectChange(value, 'industry')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="media">Media & Entertainment</SelectItem>
                  <SelectItem value="non-profit">Non-profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-3 block">What is the approximate size of this business?</Label>
              <RadioGroup value={researchObjectives.businessSize} onValueChange={(value) => handleSelectChange(value, 'businessSize')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo">Solo entrepreneur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small (2-50 employees)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium (51-250 employees)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large (251+ employees)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="enterprise" />
                  <Label htmlFor="enterprise">Enterprise (1000+ employees)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">How would you describe the business&apos;s current stage?</Label>
              <RadioGroup value={researchObjectives.businessStage} onValueChange={(value) => handleSelectChange(value, 'businessStage')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup">Startup/Launch phase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="growth" id="growth" />
                  <Label htmlFor="growth">Growth phase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="established" id="established" />
                  <Label htmlFor="established">Established/Mature</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expansion" id="expansion" />
                  <Label htmlFor="expansion">Expansion phase</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transformation" id="transformation" />
                  <Label htmlFor="transformation">Transformation/Pivot</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="productsServices" className="mb-2 block">What are the main products or services this business offers?</Label>
              <Textarea 
                id="productsServices"
                value={researchObjectives.productsServices}
                onChange={(e) => handleTextChange(e, 'productsServices')}
                placeholder="Describe the main products or services..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Research Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Research Goals</CardTitle>
            <CardDescription>What do you hope to achieve with this research?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">What is the primary goal of this research project?</Label>
              <RadioGroup value={researchObjectives.primaryGoal} onValueChange={(value) => handleSelectChange(value, 'primaryGoal')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="brand-awareness" id="brand-awareness" />
                  <Label htmlFor="brand-awareness">Brand awareness study</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer-satisfaction" id="customer-satisfaction" />
                  <Label htmlFor="customer-satisfaction">Customer satisfaction research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="market-sizing" id="market-sizing" />
                  <Label htmlFor="market-sizing">Market sizing analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="product-feedback" id="product-feedback" />
                  <Label htmlFor="product-feedback">Product/service feedback</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="competitor-analysis" id="competitor-analysis" />
                  <Label htmlFor="competitor-analysis">Competitor analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consumer-behavior" id="consumer-behavior" />
                  <Label htmlFor="consumer-behavior">Consumer behavior study</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="market-entry" id="market-entry" />
                  <Label htmlFor="market-entry">Market entry research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pricing" id="pricing" />
                  <Label htmlFor="pricing">Pricing research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employee-engagement" id="employee-engagement" />
                  <Label htmlFor="employee-engagement">Employee engagement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other-goal" id="other-goal" />
                  <Label htmlFor="other-goal">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="businessDecisions" className="mb-2 block">What specific business decision(s) will this research help inform?</Label>
              <Textarea 
                id="businessDecisions"
                value={researchObjectives.businessDecisions}
                onChange={(e) => handleTextChange(e, 'businessDecisions')}
                placeholder="e.g., Whether to launch a new product line or How to improve customer retention"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="oneThingToLearn" className="mb-2 block">If you could only learn ONE thing from this research, what would it be?</Label>
              <Input 
                id="oneThingToLearn"
                value={researchObjectives.oneThingToLearn}
                onChange={(e) => handleTextChange(e, 'oneThingToLearn')}
                placeholder="The single most important insight you need"
              />
            </div>

            <div>
              <Label htmlFor="successMeasurement" className="mb-2 block">How will success be measured for this research project?</Label>
              <Textarea 
                id="successMeasurement"
                value={researchObjectives.successMeasurement}
                onChange={(e) => handleTextChange(e, 'successMeasurement')}
                placeholder="What outcomes or metrics matter most"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="requestorExpectations" className="mb-2 block">Who requested or commissioned this research, and what are their expectations?</Label>
              <Textarea 
                id="requestorExpectations"
                value={researchObjectives.requestorExpectations}
                onChange={(e) => handleTextChange(e, 'requestorExpectations')}
                placeholder="Describe the requestor and their expectations"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Focus Areas & Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Focus Areas & Issues</CardTitle>
            <CardDescription>What challenges and opportunities should this research address?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentChallenges" className="mb-2 block">What specific challenges or problems is the business currently facing?</Label>
              <Textarea 
                id="currentChallenges"
                value={researchObjectives.currentChallenges}
                onChange={(e) => handleTextChange(e, 'currentChallenges')}
                placeholder="Describe current challenges"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="opportunitiesToValidate" className="mb-2 block">What opportunities do you suspect exist but need validation?</Label>
              <Textarea 
                id="opportunitiesToValidate"
                value={researchObjectives.opportunitiesToValidate}
                onChange={(e) => handleTextChange(e, 'opportunitiesToValidate')}
                placeholder="Describe opportunities to validate"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="assumptionsToTest" className="mb-2 block">Are there any assumptions about customers/market that need to be tested?</Label>
              <Textarea 
                id="assumptionsToTest"
                value={researchObjectives.assumptionsToTest}
                onChange={(e) => handleTextChange(e, 'assumptionsToTest')}
                placeholder="Describe assumptions to test"
                rows={3}
              />
            </div>

            <div>
              <Label className="mb-3 block">What areas of the business do you have the least clarity on right now?</Label>
              <div className="space-y-2">
                {[
                  { id: 'customer-needs', label: 'Customer needs' },
                  { id: 'market-positioning', label: 'Market positioning' },
                  { id: 'competitive-landscape', label: 'Competitive landscape' },
                  { id: 'pricing-strategy', label: 'Pricing strategy' },
                  { id: 'product-gaps', label: 'Product/service gaps' },
                  { id: 'brand-perception', label: 'Brand perception' },
                  { id: 'customer-journey', label: 'Customer journey' },
                  { id: 'employee-satisfaction', label: 'Employee satisfaction' }
                ].map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={area.id}
                      checked={researchObjectives.leastClarityAreas.includes(area.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(!!checked, 'leastClarityAreas', area.id)}
                    />
                    <Label htmlFor={area.id}>{area.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="withoutResearchConsequences" className="mb-2 block">What would happen if you had to make decisions without this research?</Label>
              <Textarea 
                id="withoutResearchConsequences"
                value={researchObjectives.withoutResearchConsequences}
                onChange={(e) => handleTextChange(e, 'withoutResearchConsequences')}
                placeholder="Helps establish urgency and importance"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Discovery Targets */}
        <Card>
          <CardHeader>
            <CardTitle>Discovery Targets</CardTitle>
            <CardDescription>What specific insights are you looking to uncover?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="customerUnderstanding" className="mb-2 block">What do you need to understand about your customers that you don&apos;t know today?</Label>
              <Textarea 
                id="customerUnderstanding"
                value={researchObjectives.customerUnderstanding}
                onChange={(e) => handleTextChange(e, 'customerUnderstanding')}
                placeholder="Describe customer insights needed"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="marketInsights" className="mb-2 block">What insights about your market or industry would be most valuable?</Label>
              <Textarea 
                id="marketInsights"
                value={researchObjectives.marketInsights}
                onChange={(e) => handleTextChange(e, 'marketInsights')}
                placeholder="Describe valuable market insights"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="competitorStrategies" className="mb-2 block">Are there specific competitor activities or strategies you need to understand?</Label>
              <Textarea 
                id="competitorStrategies"
                value={researchObjectives.competitorStrategies}
                onChange={(e) => handleTextChange(e, 'competitorStrategies')}
                placeholder="Describe competitor insights needed"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="internalFactors" className="mb-2 block">What internal factors (processes, culture, capabilities) need investigation?</Label>
              <Textarea 
                id="internalFactors"
                value={researchObjectives.internalFactors}
                onChange={(e) => handleTextChange(e, 'internalFactors')}
                placeholder="Describe internal factors to investigate"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="uncertainTrends" className="mb-2 block">What trends or changes in your space are you uncertain about?</Label>
              <Textarea 
                id="uncertainTrends"
                value={researchObjectives.uncertainTrends}
                onChange={(e) => handleTextChange(e, 'uncertainTrends')}
                placeholder="Describe uncertain trends"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Target Audiences */}
        <Card>
          <CardHeader>
            <CardTitle>Target Audiences</CardTitle>
            <CardDescription>Who should participate in this research?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">Who are the primary people you need to research?</Label>
              <div className="space-y-2">
                {[
                  { id: 'current-customers', label: 'Current customers' },
                  { id: 'potential-customers', label: 'Potential customers' },
                  { id: 'lost-customers', label: 'Lost customers' },
                  { id: 'employees', label: 'Employees' },
                  { id: 'industry-experts', label: 'Industry experts' },
                  { id: 'competitors', label: 'Competitors' },
                  { id: 'partners-suppliers', label: 'Partners/suppliers' },
                  { id: 'general-public', label: 'General public' }
                ].map((target) => (
                  <div key={target.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={target.id}
                      checked={researchObjectives.primaryResearchTargets.includes(target.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(!!checked, 'primaryResearchTargets', target.id)}
                    />
                    <Label htmlFor={target.id}>{target.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="demographicCharacteristics" className="mb-2 block">What are the key demographic characteristics of your target research participants?</Label>
              <Textarea 
                id="demographicCharacteristics"
                value={researchObjectives.demographicCharacteristics}
                onChange={(e) => handleTextChange(e, 'demographicCharacteristics')}
                placeholder="Age ranges, gender, income levels, education, location, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="behavioralCharacteristics" className="mb-2 block">What behavioral characteristics or experiences should participants have?</Label>
              <Textarea 
                id="behavioralCharacteristics"
                value={researchObjectives.behavioralCharacteristics}
                onChange={(e) => handleTextChange(e, 'behavioralCharacteristics')}
                placeholder="Purchase history, usage patterns, decision-making roles, etc."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="excludedGroups" className="mb-2 block">Are there specific groups you want to exclude from this research?</Label>
              <Textarea 
                id="excludedGroups"
                value={researchObjectives.excludedGroups}
                onChange={(e) => handleTextChange(e, 'excludedGroups')}
                placeholder="Describe groups to exclude"
                rows={2}
              />
            </div>

            <div>
              <Label className="mb-3 block">Do you have existing contact lists or databases for potential participants?</Label>
              <RadioGroup value={researchObjectives.existingContactLists} onValueChange={(value) => handleSelectChange(value, 'existingContactLists')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer-lists" id="customer-lists" />
                  <Label htmlFor="customer-lists">Yes, we have customer lists</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employee-lists" id="employee-lists" />
                  <Label htmlFor="employee-lists">Yes, we have employee lists</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prospect-lists" id="prospect-lists" />
                  <Label htmlFor="prospect-lists">Yes, we have prospect lists</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="need-help" id="need-help" />
                  <Label htmlFor="need-help">No, we&apos;ll need help with recruitment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other-lists" id="other-lists" />
                  <Label htmlFor="other-lists">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Scope Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>Scope Parameters</CardTitle>
            <CardDescription>Define the boundaries and constraints for this research</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-3 block">What geographic markets should this research cover?</Label>
              <RadioGroup value={researchObjectives.geographicMarkets} onValueChange={(value) => handleSelectChange(value, 'geographicMarkets')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="local" id="local" />
                  <Label htmlFor="local">Local/City</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="regional" id="regional" />
                  <Label htmlFor="regional">Regional/State</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="national" id="national" />
                  <Label htmlFor="national">National</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="international" id="international" />
                  <Label htmlFor="international">International</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="completionDeadline" className="mb-2 block">When do you need the research results completed by?</Label>
              <Input 
                id="completionDeadline"
                type="date"
                value={researchObjectives.completionDeadline}
                onChange={(e) => handleTextChange(e, 'completionDeadline')}
              />
            </div>

            <div>
              <Label className="mb-3 block">What&apos;s your approximate budget range for data collection activities?</Label>
              <RadioGroup value={researchObjectives.budgetRange} onValueChange={(value) => handleSelectChange(value, 'budgetRange')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="under-1k" id="under-1k" />
                  <Label htmlFor="under-1k">Under $1,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1k-5k" id="1k-5k" />
                  <Label htmlFor="1k-5k">$1,000 - $5,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5k-15k" id="5k-15k" />
                  <Label htmlFor="5k-15k">$5,000 - $15,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="15k-50k" id="15k-50k" />
                  <Label htmlFor="15k-50k">$15,000 - $50,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="over-50k" id="over-50k" />
                  <Label htmlFor="over-50k">Over $50,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="need-recommendations" id="need-recommendations" />
                  <Label htmlFor="need-recommendations">Need recommendations</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="mb-3 block">Who will be the primary audience for the research results?</Label>
              <RadioGroup value={researchObjectives.resultsAudience} onValueChange={(value) => handleSelectChange(value, 'resultsAudience')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="internal-team" id="internal-team" />
                  <Label htmlFor="internal-team">Internal team</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="senior-management" id="senior-management" />
                  <Label htmlFor="senior-management">Senior management</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="board-directors" id="board-directors" />
                  <Label htmlFor="board-directors">Board of directors</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clients" id="clients" />
                  <Label htmlFor="clients">Clients</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="external-stakeholders" id="external-stakeholders" />
                  <Label htmlFor="external-stakeholders">External stakeholders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="topicsToAvoid" className="mb-2 block">Are there any topics, questions, or approaches that should be avoided in this research?</Label>
              <Textarea 
                id="topicsToAvoid"
                value={researchObjectives.topicsToAvoid}
                onChange={(e) => handleTextChange(e, 'topicsToAvoid')}
                placeholder="Sensitive topics, competitive concerns, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}