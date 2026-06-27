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
    title: '3D Heritage Generator',
    category: 'CULTURAL TECH',
    year: '2025',
    description: 'Award-winning app and website that transforms 2D archival images into interactive 3D cultural heritage models',
    image: '/images/projects/project-01-main.webp',
  
    context: 'Italian Ministry of Culture',
    role: 'Product Developer',
    duration: '3 days',
    tags: ['DPaaS', '3D Reconstruction', 'iOS App', 'AR', 'Metal', 'Three.js'],
  
    heroTagline: 'Turning 2D archives into immersive 3D cultural experiences across the Apple ecosystem',

    challenge: 'The Ministry provided large 2D image datasets of cultural heritage objects. Our task was to convert these into accurate, interactive 3D models and make them accessible across iPhone, iPad, Mac, Vision Pro, and web, all within just a few days.',

    solution: 'We built a custom algorithm that generates 3D models from 2D images and developed a full iOS app ecosystem with a website showpiece. The app includes AR features that let users place and interact with models anywhere, creating an educational and engaging experience. The website works as an educational showcase for schools and museums.',
  
    gallery: [
      { url: '/images/projects/project-01-gallery-1.webp', caption: '3D Model Generated from 2D Dataset' },
      { url: '/images/projects/project-01-gallery-2.webp', caption: 'VisionOS Interface' },
      { url: '/images/projects/project-01-gallery-3.webp', caption: 'AR Interaction on iPad' },
      { url: '/images/projects/pp.webp', caption: 'Educational Website Showpiece' },
      { url: '/images/projects/project-01-gallery-5.webp', caption: 'The Algorithm' },
    ],
  
    metrics: [
      { label: 'Hackathon Ranking', value: '1st Prize', description: 'Winner of Challenge 2, HackCultura' },
      { label: 'Timeline', value: '3 days', description: 'From 2D datasets to a working multi-device build' },
      { label: 'Ecosystem Coverage', value: '4 devices', description: 'iPhone, iPad, Mac, and Vision Pro' },
      { label: 'Pipeline', value: '2D → 3D', description: 'Custom reconstruction from archival images' },
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
      quote: 'This project set a new benchmark for digital heritage engagement. The team transformed 2D archives into interactive 3D experiences across the Apple ecosystem, which is truly impressive for a hackathon timeline.',
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
    slug: 'shoebox-daily-photo-game',
    title: 'Shoebox',
    category: 'iOS GAME · DESIGN',
    year: '2025',
    description: 'A daily guessing game played with your own photo library — guess where and when each shot was taken, graded against its real metadata, all on device',
    image: '/images/projects/shoebox-verdict.webp',

    context: 'Solo product — concept, design, and engineering',
    role: 'Designer & iOS Engineer',
    duration: 'Shipped — App Store ready',
    tags: ['SwiftUI', 'iOS 18', 'Swift 6', 'PhotoKit', 'MapKit', 'Core Haptics', 'On-device'],

    heroTagline: 'Every photo is a question: where were you, and when?',

    challenge: 'Photo-guessing games rely on a stock library everyone shares, so they get stale fast and never feel personal. I wanted a daily game built from your own camera roll — which means grading against real EXIF truth — without ever sending a single photo off the device.',

    solution: 'Shoebox deals you a daily roll of five of your own photos. For each, you mark where on a map and set when on a film date stamp, then it grades your roll against the photo’s real location and date. The whole interface is built around the physical culture of photographs — prints with white borders, a darkroom safelight in dark mode, a press-and-hold loupe for clues, and a haptic matched to every interaction. Everything runs on device; photos never leave the phone.',

    gallery: [
      { url: '/images/projects/shoebox-verdict.webp', caption: 'Every photo is a question — guess where and when' },
      { url: '/images/projects/shoebox-photos.webp', caption: 'A daily roll dealt from your own library' },
      { url: '/images/projects/shoebox-map.webp', caption: 'Mark the spot, set the date, get graded' },
    ],

    metrics: [
      { label: 'Status', value: 'App Store ready', description: 'Finished build, polished end to end' },
      { label: 'Privacy', value: '100% on-device', description: 'Photos and EXIF never leave the phone' },
      { label: 'Stack', value: 'Swift 6', description: 'SwiftUI, iOS 18, zero third-party dependencies' },
      { label: 'Feel', value: 'Haptic-first', description: 'Every interaction has a matched physical response' },
    ],

    process: [
      { title: 'CONCEPT', description: 'Framed a daily game graded against the truth in your own photo metadata' },
      { title: 'DESIGN SYSTEM', description: 'One rule: a treatment ships only if photographs, darkrooms, or contact sheets actually work that way' },
      { title: 'ENGINEERING', description: 'Built a deterministic daily roll, EXIF grading, and on-device persistence in SwiftUI' },
      { title: 'HAPTICS & FEEL', description: 'Matched a distinct haptic to each interaction — the X, the date wheels, the verdict thunk' },
      { title: 'SHIP', description: 'Polished to an App Store‑ready build with marketing screenshots' },
    ],

    colors: {
      primary: '#1A1A1A',
      secondary: '#F4F1EA',
      accent: '#B5341F',
    },
  },

  {
    id: 3,
    slug: 'braincurve-neural-engagement',
    title: 'BrainCurve',
    category: 'APPLIED ML · NEUROTECH',
    year: '2025',
    description: 'Predicts second-by-second neural engagement from any video, built on Meta’s TRIBE multimodal brain-encoding model',
    image: '/images/projects/braincurve-timeline.webp',

    context: 'Solo product — research engineering to product',
    role: 'ML & Full-stack Engineer',
    duration: 'Working prototype',
    tags: ['Python', 'TRIBE', 'HuBERT', 'DINOv2', 'FastAPI', 'Next.js', 'PyTorch'],

    heroTagline: 'Turning a video into a second-by-second map of attention, emotion, and memory',

    challenge: 'Creators and researchers can measure whether a video performed, but not why — which exact moments hold attention, land emotionally, or are likely to be remembered. Existing analytics are aggregate and after-the-fact; there was no way to see engagement as a continuous signal over the timeline.',

    solution: 'BrainCurve builds on Meta’s TRIBE multimodal brain-encoding model: audio (HuBERT), vision (DINOv2), and text embeddings are fused to predict per-timestep cortical responses, then distilled into attention, emotion, memory, and visual curves for any video. A FastAPI service handles upload, feature extraction, and inference; a Next.js frontend surfaces the engagement timeline, an overall score, and the strongest and weakest moments with explanations.',

    gallery: [
      { url: '/images/projects/braincurve-timeline.webp', caption: 'Engagement timeline — attention, emotion, memory, and visual curves over the video' },
      { url: '/images/projects/braincurve-dashboard.webp', caption: 'Per-metric neuro-scores with methodology' },
      { url: '/images/projects/braincurve-moments.webp', caption: 'Key moments and a per-video breakdown' },
    ],

    metrics: [
      { label: 'Model', value: 'TRIBE', description: 'Meta’s multimodal brain encoder, fine-tuned to the task' },
      { label: 'Modalities', value: '3 fused', description: 'Audio (HuBERT) + vision (DINOv2) + text' },
      { label: 'Output', value: '4 curves', description: 'Attention, emotion, memory, visual — per timestep' },
      { label: 'Stack', value: 'End-to-end', description: 'PyTorch inference, FastAPI backend, Next.js frontend' },
    ],

    process: [
      { title: 'RESEARCH', description: 'Studied TRIBE and multimodal brain encoding to map the approach to a usable product' },
      { title: 'FEATURE PIPELINE', description: 'Built extraction with HuBERT (audio) and DINOv2 (vision) plus text embeddings' },
      { title: 'INFERENCE ENGINE', description: 'Ran TRIBE to predict per-timestep responses, with GPU/CPU device fallback' },
      { title: 'DISTILLATION', description: 'Turned cortical predictions into attention, emotion, memory, and visual curves' },
      { title: 'PRODUCT', description: 'Wrapped it in a FastAPI service and a Next.js dashboard with key-moment explanations' },
    ],

    colors: {
      primary: '#1B2A4A',
      secondary: '#F4F4F4',
      accent: '#3D7DF2',
    },
  },

  {
    id: 4,
    slug: 'pest-prediction-platform',
    title: 'Pest Prediction',
    category: 'AGRICULTURE TECH',
    year: '2024',
    description: 'Machine learning platform predicting pest outbreaks to help farmers take timely action',
    image: '/images/projects/main.webp',
  
    context: 'i3p / NASA Space Apps Challenge – Turin',
    role: 'Lead Developer & Data Scientist',
    duration: '6 weeks',
    tags: ['Machine Learning', 'Python', 'Data Science', 'Predictive Analytics', 'Agriculture Tech'],
  
    heroTagline: 'Turning data into actionable insights for farmers',

    challenge: 'Farmers often struggle to predict pest outbreaks, leading to crop damage and financial loss. The NASA Space Apps Challenge asked us to build a solution that could provide actionable, data-driven predictions locally in Turin, with the potential for broader adoption.',

    solution: 'We built a machine learning platform that analyzes historical crop and pest data to predict outbreaks before they happen. The platform includes a dashboard for farmers, visualizing risk levels, recommended actions, and real-time alerts. Our solution was designed to be scalable, reliable, and easy to use in real-world agricultural settings.',
  
    gallery: [
      { url: '/images/projects/one.webp', caption: 'Predictive Dashboard for Farmers' },
      { url: '/images/projects/four.webp', caption: 'Incubation Opportunity at i3p' },
      { url: '/images/projects/three.webp', caption: 'Team Presentation at NASA Space Apps Challenge' },
      { url: '/images/projects/two.webp', caption: 'Local Testing with Farms in Turin' },
    ],
  
    metrics: [
      { label: 'Hackathon Ranking', value: '2nd Place', description: 'NASA Space Apps Challenge – Turin' },
      { label: 'Incubation', value: 'i3p', description: 'Awarded a free incubation slot for further development' },
      { label: 'Approach', value: 'ML forecasting', description: 'Predicts outbreaks from historical crop and pest data' },
      { label: 'Output', value: 'Risk dashboard', description: 'Risk levels, recommended actions, and alerts for farmers' },
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

export function getNextProject(currentId: number): ProjectData | undefined {
  const currentIndex = projects.findIndex(p => p.id === currentId);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}
