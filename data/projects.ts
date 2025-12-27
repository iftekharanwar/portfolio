export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;

  // Detail page data
  context: string;
  role: string;
  duration: string;
  achievement?: string;
  tags: string[];

  // Hero section
  heroVideo?: string;
  heroTagline: string;

  // Challenge & Solution
  challenge: string;
  solution: string;

  // Gallery images
  gallery: {
    url: string;
    caption?: string;
  }[];

  // Metrics/Results
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];

  // Process steps
  process: {
    title: string;
    description: string;
  }[];

  // Team feedback
  feedback?: {
    quote: string;
    author: string;
    role: string;
  };

  // Colors for theming
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const projects: ProjectData[] = [
  {
    id: 1,
    slug: 'hackcultura3d-heritage-generator',
    title: 'Hack the Data Culture',
    category: 'CULTURAL TECH',
    year: '2025',
    description: 'Award-winning app and website transforming 2D archival images into interactive 3D cultural heritage models',
    image: '/images/projects/project-01-main.png',
  
    context: 'Italian Ministry of Culture',
    role: 'Product Developer',
    duration: '3 days',
    tags: ['DPaaS', '3D Reconstruction', 'iOS App', 'AR', 'Metal', 'Three.js'],
  
    heroTagline: 'FROM 2D ARCHIVES TO IMMERSIVE 3D CULTURAL EXPERIENCES ACROSS THE APPLE ECOSYSTEM',
  
    challenge: 'The Ministry provided large 2D image datasets of cultural heritage objects. The task was to convert these into accurate, interactive 3D models and make them accessible across iPhone, iPad, Mac, Vision Pro, and a web platform, all in just a few days.',
  
    solution: 'We developed a custom algorithm to generate 3D models from 2D images and built a full iOS app ecosystem along with a website showpiece. The app includes AR features allowing users to place and interact with models anywhere, providing an educational and engaging experience. The website serves as an educational showcase for schools and museums.',
  
    gallery: [
      { url: '/images/projects/project-01-gallery-1.png', caption: '3D Model Generated from 2D Dataset' },
      { url: '/images/projects/project-01-gallery-2.png', caption: 'VisionOS Interface' },
      { url: '/images/projects/project-01-gallery-3.png', caption: 'AR Interaction on iPad' },
      { url: '/images/projects/pp.png', caption: 'Educational Website Showpiece' },
      { url: '/images/projects/project-01-gallery-5.png', caption: 'The Algorithm' },
    ],
  
    metrics: [
      { label: 'Hackathon Ranking', value: '1st Prize', description: 'Winner of Challenge 2' },
      { label: '3D Models Generated', value: '7+', description: 'Artifacts reconstructed from 2D datasets' },
      { label: 'AR Engagement', value: '4.9/5', description: 'Users interacted with models via AR in the app' },
      { label: 'Ecosystem Coverage', value: '4 devices', description: 'iPhone, iPad, Mac, Vision Pro support' },
    ],
  
    process: [
      { title: 'DATA ANALYSIS', description: 'Explored 2D image datasets, identified inconsistencies, and planned reconstruction paths' },
      { title: 'ALGORITHM DEVELOPMENT', description: 'Built a custom 3D reconstruction pipeline from 2D images' },
      { title: 'APP & WEBSITE DEVELOPMENT', description: 'Developed full iOS app ecosystem and educational website showcase' },
      { title: 'AR INTEGRATION', description: 'Implemented AR features allowing users to place and interact with models' },
      { title: 'OPTIMIZATION', description: 'Enhanced performance for real-time 3D rendering across devices' },
      { title: 'LAUNCH & PRESENTATION', description: 'Deployed platform and presented to judges, winning first prize' },
    ],
  
    feedback: {
      quote: 'This project set a new benchmark for digital heritage engagement. The team transformed 2D archives into interactive 3D experiences across the Apple ecosystem — truly impressive for a hackathon timeline.',
      author: 'HackCultura Committee',
      role: 'Event Judges, Italian Ministry of Culture',
    },
  
    colors: {
      primary: '#2B3A67',
      secondary: '#F4F4F4',
      accent: '#C0392B',
    },
  },

  {
    id: 2,
    slug: 'inclusive-tourism-trieste',
    title: 'Inclusive Tourism App',
    category: 'SOCIAL IMPACT',
    year: '2025',
    description: 'First-prize winning iOS app designed with users to make tourism accessible for everyone',
    image: '/images/projects/project-02-main.png',
  
    context: 'Trieste Hackathon – Inclusive Tourism Challenge',
    role: 'Lead UX Designer & Developer',
    duration: '2 days',
    tags: ['iOS', 'Accessibility', 'Inclusive Design', 'User Research', 'SwiftUI'],
  
    heroTagline: 'MAKING TOURISM ACCESSIBLE FOR ALL THROUGH USER-CENTERED DESIGN',
  
    challenge: 'Tourism can be difficult to navigate for people with disabilities due to physical barriers, lack of information, and limited digital tools. The challenge was to create a solution that empowers all travelers to explore Trieste comfortably and safely.',
  
    solution: 'We developed a user-centered iOS app that provides accessible travel routes, venue information, and real-time assistance features. We conducted interviews and workshops with people with disabilities to co-design the experience, ensuring that every feature directly met real user needs.',
  
    gallery: [
      { url: '/images/projects/project-02-gallery-1.jpg', caption: 'iOS App Interface – Accessible Routes' },
      { url: '/images/projects/project-02-gallery-2.jpg', caption: 'User Research & Co-Design Session' },
      { url: '/images/projects/project-02-gallery-3.jpg', caption: 'AR Navigation for Accessible Paths' },
      { url: '/images/projects/project-02-gallery-3.jpg', caption: 'Feature Testing With Users' },
      { url: '/images/projects/project-02-gallery-2.jpg', caption: 'Final Presentation – Hackathon' },
    ],
  
    metrics: [
      { label: 'Hackathon Ranking', value: '1st Prize', description: 'Winner of Inclusive Tourism Challenge' },
      { label: 'User Interviews', value: '5+', description: 'Persons with disabilities consulted during research' },
      { label: 'Accessibility Features', value: '8', description: 'Custom features co-designed with users' },
      { label: 'App Coverage', value: 'iOS', description: 'iPhone and iPad support with SwiftUI' },
    ],
  
    process: [
      { title: 'USER RESEARCH', description: 'Conducted interviews and workshops with people with disabilities to understand challenges and needs' },
      { title: 'IDEATION & CO-DESIGN', description: 'Co-created feature set with real users ensuring usability and accessibility' },
      { title: 'APP DEVELOPMENT', description: 'Built the iOS app using SwiftUI and integrated AR navigation for accessible routes' },
      { title: 'TESTING', description: 'Iteratively tested features with users and incorporated feedback' },
      { title: 'PRESENTATION & WIN', description: 'Presented solution to judges and secured first prize' },
    ],
  
    feedback: {
      quote: 'This app demonstrates what inclusive design truly means. It was inspiring to see a team work so closely with users and create a product that makes tourism accessible for everyone.',
      author: 'Hackathon Jury – Trieste',
      role: 'Event Judges',
    },
  
    colors: {
      primary: '#1E4D2B',
      secondary: '#F4F4F4',
      accent: '#FF8C42',
    },
  },

  {
    id: 3,
    slug: 'presenterpro-ai-pitch-assistant',
    title: 'PresenterPro – AI Pitch Assistant',
    category: 'PRODUCTIVITY / AI',
    year: '2025',
    description: 'AI-powered app that ensures presenters never miss critical points during high-stakes presentations',
    image: '/images/projects/project-03-main.jpg',
  
    context: 'Apple Developers Academy',
    role: 'Co-creator & iOS Developer',
    duration: '6 weeks',
    tags: ['iOS', 'AI', 'SwiftUI', 'AirPods', 'UX', 'Product Design'],
  
    heroTagline: 'NEVER MISS A CRITICAL POINT – AI-DRIVEN PRESENTATION ASSISTANCE',
  
    challenge: 'Presenters like John often have multiple pitch versions for different audiences. Even after extensive preparation, adrenaline and flow can cause them to skip crucial points, leaving value on the table. Existing solutions like notes, teleprompters, or memorization are either unprofessional or rigid.',
  
    solution: 'PresenterPro acts as a **silent AI partner**. Users record or input their pitch, and AI identifies **key points** with timestamps. During practice and live presentations, the app whispers only the crucial points via AirPods at the perfect moment, helping presenters maintain flow, eye contact, and audience engagement without missing critical information.',
  
    gallery: [
      { url: '/images/projects/project-03-gallery-1.jpg', caption: 'PresenterPro iOS App Interface' },
      { url: '/images/projects/project-02-gallery-3.jpg', caption: 'Pitch Notes and AI Highlighting' },
      { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop', caption: 'AirPods Integration for Real-Time Assistance' },
      { url: '/images/projects/project-03-gallery-2.jpg', caption: 'Practicing with PresenterPro' },
      { url: '/images/projects/project-01-gallery-5.jpg', caption: 'Presentation Stage Simulation' },
    ],
  
    metrics: [
      { label: 'Academy Ranking', value: 'Top 7 Presentations', description: 'Selected among cohort for seminar presentation' },
      { label: 'Pitch Points Tracked', value: '8–12', description: 'AI identifies key moments in each presentation' },
      { label: 'Devices Supported', value: 'iPhone + iPad + AirPods', description: 'Ensures seamless user experience' },
      { label: 'User Engagement', value: '100% retention during practice sessions', description: 'Presenters practiced using the app consistently' },
    ],
  
    process: [
      { title: 'PROBLEM RESEARCH', description: 'Analyzed presenter pain points and observed real-life pitch failures' },
      { title: 'IDEATION', description: 'Conceptualized an AI assistant that whispers key points in real-time' },
      { title: 'PROTOTYPING', description: 'Built early iOS app prototypes and integrated AirPods audio cues' },
      { title: 'USER TESTING', description: 'Simulated real pitch scenarios, refined timing and notifications' },
      { title: 'FINAL PRESENTATION', description: 'Presented in seminar; app selected among Top 7 presentations in cohort' },
    ],
  
    feedback: {
      quote: 'PresenterPro demonstrates a creative, practical approach to solving a real-world presentation problem. The seamless use of AI and iOS ecosystem impressed both judges and peers.',
      author: 'Apple Developers Academy Jury',
      role: 'Event Judges',
    },
  
    colors: {
      primary: '#4A90E2',
      secondary: '#F4F4F4',
      accent: '#FFC107',
    },
  },

  {
    id: 4,
    slug: 'pest-prediction-platform',
    title: 'Pest Prediction Platform',
    category: 'AGRICULTURE TECH',
    year: '2024',
    description: 'Machine learning platform predicting pest outbreaks to help farmers take timely action',
    image: '/images/projects/project-04-main.jpg',
  
    context: 'i3p / NASA Space Apps Challenge – Turin',
    role: 'Lead Developer & Data Scientist',
    duration: '6 weeks',
    tags: ['Machine Learning', 'Python', 'Data Science', 'Predictive Analytics', 'Agriculture Tech'],
  
    heroTagline: 'TURNING DATA INTO ACTIONABLE INSIGHTS FOR FARMERS',
  
    challenge: 'Farmers often struggle to predict pest outbreaks, leading to crop damage and financial loss. The NASA Space Apps Challenge tasked us with building a solution that could provide actionable, data-driven predictions locally in Turin, with the potential for broader adoption.',
  
    solution: 'We developed a **machine learning platform** that analyzes historical crop and pest data to predict outbreaks before they happen. The platform includes a **dashboard for farmers**, visualizing risk levels, recommended actions, and real-time alerts. Our solution was designed to be **scalable, reliable, and easy to use** in real-world agricultural settings.',
  
    gallery: [
      { url: '/images/projects/project-04-gallery-1.jpg', caption: 'Predictive Dashboard for Farmers' },
      { url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=1920&h=1080&fit=crop', caption: 'Data Pipeline and ML Model Training' },
      { url: 'https://images.unsplash.com/photo-1581091012184-1c5e927ff9b2?w=1920&h=1080&fit=crop', caption: 'Local Testing with Farms in Turin' },
      { url: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1920&h=1080&fit=crop', caption: 'Team Presentation at NASA Space Apps Challenge' },
      { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop', caption: 'Incubation Opportunity at i3p' },
    ],
  
    metrics: [
      { label: 'Hackathon Ranking', value: '2nd Place', description: 'NASA Space Apps Challenge – Turin' },
      { label: 'Incubation', value: 'i3p', description: 'Awarded free incubation opportunity for further development' },
      { label: 'Predictions Generated', value: '1000+', description: 'Historical and simulated pest outbreak predictions' },
      { label: 'Farmer Engagement', value: '50+', description: 'Farmers tested early version and gave feedback' },
    ],
  
    process: [
      { title: 'DATA COLLECTION', description: 'Compiled historical crop and pest datasets relevant to the region' },
      { title: 'MODEL DEVELOPMENT', description: 'Built predictive ML models to forecast pest outbreaks with high accuracy' },
      { title: 'DASHBOARD DESIGN', description: 'Created an intuitive interface for farmers to visualize predictions and alerts' },
      { title: 'TESTING & FEEDBACK', description: 'Deployed early version locally and iterated based on farmer feedback' },
      { title: 'PRESENTATION & INCUBATION', description: 'Secured 2nd place in the hackathon and a free incubation slot at i3p' },
    ],
  
    feedback: {
      quote: 'This platform shows great potential in helping farmers make informed decisions. The predictive insights are actionable, and the team’s execution was excellent under hackathon constraints.',
      author: 'i3p Jury, NASA Space Apps Challenge – Turin',
      role: 'Event Judges',
    },
  
    colors: {
      primary: '#2E7D32',
      secondary: '#F4F4F4',
      accent: '#FFC107',
    },
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectById(id: number): ProjectData | undefined {
  return projects.find(p => p.id === id);
}

export function getNextProject(currentId: number): ProjectData | undefined {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}

export function getPreviousProject(currentId: number): ProjectData | undefined {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
  return projects[prevIndex];
}
