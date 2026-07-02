import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ProjectDetail } from '@/components/ProjectDetail';

export const revalidate = 60;

export function generateStaticParams() {
  return FALLBACK_PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = FALLBACK_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: 'Project not found' };
  const title = `${project.title}, ${project.client}`;
  const description = project.summary.en;
  const url = `https://sparkdigital.agency/work/${project.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Spark Digital Agency`,
      description,
      url,
      type: 'article',
      images: project.heroImage ? [{ url: project.heroImage }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function WorkSlugPage({ params }: { params: { slug: string } }) {
  const project = FALLBACK_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  // Find next project for the "Next project" footer
  const idx = FALLBACK_PROJECTS.indexOf(project);
  const next = FALLBACK_PROJECTS[(idx + 1) % FALLBACK_PROJECTS.length];

  return (
    <>
      <Nav />
      <main>
        <ProjectDetail project={project} next={next} />
      </main>
      <Footer />
    </>
  );
}
