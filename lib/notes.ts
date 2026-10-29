import fs from 'node:fs';
import path from 'node:path';

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  lang: 'en' | 'bn';
  draft: boolean;
  readingTimeMinutes: number;
};

export type Note = NoteMeta & {
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), 'content', 'notes');

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    const rawVal = trimmed.slice(colonIdx + 1).trim();

    if (rawVal === 'true') {
      data[key] = true;
    } else if (rawVal === 'false') {
      data[key] = false;
    } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
      const inner = rawVal.slice(1, -1).trim();
      data[key] = inner
        ? inner
            .split(',')
            .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
            .filter(Boolean)
        : [];
    } else {
      data[key] = rawVal.replace(/^['"]|['"]$/g, '');
    }
  }

  return { data, content };
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllNotes(includeDrafts = false): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  const files = fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  const now = new Date();
  const notes: Note[] = [];

  for (const file of files) {
    if (!includeDrafts && file.startsWith('_')) continue;
    const slug = file.replace(/\.(mdx|md)$/, '');
    const fullPath = path.join(NOTES_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = parseFrontmatter(raw);

    const draft = Boolean(data.draft);
    const dateStr = typeof data.date === 'string' ? data.date : '';
    const parsedDate = dateStr ? new Date(dateStr) : null;
    const isFuture = parsedDate ? parsedDate.getTime() > now.getTime() : false;

    if (!includeDrafts && (draft || isFuture || !dateStr || !data.title)) {
      continue;
    }

    notes.push({
      slug,
      title: String(data.title ?? slug),
      date: dateStr,
      summary: String(data.summary ?? ''),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      lang: data.lang === 'bn' ? 'bn' : 'en',
      draft,
      readingTimeMinutes: estimateReadingTime(content),
      content,
    });
  }

  return notes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPublishedNotes(): NoteMeta[] {
  return getAllNotes(false).map(({ content: _content, ...meta }) => meta);
}

export function getNoteBySlug(slug: string): Note | null {
  const notes = getAllNotes(false);
  return notes.find((n) => n.slug === slug) ?? null;
}
