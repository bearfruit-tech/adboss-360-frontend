'use client'

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { MenuItem } from "@/types/menu-items.enum"
import { Header } from "@/components/header"
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BrandingPage() {
    const [activeStep, setActiveStep] = useState(0); // Start with Brand Discovery step
    
    const steps = [
        { id: 0, title: "Brand Discovery", completed: false },
        { id: 1, title: "Visual Inspiration", completed: false },
        { id: 2, title: "Logo Exploration", completed: false },
        { id: 3, title: "Color Harmony", completed: false },
        { id: 4, title: "Typography Selection", completed: false },
        { id: 5, title: "Imagery Direction", completed: false },
        { id: 6, title: "Brand Voice", completed: false },
        { id: 7, title: "Brand Identity Suite", completed: false }
    ];
    
    // Brand Discovery form state
    const [brandDiscovery, setBrandDiscovery] = useState({
        targetAudience: {
            ageRange: [25, 40],
            gender: "",
            income: "",
            education: "",
            location: ""
        },
        industry: "",
        values: [],
        competitors: "",
        differentiation: "",
        personality: {
            formalCasual: 50,
            traditionalModern: 50, 
            seriousPlayful: 50
        },
        problemsSolved: [],
        shortTermGoals: "",
        longTermGoals: "",
        visualPreferences: "",
        visualAversions: ""
    });
    
    // Handle form changes
    const handleBrandDiscoveryChange = (field, value) => {
        setBrandDiscovery(prev => {
            const newState = {...prev};
            
            // Handle nested objects
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                newState[parent] = {...newState[parent], [child]: value};
            } else {
                newState[field] = value;
            }
            
            return newState;
        });
    };
    
    // Values options for multi-select
    const valueOptions = [
        { id: "innovation", label: "Innovation" },
        { id: "reliability", label: "Reliability" },
        { id: "sustainability", label: "Sustainability" },
        { id: "luxury", label: "Luxury" },
        { id: "inclusivity", label: "Inclusivity" },
        { id: "transparency", label: "Transparency" },
        { id: "authenticity", label: "Authenticity" },
        { id: "affordability", label: "Affordability" }
    ];
    
    // Problems solved options for multi-select
    const problemOptions = [
        { id: "time", label: "Saves time" },
        { id: "money", label: "Saves money" },
        { id: "convenience", label: "Adds convenience" },
        { id: "quality", label: "Improves quality" },
        { id: "status", label: "Enhances status" },
        { id: "wellbeing", label: "Improves wellbeing" },
        { id: "connection", label: "Creates connection" },
        { id: "security", label: "Provides security" }
    ];
    
    // Toggle value selection
    const toggleValue = (valueId) => {
        setBrandDiscovery(prev => {
            if (prev.values.includes(valueId)) {
                return {...prev, values: prev.values.filter(v => v !== valueId)};
            } else {
                return {...prev, values: [...prev.values, valueId]};
            }
        });
    };
    
    // Toggle problem selection
    const toggleProblem = (problemId) => {
        setBrandDiscovery(prev => {
            if (prev.problemsSolved.includes(problemId)) {
                return {...prev, problemsSolved: prev.problemsSolved.filter(p => p !== problemId)};
            } else {
                return {...prev, problemsSolved: [...prev.problemsSolved, problemId]};
            }
        });
    };
    
    // Visual Inspiration Assets
    const moodboardImages = [
        "https://cdn.dribbble.com/userupload/43332145/file/original-f566cd2684f36140a8249ff1338713ed.jpg?resize=2048x2560&vertical=center",
        "https://cdn.dribbble.com/userupload/12833049/file/original-1b43e62a919f033d40b5bf8023e93b07.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/12890548/file/original-b49611648d3d56a5a5819b8fd1bc1471.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/18731157/file/original-43c2292bce30cb4e23deb3c114bc66b4.jpg?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/16066915/file/original-96e4eefbf976715b58134792a7031388.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/18663450/file/original-29ad963dde584f6d388595f4c15a1d0f.jpg?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/18818220/file/original-438341254eddac2a642ea1edc9eb2f4f.jpg?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/13005320/file/original-99220db074b8cc13fdc01d5b0a83d22d.png?resize=1504x1128&vertical=center",
        "https://cdn.dribbble.com/userupload/19431430/file/original-2208f56489a70eb24270973fff4ec2e7.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/17294624/file/original-987bf978f4fcf3c991f0d9c7ba65995e.png?resize=2048x1536&vertical=center",
        "https://cdn.dribbble.com/userupload/37424649/file/original-f2800ca7e8e1996290cf5c5b4caa1b54.png?resize=1504x1128&vertical=center",
        "https://cdn.dribbble.com/userupload/12008372/file/original-6d1528f1d690ce5ca350a9c69a288ec2.jpg?resize=2048x1536&vertical=center",
    ];
    
    const [selectedImages, setSelectedImages] = useState([1, 4, 7]);
    
    const toggleImageSelection = (index) => {
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter(i => i !== index));
        } else {
            setSelectedImages([...selectedImages, index]);
        }
    };
    
    return (
        <div className="flex bg-background font-lexend">
            <DashboardSidebar activeMenuItem={MenuItem.BrandManagement} />
            <div className="flex flex-col w-full">
                <Header />
                <main className="p-6">
                    <h1 className="text-3xl font-normal">Brand Management</h1>
                    
                    <section className="mt-8">
                        <div className="flex flex-col min-h-screen bg-gray-50">
                            {/* Stepper */}
                            <div className="bg-white border-b border-gray-200 py-4 px-6">
                                <div className="max-w-5xl mx-auto">
                                    <div className="flex items-center justify-between">
                                        {steps.map((step) => (
                                            <div key={step.id} className="flex flex-col items-center">
                                                <div className="relative">
                                                    <div 
                                                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium 
                                                        ${step.id < activeStep ? 'bg-primary text-white' : 
                                                          step.id === activeStep ? 'bg-primary text-white' : 
                                                          'bg-gray-200 text-gray-500'}`}
                                                    >
                                                        {step.id < activeStep ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            step.id + 1
                                                        )}
                                                    </div>
                                                    {step.id < steps.length - 1 && (
                                                        <div 
                                                            className={`absolute top-1/2 left-full h-0.5 w-8 -translate-y-1/2 transform 
                                                            ${step.id < activeStep ? 'bg-primary' : 'bg-gray-200'}`}
                                                            style={{ width: '140%' }}
                                                        />
                                                    )}
                                                </div>
                                                <div className={`mt-2 text-xs font-medium ${step.id === activeStep ? 'text-primary' : 'text-gray-500'}`}>
                                                    {step.title}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* End Stepper */}
                            
                            {/* Main Content */}
                            <div className="flex-grow flex">
                                <div className="flex-grow py-8 px-6">
                                    <div className="max-w-4xl mx-auto">
                                        {activeStep === 0 ? (
                                            /* Brand Discovery Content */
                                            <>
                                                <div className="mb-6">
                                                    <h1 className="text-2xl font-bold text-gray-900">Brand Discovery</h1>
                                                    <p className="mt-1 text-gray-600">Help us understand your brand by answering these strategic questions.</p>
                                                </div>
                                                
                                                <div className="space-y-8">
                                                    {/* Question 1 - Target Audience */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Who is your primary target audience?</CardTitle>
                                                            <CardDescription>Define the demographics of your ideal customers.</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                            <div>
                                                                <Label className="mb-2 block">Age Range</Label>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-sm">{brandDiscovery.targetAudience.ageRange[0]}</span>
                                                                    <Slider 
                                                                        defaultValue={brandDiscovery.targetAudience.ageRange} 
                                                                        min={18} 
                                                                        max={65} 
                                                                        step={1} 
                                                                        onValueChange={(value) => handleBrandDiscoveryChange('targetAudience.ageRange', value)}
                                                                        className="flex-1"
                                                                    />
                                                                    <span className="text-sm">{brandDiscovery.targetAudience.ageRange[1]}</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor="gender" className="mb-2 block">Gender Distribution</Label>
                                                                    <Select 
                                                                        value={brandDiscovery.targetAudience.gender}
                                                                        onValueChange={(value) => handleBrandDiscoveryChange('targetAudience.gender', value)}
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
                                                                        value={brandDiscovery.targetAudience.income}
                                                                        onValueChange={(value) => handleBrandDiscoveryChange('targetAudience.income', value)}
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
                                                                        value={brandDiscovery.targetAudience.education}
                                                                        onValueChange={(value) => handleBrandDiscoveryChange('targetAudience.education', value)}
                                                                    >
                                                                        <SelectTrigger id="education">
                                                                            <SelectValue placeholder="Select education level" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="high-school">High School</SelectItem>
                                                                            <SelectItem value="some-college">Some College</SelectItem>
                                                                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                                                            <SelectItem value="masters">Master's Degree</SelectItem>
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
                                                                        value={brandDiscovery.targetAudience.location}
                                                                        onChange={(e) => handleBrandDiscoveryChange('targetAudience.location', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 1 */}
                                                    
                                                    {/* Question 2 - Industry */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>How would you describe your brand's industry or sector?</CardTitle>
                                                            <CardDescription>This helps position your brand in the right context.</CardDescription>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <Input 
                                                                placeholder="E.g., Technology, Healthcare, Education, Retail..."
                                                                value={brandDiscovery.industry}
                                                                onChange={(e) => handleBrandDiscoveryChange('industry', e.target.value)}
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 2 */}
                                                    
                                                    {/* Question 3 - Values */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>What are the top 3 values your brand stands for?</CardTitle>
                                                            <CardDescription>Select up to 3 values that best represent your brand's core beliefs.</CardDescription>
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
                                                                    onChange={(e) => handleBrandDiscoveryChange('competitors', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="differentiation" className="mb-2 block">Your Key Differentiation</Label>
                                                                <Textarea 
                                                                    id="differentiation" 
                                                                    placeholder="What makes your brand different from competitors?"
                                                                    value={brandDiscovery.differentiation}
                                                                    onChange={(e) => handleBrandDiscoveryChange('differentiation', e.target.value)}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 4 */}
                                                    
                                                    {/* Question 5 - Brand Personality */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>If your brand were a person, how would you describe their personality?</CardTitle>
                                                            <CardDescription>Use the sliders to define your brand's personality traits.</CardDescription>
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
                                                                    onValueChange={(value) => handleBrandDiscoveryChange('personality.formalCasual', value[0])}
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
                                                                    onValueChange={(value) => handleBrandDiscoveryChange('personality.traditionalModern', value[0])}
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
                                                                    onValueChange={(value) => handleBrandDiscoveryChange('personality.seriousPlayful', value[0])}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 5 */}
                                                    
                                                    {/* Question 6 - Problems Solved */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>What problems does your brand solve for customers?</CardTitle>
                                                            <CardDescription>Select all that apply to your brand's offerings.</CardDescription>
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
                                                                    onChange={(e) => handleBrandDiscoveryChange('shortTermGoals', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="longTermGoals" className="mb-2 block">Long-term Goals (5 years)</Label>
                                                                <Textarea 
                                                                    id="longTermGoals" 
                                                                    placeholder="Where do you see your brand in 5 years?"
                                                                    value={brandDiscovery.longTermGoals}
                                                                    onChange={(e) => handleBrandDiscoveryChange('longTermGoals', e.target.value)}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 7 */}
                                                    
                                                    {/* Question 8 - Visual Elements */}
                                                    <Card>
                                                        <CardHeader>
                                                            <CardTitle>Are there any specific visual elements or themes you'd like to include or avoid?</CardTitle>
                                                            <CardDescription>Share your preferences to guide the visual direction.</CardDescription>
                                                        </CardHeader>
                                                        <CardContent className="space-y-4">
                                                            <div>
                                                                <Label htmlFor="visualPreferences" className="mb-2 block">Visual Elements to Include</Label>
                                                                <Textarea 
                                                                    id="visualPreferences" 
                                                                    placeholder="E.g., nature imagery, geometric shapes, minimalist style..."
                                                                    value={brandDiscovery.visualPreferences}
                                                                    onChange={(e) => handleBrandDiscoveryChange('visualPreferences', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label htmlFor="visualAversions" className="mb-2 block">Visual Elements to Avoid</Label>
                                                                <Textarea 
                                                                    id="visualAversions" 
                                                                    placeholder="E.g., cliché stock photos, specific colors, outdated styles..."
                                                                    value={brandDiscovery.visualAversions}
                                                                    onChange={(e) => handleBrandDiscoveryChange('visualAversions', e.target.value)}
                                                                />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {/* End Question 8 */}
                                                </div>
                                            </>
                                        ) : (
                                            /* Visual Inspiration Content */
                                            <>
                                                <div className="mb-6">
                                                    <h1 className="text-2xl font-bold text-gray-900">Visual Inspiration</h1>
                                                    <p className="mt-1 text-gray-600">Select images that align with your brand's visual style and feeling.</p>
                                                </div>
                                                
                                                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                                    <div className="mb-4">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-lg font-medium text-gray-900">Mood Board</h2>
                                                            <div className="text-sm text-gray-500">{selectedImages.length} selected</div>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">Choose 3-5 images that best represent your brand's visual direction.</p>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                                                        {moodboardImages.map((img, index) => (
                                                            <div 
                                                                key={index} 
                                                                className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                                                                    selectedImages.includes(index) ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'
                                                                }`}
                                                                onClick={() => toggleImageSelection(index)}
                                                            >
                                                                <img src={img} alt={`Mood board image ${index+1}`} className="w-full h-full object-cover" />
                                                                {selectedImages.includes(index) && (
                                                                    <div className="absolute top-2 right-2 h-6 w-6 bg-primary rounded-full flex items-center justify-center text-white">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="mt-6 text-sm text-gray-600">
                                                        <p>These selections will influence your brand's visual style, color palette, and overall aesthetic direction.</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        
                                        {/* Navigation Buttons */}
                                        <div className="mt-8 flex justify-between">
                                            <button 
                                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={activeStep === 0}
                                                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                                            >
                                                Back
                                            </button>
                                            <div>
                                                <button className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50">
                                                    Save Progress
                                                </button>
                                                <button 
                                                    className="px-6 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
                                                    onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                                                >
                                                    Next Step
                                                </button>
                                            </div>
                                        </div>
                                        {/* End Navigation Buttons */}
                                    </div>
                                </div>
                                
                                {/* Side Panel */}
                                <div className="w-80 border-l border-gray-200 bg-white">
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-medium text-gray-900">Brand Preview</h3>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            {activeStep >= 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h4>
                                                    <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                                                        {brandDiscovery.targetAudience.ageRange[0] && brandDiscovery.targetAudience.ageRange[1] ? (
                                                            <p>{brandDiscovery.targetAudience.ageRange[0]}-{brandDiscovery.targetAudience.ageRange[1]} year olds</p>
                                                        ) : (
                                                            <p>25-40 year old professionals</p>
                                                        )}
                                                        <p>{brandDiscovery.targetAudience.location || "Urban, tech-savvy"}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {activeStep >= 0 && brandDiscovery.industry && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Industry</h4>
                                                    <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                                                        <p>{brandDiscovery.industry}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {activeStep >= 0 && brandDiscovery.values.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Core Values</h4>
                                                    <div className="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
                                                        <div className="flex flex-wrap gap-1">
                                                            {brandDiscovery.values.map(valueId => {
                                                                const value = valueOptions.find(v => v.id === valueId);
                                                                return (
                                                                    <span key={valueId} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                                                                        {value?.label}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {activeStep >= 1 && (
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Direction</h4>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {selectedImages.map(index => (
                                                            <div key={index} className="rounded-md overflow-hidden border border-gray-200">
                                                                <img src="60.png" alt={`Selected image ${index+1}`} className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="border-t border-gray-200 pt-4">
                                                <button className="w-full px-4 py-2 bg-gray-100 rounded-md text-gray-700 font-medium hover:bg-gray-200 text-sm">
                                                    View Full Preview
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Side Panel */}
                            </div>
                            {/* End Main Content */}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}