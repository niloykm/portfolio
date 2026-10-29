import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { getPublishedNotes } from '@/lib/notes';

const BASE_URL = 'https://niloykm.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const notes = getPublishedNotes();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: project.featured ? 0.8 : 0.6,
  }));

  const noteRoutes: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${BASE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...noteRoutes];
}
