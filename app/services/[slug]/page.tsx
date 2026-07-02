import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ServiceDetail } from '@/components/ServiceDetail';
import { SERVICES_DETAIL, getService } from '@/lib/servicesData';

export function generateStaticParams() {
  return SERVICES_DETAIL.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const title = `${service.name.en}, ${service.kicker.en}`;
  const description = service.lead.en;
  const url = `https://sparkdigital.agency/services/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Spark Digital Agency`,
      description,
      url,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <>
      <Nav />
      <main>
        <ServiceDetail service={service} />
      </main>
      <Footer />
    </>
  );
}
