import { getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Iftekhar Anwar`,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} | Iftekhar Anwar`,
      description: project.heroTagline,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Iftekhar Anwar`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
