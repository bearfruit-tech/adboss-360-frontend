export interface SocialMediaPost {
    id: string;
    title: string;
    channel: 'Instagram' | 'TikTok' | 'LinkedIn';
    date: Date;
    status: 'draft' | 'scheduled' | 'published';
  }