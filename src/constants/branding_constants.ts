export interface BrandingStep {
    id: number;
    title: string;
    completed: boolean;
  }
  
  export interface ValueOption {
    id: string;
    label: string;
  }
  
  export interface ProblemOption {
    id: string;
    label: string;
  }
  
  export const valueOptions: ValueOption[] = [
    { id: "innovation", label: "Innovation" },
    { id: "quality", label: "Quality" },
    { id: "sustainability", label: "Sustainability" },
    { id: "trust", label: "Trust" },
    { id: "excellence", label: "Excellence" },
    { id: "community", label: "Community" },
    { id: "growth", label: "Growth" },
    { id: "integrity", label: "Integrity" }
  ];
  
  export const problemOptions: ProblemOption[] = [
    { id: "time-saving", label: "Saving Time" },
    { id: "cost-reduction", label: "Reducing Costs" },
    { id: "quality-improvement", label: "Improving Quality" },
    { id: "efficiency", label: "Increasing Efficiency" },
    { id: "convenience", label: "Enhancing Convenience" },
    { id: "sustainability", label: "Promoting Sustainability" }
  ];

  // Mood board images
export const moodboardImages: string[] = [
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
  
  // Logo options
  export const logoOptions: string[] = [
    // Simple circle logo
    `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" fill="#3B82F6" stroke="#1E40AF" stroke-width="4"/>
      <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">LOGO</text>
    </svg>`,
    
    // Simple square logo
    `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="160" height="160" fill="#10B981" stroke="#059669" stroke-width="4" rx="8"/>
      <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white">BRAND</text>
    </svg>`,
    
    // Simple triangle logo
    `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,20 180,180 20,180" fill="#F59E0B" stroke="#D97706" stroke-width="4"/>
      <text x="100" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">MARK</text>
    </svg>`
  ];
  
  // Steps titles and descriptions
  export const brandingSteps: BrandingStep[] = [
    { id: 0, title: "Brand Discovery", completed: false },
    { id: 1, title: "Visual Inspiration", completed: false },
    { id: 2, title: "Logo Exploration", completed: false },
    { id: 3, title: "Color Harmony", completed: false },
    { id: 4, title: "Typography Selection", completed: false },
    { id: 5, title: "Imagery Direction", completed: false },
    { id: 6, title: "Brand Voice", completed: false },
    { id: 7, title: "Brand Identity Suite", completed: false }
  ];