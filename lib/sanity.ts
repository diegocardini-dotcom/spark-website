import { createClient, type ClientConfig } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-01';

const config: ClientConfig = {
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
};

// Only a real client if we actually have a projectId — otherwise this
// stays unused and getProjects() below returns [] without ever touching it.
export const sanity = createClient(config);

const builder = imageUrlBuilder(sanity);
export const urlFor = (src: SanityImageSource) => builder.image(src);

/* ---------- Types ---------- */
export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  client: string;
  summary: string;
  services: string[];          // e.g. ['pipeline','autopilot']
  cover: SanityImageSource;
  year?: number;
  url?: string;
  order?: number;
};

/* ---------- Queries ---------- */
export const PROJECTS_QUERY = /* groq */ `
  *[_type == "project"] | order(coalesce(order, 999) asc, _createdAt desc) {
    _id,
    title,
    slug,
    client,
    summary,
    services,
    cover,
    year,
    url,
    order
  }
`;

export async function getProjects(): Promise<Project[]> {
  if (!projectId) return [];
  try {
    return await sanity.fetch<Project[]>(PROJECTS_QUERY, {}, { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}
