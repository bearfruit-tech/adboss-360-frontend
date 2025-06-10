 'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface SocialMediaPost {
  id: string
  title: string
  channel: 'Instagram' | 'TikTok' | 'LinkedIn'
  date: Date
  status: 'draft' | 'scheduled' | 'published'
}

const channelColors = {
  Instagram: 'bg-gradient-to-r from-pink-500 to-red-500',
  TikTok: 'bg-black',
  LinkedIn: 'bg-blue-600'
}

export default function SocialMediaCalendar() {
  const [events, setEvents] = useState<SocialMediaPost[]>([
    {
      id: '1',
      title: 'Product Launch Announcement',
      channel: 'Instagram',
      date: new Date(),
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Behind the Scenes Video',
      channel: 'TikTok',
      date: new Date(Date.now() + 86400000), // tomorrow
      status: 'draft'
    },
    {
      id: '3',
      title: 'Industry Insights',
      channel: 'LinkedIn',
      date: new Date(Date.now() + 172800000), // day after tomorrow
      status: 'scheduled'
    }
  ])

  const renderEventContent = (eventInfo: any) => {
    const post = events.find(e => e.id === eventInfo.event.id)
    if (!post) return null

    return (
      <Card className="p-2 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <Badge className={`${channelColors[post.channel]} text-white`}>
            {post.channel}
          </Badge>
          <span className="text-sm font-medium">{post.title}</span>
        </div>
      </Card>
    )
  }

  return (
    <div className="p-4 mt-[160px]">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
        events={events.map(event => ({
          id: event.id,
          title: event.title,
          date: event.date,
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        }))}
        eventContent={renderEventContent}
        height="auto"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
      />
    </div>
  )
}