export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };

  // Detail page content
  content: {
    intro: string;
    sections: {
      heading: string;
      content: string;
      image?: string;
    }[];
    conclusion: string;
  };

  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: 'what-i-figure-out-before-writing-code',
      title: 'What I Figure Out Before I Open VS Code',
      excerpt: 'Building doesn’t start with code. It starts with clarity about the problem, the user, and what actually matters.',
      category: 'Product',
      date: '2025-01-18',
      readTime: '7 min read',
      coverImage: '/images/blog/blog-01-cover.HEIC',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpeg',
      },
      featured: true,
    
      content: {
        intro: 'Most people think building starts with code. For me, it rarely does. Before I write a single line, I spend time understanding the problem, the person facing it, and whether the solution is even worth building. Over time, I’ve learned that most failed products don’t fail because of bad code — they fail because they solve the wrong thing.',
    
        sections: [
          {
            heading: 'Start With the Real Problem',
            content: 'The first version of the problem is usually wrong. What looks like a technical issue is often a workflow, trust, or usability problem. I try to explain the problem in one simple sentence, without technical language. If I can\'t do that, I\'m not ready to build.',
            image: '/images/blog/blog-01-section-1.png',
          },
          {
            heading: 'Think About One Real Person',
            content: '"Users" is too abstract. I imagine one specific person and one real situation. What are they trying to do? What frustrates them? What do they do today instead? If I can\'t picture a real scenario, I pause — building without this clarity usually leads to features nobody truly needs.',
            image: '/images/blog/blog-01-section-2.jpg',
          },
          {
            heading: 'Ask If the Problem Is Painful Enough',
            content: 'I always ask myself: what happens if this doesn’t exist? If the answer is “nothing really changes,” then the problem might be interesting, but not important. I’m not chasing clever ideas — I’m chasing usefulness.',
          },
          {
            heading: 'Define the Smallest Useful Version',
            content: 'I actively try to build less. Constraints force clarity. The first version should feel simple and slightly uncomfortable. If the core value doesn’t work at this stage, adding more features won’t save it.',
            image: '/images/blog/blog-01-section-3.png',
          },
          {
            heading: 'Decide What Not to Build',
            content: 'Every “yes” hides multiple “no’s”. I explicitly write down what I’m not building yet — no dashboard, no automation, no extra layers. This keeps the product focused and prevents turning an idea into a bloated platform too early.',
          },
          {
            heading: 'Only Then Do I Think About Code',
            content: 'Frameworks and tools come last. Once the product shape is clear, technical decisions become easier and more honest. The goal isn’t to use the newest stack — it’s to build something that works and can grow.',
          },
        ],
    
        conclusion: 'Writing code feels productive. Thinking feels slow. But almost every time I’ve skipped the thinking part, I’ve paid for it later. Good code matters — but good judgment matters first.',
      },
    
      tags: ['Product Thinking', 'Engineering', 'Startups', 'Building'],
    },

    {
      id: 2,
      slug: 'why-hackathon-projects-dont-survive',
      title: 'Why Most Hackathon Projects Don’t Survive the Real World',
      excerpt: 'Winning a hackathon feels great. Turning that idea into a real product is a completely different game.',
      category: 'Startups',
      date: '2025-01-20',
      readTime: '8 min read',
      coverImage: '/images/blog/blog-02-cover.jpg',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpeg',
      },
      featured: true,
    
      content: {
        intro: 'Hackathons are intense, creative, and addictive. In a short amount of time, ideas turn into demos, and demos turn into applause. I’ve been there — and I’ve won. But once the excitement fades, most hackathon projects quietly disappear. Not because they’re bad ideas, but because the rules of the real world are very different.',
    
        sections: [
          {
            heading: 'Hackathons Optimize for Speed, Not Longevity',
            content: 'Hackathons reward fast execution, clever demos, and storytelling. Real products reward patience, reliability, and boring consistency. In a hackathon, it’s fine if something works once. In the real world, it has to work every day.',
            image: '/images/blog/blog-02-section-1.jpg',
          },
          {
            heading: 'Judges Are Not Real Users',
            content: 'Judges evaluate vision, novelty, and technical ambition. Real users care about trust, simplicity, and whether the product fits into their daily routine. Many hackathon ideas impress a panel but confuse the people they’re meant to help.',
            image: '/images/blog/blog-02-section-2.jpg',
          },
          {
            heading: 'Data Is Usually Too Clean',
            content: 'In hackathons, data is often curated, limited, or artificially clean. Real-world data is messy, incomplete, and full of edge cases. Models that look impressive in a demo often struggle the moment reality hits.',
          },
          {
            heading: 'Nobody Owns the Problem After the Event',
            content: 'Once the hackathon ends, incentives disappear. Team members move on, priorities shift, and the problem loses an owner. Real products survive because someone stays obsessed with the problem long after the applause is gone.',
            image: '/images/blog/blog-02-section-3.jpg',
          },
          {
            heading: 'What I’d Do Differently Now',
            content: 'If I were to take a hackathon project into the real world, I’d slow down. I’d spend more time with users, reduce scope aggressively, and design for reliability instead of novelty. Winning is nice. Building something that lasts is better.',
          },
        ],
    
        conclusion: 'Hackathons are incredible learning environments. They teach speed, collaboration, and creativity. But surviving the real world requires a different mindset — one focused on trust, consistency, and long-term value. That’s a transition every builder has to consciously make.',
      },
    
      tags: ['Hackathons', 'Product Building', 'Startups', 'Reality Check'],
    },

    {
      id: 3,
      slug: 'ai-is-not-the-product',
      title: 'AI Is Not the Product',
      excerpt: 'Models are getting cheaper and more powerful. That doesn’t automatically make products better.',
      category: 'AI',
      date: '2025-01-22',
      readTime: '7 min read',
      coverImage: '/images/blog/blog-03-cover.jpg',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpeg',
      },
      featured: false,
    
      content: {
        intro: 'AI is everywhere. Every week there’s a new model, a new demo, a new “AI-powered” product. But as the technology becomes more accessible, something interesting happens: AI stops being the differentiator. The product does. And many teams miss that.',
    
        sections: [
          {
            heading: 'The Barrier to Using AI Is Gone',
            content: 'Using a powerful model today is easier than ever. APIs are simple, open-source models are strong, and tooling is mature. This is great — but it also means that “we use AI” is no longer impressive. It’s the baseline.',
            image: '/images/blog/blog-03-section-1.jpg',
          },
          {
            heading: 'AI Doesn’t Automatically Create Value',
            content: 'A model can be accurate and still useless. Value comes from how AI fits into a workflow, how understandable the output is, and whether users trust it enough to act on it. Without that, AI becomes a feature looking for a problem.',
            image: '/images/blog/blog-03-section-2.jpg',
          },
          {
            heading: 'Most Problems Are Not Model Problems',
            content: 'In many projects, the hardest parts aren’t training or inference. They’re data quality, edge cases, UX, and feedback loops. Improving these often creates more impact than switching to a more advanced model.',
          },
          {
            heading: 'Good AI Products Feel Boring',
            content: 'The best AI products don’t feel magical — they feel reliable. They reduce friction, save time, and quietly become part of someone’s routine. If users forget there’s AI behind it, that’s usually a good sign.',
            image: '/images/blog/blog-03-section-3.jpg',
          },
          {
            heading: 'Where AI Actually Shines',
            content: 'AI works best when it augments human decision-making, not replaces it. Suggest, filter, predict, highlight — then let humans stay in control. This builds trust and leads to better long-term adoption.',
          },
        ],
    
        conclusion: 'Models will keep improving. Costs will keep dropping. The real challenge won’t be accessing AI — it will be using it with taste and judgment. In the long run, products that win won’t be the most “AI-powered”, but the most thoughtfully designed.',
      },
    
      tags: ['AI', 'Product Design', 'Machine Learning', 'Judgment'],
    },

    {
      id: 4,
      slug: 'what-university-doesnt-teach-engineers',
      title: 'What University Doesn’t Teach Engineers',
      excerpt: 'University teaches you how to solve problems. It rarely teaches you which problems are worth solving.',
      category: 'Education',
      date: '2025-01-24',
      readTime: '8 min read',
      coverImage: '/images/blog/blog-04-cover.jpg',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpg',
      },
      featured: false,
    
      content: {
        intro: 'I’m grateful for university. It taught me how to think logically, break down complex problems, and stay disciplined. But over time, I realized something: being a good engineering student doesn’t automatically make you a good engineer. There are important skills that rarely show up in lectures or exams.',
    
        sections: [
          {
            heading: 'Real Problems Are Messy',
            content: 'In university, problems are well-defined. Inputs are clean, constraints are clear, and there’s usually a correct answer. Real-world problems are nothing like that. They’re ambiguous, incomplete, and constantly changing. Learning to operate in that uncertainty takes practice — not grades.',
            image: '/images/blog/blog-04-section-1.jpg',
          },
          {
            heading: 'Ownership Is Rarely Taught',
            content: 'Most assignments end when you submit them. In real projects, the work continues after the first version. Bugs, feedback, edge cases, and responsibility don’t disappear. Learning to truly own something — and care about its outcome — is a skill developed outside the classroom.',
          },
          {
            heading: 'Communication Matters More Than You Expect',
            content: 'Being right isn’t enough. You need to explain trade-offs, justify decisions, and align with people who don’t share your technical background. University focuses heavily on correctness, but rarely on clarity.',
            image: '/images/blog/blog-04-section-2.jpg',
          },
          {
            heading: 'Speed vs. Impact',
            content: 'Exams reward speed and coverage. Real work rewards impact. Spending more time on the right problem often matters more than solving many small ones quickly. This shift in mindset took me longer than I expected.',
          },
          {
            heading: 'Learning Doesn’t Stop at the Syllabus',
            content: 'The most valuable things I’ve learned came from building, failing, collaborating, and shipping projects that weren’t graded. Hackathons, side projects, and early startup experiences filled gaps that lectures never touched.',
            image: '/images/blog/blog-04-section-3.jpg',
          },
        ],
    
        conclusion: 'University builds strong foundations. But becoming a good engineer requires stepping beyond them. The sooner you start building things that matter to real people, the faster those missing lessons begin to appear.',
      },
    
      tags: ['Engineering', 'University', 'Learning', 'Growth'],
    },

    {
      id: 5,
      slug: 'open-source-as-a-business-mindset',
      title: 'Open Source as a Business Mindset',
      excerpt: 'Open source isn’t just about free code. It’s about trust, adoption, and long-term thinking.',
      category: 'Open Source',
      date: '2025-01-26',
      readTime: '7 min read',
      coverImage: '/images/blog/blog-05-cover.jpg',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpeg',
      },
      featured: false,
    
      content: {
        intro: 'When people hear “open source,” they often think about free code or community-driven development. I see it differently. For me, open source is a mindset — one that prioritizes trust, transparency, and adoption over short-term control.',
    
        sections: [
          {
            heading: 'Trust Is the Real Currency',
            content: 'In many products, especially in data-heavy or AI-driven ones, users are asked to trust systems they don’t fully understand. Open source lowers that barrier. People can inspect, question, and verify what’s happening under the hood.',
            image: '/images/blog/blog-05-section-1.jpg',
          },
          {
            heading: 'Adoption Comes Before Monetization',
            content: 'It’s tempting to lock things down early. But many successful products focused first on becoming useful and widely adopted. Open source helps remove friction, encourages experimentation, and builds communities that grow organically.',
          },
          {
            heading: 'Open Doesn’t Mean Unstructured',
            content: 'Open source isn’t the absence of direction. The strongest projects still have clear ownership, vision, and decision-making. Openness works best when combined with strong product judgment.',
            image: '/images/blog/blog-05-section-2.jpg',
          },
          {
            heading: 'Where Open Source Works Best',
            content: 'Open source shines in foundational tools, developer platforms, and systems where trust and extensibility matter. It’s not the answer to everything, but when used intentionally, it can be a powerful advantage.',
          },
          {
            heading: 'Thinking Long-Term',
            content: 'Choosing open source often means slower monetization but stronger foundations. It forces you to think about sustainability, community, and real value — not just short-term revenue.',
            image: '/images/blog/blog-05-section-3.jpg',
          },
        ],
    
        conclusion: 'Open source isn’t about giving everything away. It’s about building trust first and value second. When done right, it aligns incentives between builders and users — and creates products that last.',
      },
    
      tags: ['Open Source', 'Business', 'Trust', 'Strategy'],
    },

    {
      id: 6,
      slug: 'building-while-still-a-student',
      title: 'Building While I’m Still a Student',
      excerpt: 'I don’t have everything figured out. I’m still building anyway.',
      category: 'Personal',
      date: '2025-01-28',
      readTime: '6 min read',
      coverImage: '/images/blog/blog-06-cover.jpg',
      author: {
        name: 'Iftekhar Anwar',
        avatar: '/images/blog/author-avatar.jpeg',
      },
      featured: false,
    
      content: {
        intro: 'I’m still a student. I’m still learning, making mistakes, and changing my mind. For a long time, I thought I needed to “know more” before building things seriously. Over time, I realized that waiting for certainty only delays growth.',
    
        sections: [
          {
            heading: 'Not Feeling Ready Is Normal',
            content: 'There’s always a reason to wait — another course, another tutorial, another idea to refine. But readiness rarely arrives on its own. Most clarity comes from doing, not preparing.',
            image: '/images/blog/blog-06-section-1.jpg',
          },
          {
            heading: 'Balancing Classes and Curiosity',
            content: 'University demands structure. Building demands exploration. Balancing the two isn’t easy, and I don’t always get it right. But working on projects outside exams has taught me lessons I wouldn’t trade for perfect grades.',
          },
          {
            heading: 'Failure Is Part of the Process',
            content: 'Most things I build won’t last. Some ideas don’t work. Some projects stall. That used to feel discouraging. Now, I see it as progress — each attempt sharpens my judgment and lowers the fear of trying again.',
            image: '/images/blog/blog-06-section-2.jpg',
          },
          {
            heading: 'Why I Keep Building Anyway',
            content: 'Building helps me understand what I enjoy, what I’m good at, and what I want to get better at. It turns abstract interests into concrete skills and vague ambitions into real direction.',
          },
          {
            heading: 'Thinking Long-Term',
            content: 'I’m not trying to rush the outcome. I’m trying to compound learning. Small projects, honest reflection, and consistent effort feel like the right strategy at this stage.',
            image: '/images/blog/blog-06-section-3.jpg',
          },
        ],
    
        conclusion: 'I don’t have everything figured out — and that’s okay. Building while still a student isn’t about pretending to be an expert. It’s about staying curious, taking responsibility, and learning in public.',
      },
    
      tags: ['Students', 'Building', 'Learning', 'Personal Growth'],
    },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}
