import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Clients } from '@/components/Clients';
import { Services } from '@/components/Services';
import { Work } from '@/components/Work';
import { Process } from '@/components/Process';
import { LightUp } from '@/components/LightUp';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { getProjects } from '@/lib/sanity';

export const revalidate = 60;

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Work projects={projects} />
        <Process />
        <LightUp />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
