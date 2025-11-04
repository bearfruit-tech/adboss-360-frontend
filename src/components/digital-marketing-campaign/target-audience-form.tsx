import useDigitalMarketingCampaignStore from "@/stores/use-digital-marketing-campaign-store"
import useClientStore from "@/stores/use-client-store"
import { TargetAudience, TargetAudienceType } from "@/types/branding/target-audience.interface"
import { useState } from "react"
import TargetAudienceDetails from "./target-audience-details"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ShortUniqueId from 'short-unique-id'
import { authorizedApiRequest } from "@/api"
import { HttpMethods } from "@/constants/api_methods"
import { APIRoutes } from "@/constants/api_routes"
import { Loader2 } from "lucide-react"

const TargetAudienceForm = () => {
  const [mode, setMode] = useState<'select' | 'create'>('select')
  const [selectedExistingId, setSelectedExistingId] = useState<string>('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [availableTargetAudiences, setAvailableTargetAudiences] = useState<TargetAudience[]>([])
  const [targetAudienceType, setTargetAudienceType] = useState<`${TargetAudienceType.BUSINESS}`|`${TargetAudienceType.INDIVIDUAL_CONSUMER}`>("BUSINESS")
  const [targetAudience, setTargetAudience] = useState<TargetAudience>({
    uniqueId: "",
    targetAudienceType: targetAudienceType,
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
  const {updateTargetAudience, campaignFoundation} = useDigitalMarketingCampaignStore()
  const currentClient = useClientStore((state) => state.currentSelectedClient)

  const uid = new ShortUniqueId({length: 10});

  const fetchTargetAudiencesForProject = async (projectId: string) => {
    if (!projectId) return

    setLoading(true)
    setAvailableTargetAudiences([])
    setSelectedExistingId('')

    try {
      const url = `${APIRoutes.ORGANIZATIONS.GET_ORGANIZATION}/branding/${projectId}`
      const response = await authorizedApiRequest(HttpMethods.GET, url, {})

      console.log('=== FETCHING TARGET AUDIENCES ===')
      console.log('Project ID:', projectId)
      console.log('Full response:', response.data)
      console.log('Brand Discovery:', response.data?.metadata?.brandDiscovery)
      console.log('Target Audiences:', response.data?.metadata?.brandDiscovery?.targetAudience)

      if (response.data?.metadata?.brandDiscovery?.targetAudience) {
        const targetAudiences = response.data.metadata.brandDiscovery.targetAudience
        setAvailableTargetAudiences(targetAudiences)
        console.log('Set available target audiences:', targetAudiences)
      } else {
        setAvailableTargetAudiences([])
        console.log('No target audiences found')
      }
    } catch (error) {
      console.log(`No branding data for selected project:`, error)
      setAvailableTargetAudiences([])
    } finally {
      setLoading(false)
    }
  }

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId)
    fetchTargetAudiencesForProject(projectId)
  }

  const addTargetAudience = () => {
    // Validate that at least some data is filled in
    const hasData = targetAudienceType === TargetAudienceType.BUSINESS
      ? (targetAudience.companySize || targetAudience.industry || targetAudience.annualRevenue || targetAudience.decisionMakerRole || targetAudience.geographicMarket)
      : (targetAudience.ageRange[0] > 0 || targetAudience.ageRange[1] > 0 || targetAudience.gender || targetAudience.income || targetAudience.education || targetAudience.location)

    if (!hasData) {
      alert('Please fill in at least some target audience information before adding.')
      return
    }

    updateTargetAudience({...targetAudience, uniqueId: uid.randomUUID(), targetAudienceType: targetAudienceType})
    setTargetAudience({
      uniqueId: "",
      targetAudienceType: targetAudienceType,
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
    setTargetAudienceType("BUSINESS")
  }

  const addExistingTargetAudience = () => {
    const existing = availableTargetAudiences.find(ta => ta.uniqueId === selectedExistingId)
    if (existing) {
      updateTargetAudience(existing)
      setSelectedExistingId('')
    }
  }

  const setBusinessTypeValue = (v: string) => {
    const value  = v == `${TargetAudienceType.BUSINESS}` ? "BUSINESS": "INDIVIDUAL_CONSUMER"
    setTargetAudienceType(value)
  }

  const getTargetAudienceLabel = (ta: TargetAudience) => {
    if (ta.targetAudienceType === TargetAudienceType.BUSINESS) {
      return `B2B: ${ta.companySize || 'N/A'} - ${ta.industry || 'N/A'}`
    } else {
      return `B2C: Age ${ta.ageRange[0]}-${ta.ageRange[1]} - ${ta.gender || 'N/A'} - ${ta.location || 'N/A'}`
    }
  }

  const getSelectedProjectName = () => {
    const project = currentClient.projects.find(p => p.id === selectedProjectId)
    return project ? project.name : ''
  }

  return (
    <>
        {campaignFoundation.targetAudience.length >= 1 && campaignFoundation.targetAudience.map((audience) => (
          <TargetAudienceDetails targetAudience={audience}  key={audience.uniqueId}/>
        ))}

        <CardContent className="space-y-4 ">

            <div className="mb-5">
              <Label className="mb-4 block">How would you like to add a target audience?</Label>
              <RadioGroup value={mode} onValueChange={(v) => setMode(v as 'select' | 'create')}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="select" />
                    <Label htmlFor=''>Select from Branding Data</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="create" />
                    <Label htmlFor=''>Create New</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {mode === 'select' && (
              <>
                <div>
                  <Label htmlFor="projectSelect" className="mb-2 block">Select Project</Label>
                  <Select value={selectedProjectId} onValueChange={handleProjectChange}>
                    <SelectTrigger id="projectSelect">
                      <SelectValue placeholder="Select a project to view target audiences" />
                    </SelectTrigger>
                    <SelectContent>
                      {currentClient.projects.length === 0 ? (
                        <SelectItem value="none" disabled>No projects available</SelectItem>
                      ) : (
                        currentClient.projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProjectId && (
                  <>
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="ml-2">Loading target audiences from {getSelectedProjectName()}...</span>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Label htmlFor="existingAudience" className="mb-2 block">Select Target Audience from {getSelectedProjectName()}</Label>
                          <Select value={selectedExistingId} onValueChange={setSelectedExistingId}>
                            <SelectTrigger id="existingAudience">
                              <SelectValue placeholder="Select a target audience" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTargetAudiences.length === 0 ? (
                                <SelectItem value="none" disabled>No target audiences available for this project</SelectItem>
                              ) : (
                                availableTargetAudiences
                                  .filter(ta => !campaignFoundation.targetAudience.some(cta => cta.uniqueId === ta.uniqueId))
                                  .map((ta) => (
                                    <SelectItem key={ta.uniqueId} value={ta.uniqueId}>
                                      {getTargetAudienceLabel(ta)}
                                    </SelectItem>
                                  ))
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Button
                            onClick={addExistingTargetAudience}
                            disabled={!selectedExistingId}
                            variant="secondary"
                          >
                            Add Selected Audience
                          </Button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {mode === 'create' && (
              <>
                <div className="mb-5">
                  <Label htmlFor="targetAudienceType" className="mb-4 block">Is your target audience an individual consumer or a business?</Label>
                  <RadioGroup value={targetAudienceType}  onValueChange={(v) => {setBusinessTypeValue(v); setTargetAudience({...targetAudience, targetAudienceType: targetAudienceType})}}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={`${TargetAudienceType.INDIVIDUAL_CONSUMER}`} />
                        <Label htmlFor=''>Individual Consumer (B2C)</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={`${TargetAudienceType.BUSINESS}`} />
                        <Label htmlFor=''> Business (B2B)</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

            {/* Individual Consumer */}
            {targetAudienceType != undefined && targetAudienceType == `${TargetAudienceType.INDIVIDUAL_CONSUMER}` &&
            <>
              <div>
                <Label className="mb-2 block">Age Range</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{targetAudience.ageRange[0]}</span>
                  <Slider
                    defaultValue={targetAudience.ageRange}
                    value={targetAudience.ageRange}
                    min={18}
                    max={65}
                    step={1}
                    onValueChange={(value) => setTargetAudience({...targetAudience, ageRange:[value[0], value[1]]})}
                    className="flex-1"
                  />
                  <span className="text-sm">{targetAudience.ageRange[1]}</span>
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
            </>}

            {/* Business */}
            {targetAudienceType != undefined && targetAudienceType == `${TargetAudienceType.BUSINESS}` &&
             <>
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
             </>
            }
                <div className='mt-4'>
                  <Button className="cursor-pointer" variant="secondary" onClick={() => addTargetAudience()}>
                    {campaignFoundation.targetAudience.length > 0 ? 'Add Another Target Audience' : 'Add Target Audience'}
                  </Button>
                </div>
              </>
            )}

          </CardContent>
      </>
  )
}

export default TargetAudienceForm
