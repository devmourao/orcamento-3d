const BLOGGER_BASE = 'https://blog.mourao.info/feeds/posts/default';

function asEntries(entry) {
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

function stripHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseEntry(entry) {
  const html = entry.content?.$t || entry.summary?.$t || '';
  const alternate =
    entry.link?.find((link) => link.rel === 'alternate')?.href || '';
  const thumbnail = entry.media$thumbnail?.url?.replace(
    /\/s\d+(?:-c)?\//,
    '/s800/',
  );

  return {
    id: entry.id?.$t || alternate,
    title: entry.title?.$t?.trim() || 'Untitled',
    content: html,
    summary: (() => {
      const text = stripHtml(html);
      return text.length > 220 ? `${text.slice(0, 220).trim()}…` : text;
    })(),
    published: entry.published?.$t || '',
    updated: entry.updated?.$t || entry.published?.$t || '',
    url: alternate,
    thumbnail,
    author: { name: entry.author?.[0]?.name?.$t || 'Unknown' },
    categories: (entry.category || []).map((c) => c.term).filter(Boolean),
  };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  const params = event.queryStringParameters || {};
  const hub = params.hub || 'maker';
  const type = params.type || 'laboratorio';
  const maxResults = params.max || '50';

  const feedUrl =
    `${BLOGGER_BASE}/-/${encodeURIComponent(hub)}/${encodeURIComponent(type)}` +
    `?alt=json&max-results=${encodeURIComponent(maxResults)}`;

  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Blogger HTTP ${response.status}`);
    }

    const data = await response.json();
    const posts = asEntries(data.feed?.entry).map(parseEntry);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify({
        title: data.feed?.title?.$t || 'Blog Mourão Info',
        subtitle: data.feed?.subtitle?.$t || '',
        updated: data.feed?.updated?.$t || '',
        posts,
      }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        title: 'Blog Mourão Info',
        subtitle: 'Feed unavailable',
        updated: new Date().toISOString(),
        posts: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}
