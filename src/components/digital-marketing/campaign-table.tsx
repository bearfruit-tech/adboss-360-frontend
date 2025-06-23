'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { MultiSelect } from "@/components/ui/multi-select"

// Sample data - replace with your actual data structure
const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    type: "Seasonal Promotion",
    status: "Active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: "$50,000",
    owner: "John Doe"
  },
  // Add more sample data as needed
]

export default function CampaignTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [budgetAllocation, setBudgetAllocation] = useState({
    socialMedia: 0,
    emailMarketing: 0,
    paidAdvertising: 0,
    contentCreation: 0
  })
  const [teamMembers, setTeamMembers] = useState<string[]>([])
  const [secondaryObjectives, setSecondaryObjectives] = useState<string[]>([])
  const [successMetrics, setSuccessMetrics] = useState([{ type: '', target: '', current: '' }])
  const [keyMilestones, setKeyMilestones] = useState([{ date: null, description: '' }])

  const addSuccessMetric = () => {
    setSuccessMetrics([...successMetrics, { type: '', target: '', current: '' }])
  }

  const addKeyMilestone = () => {
    setKeyMilestones([...keyMilestones, { date: null, description: '' }])
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Campaigns</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            
            <form className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="campaignName">Campaign Name*</Label>
                    <Input id="campaignName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaignType">Campaign Type</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                        <SelectItem value="lead-generation">Lead Generation</SelectItem>
                        <SelectItem value="seasonal">Seasonal Promotion</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                      </SelectContent>
                    </Select>
                    
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaignStatus">Campaign Status</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Campaign Description</Label>
                  <Textarea id="description" />
                </div>
              </div>

              {/* Channels */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Channels</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Social Media */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground">Social Media</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="instagram" />
                            <Label htmlFor="instagram">Instagram</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="x" />
                            <Label htmlFor="x">X (Twitter)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="linkedin" />
                            <Label htmlFor="linkedin">LinkedIn</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="facebook" />
                            <Label htmlFor="facebook">Facebook</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="tiktok" />
                            <Label htmlFor="tiktok">TikTok</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="pinterest" />
                            <Label htmlFor="pinterest">Pinterest</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="snapchat" />
                            <Label htmlFor="snapchat">Snapchat</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="threads" />
                            <Label htmlFor="threads">Threads</Label>
                          </div>
                        </div>
                      </div>

                      {/* Content Platforms */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground">Content Platforms</h4>
                        <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="youtube" />
                            <Label htmlFor="youtube">YouTube</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="medium" />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="blog" />
                            <Label htmlFor="blog">Blog/Website</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="podcast" />
                            <Label htmlFor="podcast">Podcast</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="email" />
                            <Label htmlFor="email">Email Marketing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="sms" />
                            <Label htmlFor="sms">SMS Marketing</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="whatsapp" />
                            <Label htmlFor="whatsapp">WhatsApp Business</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date*</Label>
                    <DatePicker 
                      date={startDate} 
                      onSelect={setStartDate} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date*</Label>
                    <DatePicker 
                      date={endDate} 
                      onSelect={setEndDate} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Key Milestones</Label>
                  {keyMilestones.map((milestone, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      <DatePicker 
                        date={milestone.date} 
                        onSelect={(date) => {
                          const newMilestones = [...keyMilestones]
                          newMilestones[index].date = date
                          setKeyMilestones(newMilestones)
                        }} 
                      />
                      <Input 
                        placeholder="Milestone description"
                        value={milestone.description}
                        onChange={(e) => {
                          const newMilestones = [...keyMilestones]
                          newMilestones[index].description = e.target.value
                          setKeyMilestones(newMilestones)
                        }}
                      />
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addKeyMilestone}>
                    Add Milestone
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Objectives & KPIs */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Objectives & KPIs</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryObjective">Primary Objective*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="increase-sales">Increase Sales</SelectItem>
                        <SelectItem value="generate-leads">Generate Leads</SelectItem>
                        <SelectItem value="build-awareness">Build Awareness</SelectItem>
                        <SelectItem value="drive-traffic">Drive Traffic</SelectItem>
                        <SelectItem value="customer-retention">Customer Retention</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Secondary Objectives</Label>
                    <MultiSelect
                      options={[
                        { value: "increase-sales", label: "Increase Sales" },
                        { value: "generate-leads", label: "Generate Leads" },
                        { value: "build-awareness", label: "Build Awareness" },
                        { value: "drive-traffic", label: "Drive Traffic" },
                        { value: "customer-retention", label: "Customer Retention" }
                      ]}
                      value={secondaryObjectives}
                      onChange={setSecondaryObjectives}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Success Metrics</Label>
                    {successMetrics.map((metric, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Metric type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conversions">Conversions</SelectItem>
                            <SelectItem value="impressions">Impressions</SelectItem>
                            <SelectItem value="clicks">Clicks</SelectItem>
                            <SelectItem value="engagement">Engagement</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          type="number" 
                          placeholder="Target value"
                          value={metric.target}
                          onChange={(e) => {
                            const newMetrics = [...successMetrics]
                            newMetrics[index].target = e.target.value
                            setSuccessMetrics(newMetrics)
                          }}
                        />
                        <Input 
                          type="number" 
                          placeholder="Current value"
                          value={metric.current}
                          onChange={(e) => {
                            const newMetrics = [...successMetrics]
                            newMetrics[index].current = e.target.value
                            setSuccessMetrics(newMetrics)
                          }}
                        />
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addSuccessMetric}>
                      Add Another Metric
                    </Button>
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Target Audience</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audienceSegment">Audience Name/Segment*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select or create new" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">+ Create New Segment</SelectItem>
                        <SelectItem value="existing-1">Existing Segment 1</SelectItem>
                        <SelectItem value="existing-2">Existing Segment 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age Range</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" placeholder="Min" />
                        <span>-</span>
                        <Input type="number" placeholder="Max" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter target locations" />
                  </div>

                  <div className="space-y-2">
                    <Label>Interests/Behaviors</Label>
                    <MultiSelect
                      options={[
                        { value: "tech", label: "Technology" },
                        { value: "fashion", label: "Fashion" },
                        { value: "sports", label: "Sports" },
                        { value: "travel", label: "Travel" }
                      ]}
                      value={[]}
                      onChange={() => {}}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Audience Upload</Label>
                    <Input type="file" />
                  </div>

                  <div className="space-y-2">
                    <Label>Estimated Reach</Label>
                    <Input type="number" placeholder="Auto-calculated" disabled />
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Budget</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalBudget">Total Campaign Budget*</Label>
                    <Input type="number" id="totalBudget" placeholder="Enter amount" />
                  </div>

                  <div className="space-y-4">
                    <Label>Budget Allocation</Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Social Media</Label>
                        <Slider
                          value={[budgetAllocation.socialMedia]}
                          onValueChange={(value) => setBudgetAllocation(prev => ({ ...prev, socialMedia: value[0] }))}
                          max={100}
                          step={1}
                        />
                        <span className="text-sm text-muted-foreground">{budgetAllocation.socialMedia}%</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Email Marketing</Label>
                        <Slider
                          value={[budgetAllocation.emailMarketing]}
                          onValueChange={(value) => setBudgetAllocation(prev => ({ ...prev, emailMarketing: value[0] }))}
                          max={100}
                          step={1}
                        />
                        <span className="text-sm text-muted-foreground">{budgetAllocation.emailMarketing}%</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Paid Advertising</Label>
                        <Slider
                          value={[budgetAllocation.paidAdvertising]}
                          onValueChange={(value) => setBudgetAllocation(prev => ({ ...prev, paidAdvertising: value[0] }))}
                          max={100}
                          step={1}
                        />
                        <span className="text-sm text-muted-foreground">{budgetAllocation.paidAdvertising}%</span>
                      </div>
                      <div className="space-y-2">
                        <Label>Content Creation</Label>
                        <Slider
                          value={[budgetAllocation.contentCreation]}
                          onValueChange={(value) => setBudgetAllocation(prev => ({ ...prev, contentCreation: value[0] }))}
                          max={100}
                          step={1}
                        />
                        <span className="text-sm text-muted-foreground">{budgetAllocation.contentCreation}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="total">Total</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="budget-alerts" />
                    <Label htmlFor="budget-alerts">Enable Budget Alerts</Label>
                  </div>
                </div>
              </div>

              {/* Creative Assets */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Creative Assets</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Brand Guidelines</Label>
                    <Input type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Logo/Visual</Label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <div className="space-y-2">
                    <Label>Color Palette</Label>
                    <Input type="color" />
                    <Input type="color" />
                    <Input type="color" />
                  </div>
                  <div className="space-y-2">
                    <Label>Key Messages</Label>
                    <Input placeholder="Primary Message" />
                    <Input placeholder="Secondary Message" />
                  </div>
                  <div className="space-y-2">
                    <Label>Hashtags</Label>
                    <Input placeholder="#hashtag1 #hashtag2" />
                  </div>
                  <div className="space-y-2">
                    <Label>Asset Library</Label>
                    <Input type="file" multiple />
                  </div>
                </div>
              </div>

              {/* Team & Permissions */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Team & Permissions</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Campaign Owner*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select owner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user1">User 1</SelectItem>
                        <SelectItem value="user2">User 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team Members</Label>
                    <MultiSelect
                      options={[
                        { value: "user1", label: "User 1" },
                        { value: "user2", label: "User 2" },
                        { value: "user3", label: "User 3" }
                      ]}
                      value={teamMembers}
                      onChange={setTeamMembers}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="approval-workflow" />
                    <Label htmlFor="approval-workflow">Enable Approval Workflow</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Client/Stakeholder Access</Label>
                    <Checkbox id="view-only" />
                    <Label htmlFor="view-only">View-only permissions</Label>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Advanced Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>UTM Parameters</Label>
                    <Input placeholder="Auto-generate or custom" />
                  </div>
                  <div className="space-y-2">
                    <Label>Conversion Tracking</Label>
                    <Input placeholder="Pixel/tag configuration" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="ab-testing" />
                    <Label htmlFor="ab-testing">Enable A/B Testing</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Compliance Requirements</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="gdpr" />
                      <Label htmlFor="gdpr">GDPR</Label>
                      <Checkbox id="ccpa" />
                      <Label htmlFor="ccpa">CCPA</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Campaign Tags</Label>
                    <Input placeholder="Internal tags" />
                  </div>
                </div>
              </div>

              {/* Integration Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integration Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>CRM Integration</Label>
                    <Input placeholder="Map to CRM campaign" />
                  </div>
                  <div className="space-y-2">
                    <Label>Analytics Integration</Label>
                    <Input placeholder="Google Analytics, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label>Automation Rules</Label>
                    <Input placeholder="If/then conditions" />
                  </div>
                  <div className="space-y-2">
                    <Label>Webhook Notifications</Label>
                    <Input placeholder="Webhook URL" />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Campaign</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id} className="font-light">
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.type}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>{campaign.startDate}</TableCell>
              <TableCell>{campaign.endDate}</TableCell>
              <TableCell>{campaign.budget}</TableCell>
              <TableCell>{campaign.owner}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}