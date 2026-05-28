const FEEDS = [
  {
    name: 'FluentU Chinese',
    url: 'https://www.fluentu.com/blog/chinese/feed/',
    color: '#e94560',
    icon: '🎬',
  },
  {
    name: 'Ninchanese',
    url: 'https://www.ninchanese.com/blog/feed/',
    color: '#2980b9',
    icon: '🐉',
  },
  {
    name: 'Hacking Chinese',
    url: 'https://www.hackingchinese.com/feed/',
    color: '#27ae60',
    icon: '🧠',
  },
  {
    name: 'Sinosplice',
    url: 'https://www.sinosplice.com/feed',
    color: '#8e44ad',
    icon: '✍️',
  },
];

export interface FeedItem {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  pubDate: string;
  source: string;
  sourceColor: string;
  sourceIcon: string;
}

function parseXML(xml: string, source: typeof FEEDS[0] ): FeedItem[] {
  const items: FeedItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                   block.match(/<title>(.*?)<\/title>/))?.[1]?.trim() ?? '';
    const link  = (block.match(/<link>(.*?)<\/link>/) ||
                   block.match(/<guid[^>]*>(https?:\/\/[^<]+ )<\/guid>/))?.[1]?.trim() ?? '';
    const desc  = (block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                   block.match(/<description>([\s\S]*?)<\/description>/))?.[1] ?? '';
    const date  = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim() ?? '';
    const excerpt = desc
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
    if (title && link) {
      items.push({
        id: link,
        title,
        excerpt: excerpt + (excerpt.length === 160 ? '…' : ''),
        link,
        pubDate: date,
        source: source.name,
        sourceColor: source.color,
        sourceIcon: source.icon,
      });
    }
  }
  return items;
}

async function fetchFeed(source: typeof FEEDS[0]): Promise<FeedItem[]> {
  try {
    const res = await fetch(source.url, { headers: { 'Accept': 'application/rss+xml, application/xml, text/xml' } });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseXML(xml, source);
  } catch {
    return [];
  }
}

// Seeded shuffle — same 10 articles per calendar day
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getDailyFeed(): Promise<FeedItem[]> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const all = results.flat();
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return seededShuffle(all, seed).slice(0, 10);
}
