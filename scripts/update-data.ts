import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load env variables from local environment configuration files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Initialize the Google Gen AI SDK
// The SDK will automatically use process.env.GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("CRITICAL: GEMINI_API_KEY environment variable is not set.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Helper to fetch stocks from Yahoo Finance (free public endpoint)
async function fetchStockData(symbol: string) {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=7d`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Yahoo Finance API returned status ${res.status} for ${symbol}`);
      return null;
    }
    const data = (await res.json()) as any;
    const result = data.chart?.result?.[0];
    if (!result) return null;
    
    const price = result.meta?.regularMarketPrice;
    const previousClose = result.meta?.previousClose;
    const closes = result.indicators?.quote?.[0]?.close?.filter((c: any) => typeof c === 'number') || [];
    
    return {
      symbol,
      price,
      previousClose,
      changePercent: previousClose ? ((price - previousClose) / previousClose) * 100 : 0,
      closes
    };
  } catch (e) {
    console.error(`Failed to fetch stock data for ${symbol}:`, e);
    return null;
  }
}

// Helper to fetch trending tech stories from Hacker News
async function fetchHackerNews() {
  try {
    const res = await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI&hitsPerPage=20');
    if (!res.ok) return [];
    const data = (await res.json()) as any;
    return data.hits.map((hit: any) => ({
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      author: hit.author,
      points: hit.points,
      createdAt: hit.created_at
    }));
  } catch (e) {
    console.error("Failed to fetch Hacker News:", e);
    return [];
  }
}

// Helper to fetch latest AI research from arXiv
async function fetchArxiv() {
  try {
    const res = await fetch('http://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.CL+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=15');
    if (!res.ok) return [];
    const xml = await res.text();
    
    const entries: any[] = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;
    while ((match = entryRegex.exec(xml)) !== null) {
      const entryContent = match[1];
      const idMatch = entryContent.match(/<id>([^<]+)<\/id>/);
      const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
      const summaryMatch = entryContent.match(/<summary>([^<]+)<\/summary>/);
      const authorMatch = entryContent.match(/<author>\s*<name>([^<]+)<\/name>/);
      
      const arxivId = idMatch ? idMatch[1].split('/abs/')[1]?.split('v')[0] || '' : '';
      const title = titleMatch ? titleMatch[1].replace(/\n/g, ' ').trim() : '';
      const summary = summaryMatch ? summaryMatch[1].replace(/\n/g, ' ').trim() : '';
      const author = authorMatch ? authorMatch[1].trim() : 'Unknown';
      
      if (title) {
        entries.push({ arxivId, title, summary, primaryAuthor: author });
      }
    }
    return entries;
  } catch (e) {
    console.error("Failed to fetch arXiv:", e);
    return [];
  }
}

// Helper to fetch trending GitHub repositories
async function fetchGithubRepos() {
  try {
    const query = 'stars:>2000 topic:artificial-intelligence';
    const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc`, {
      headers: {
        'User-Agent': 'Node-Fetch-Script',
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}`);
      return [];
    }
    const data = (await res.json()) as any;
    return (data.items || []).slice(0, 10).map((item: any) => ({
      name: item.full_name,
      description: item.description,
      stars: item.stargazers_count,
      forks: item.forks_count,
      url: item.html_url
    }));
  } catch (e) {
    console.error("Failed to fetch GitHub repos:", e);
    return [];
  }
}

async function main() {
  console.log("🚀 Initializing daily AI telemetry pull...");

  // 1. Fetch data in parallel from free public sources
  const [stocks, hnStories, arxivPapers, githubRepos] = await Promise.all([
    Promise.all([
      fetchStockData('NVDA'),
      fetchStockData('MSFT'),
      fetchStockData('GOOGL'),
      fetchStockData('AAPL'),
      fetchStockData('AMD')
    ]).then(list => list.filter(Boolean)),
    fetchHackerNews(),
    fetchArxiv(),
    fetchGithubRepos()
  ]);

  console.log(`Fetched ${stocks.length} stocks, ${hnStories.length} HN stories, ${arxivPapers.length} arXiv papers, ${githubRepos.length} GitHub repos.`);

  // 2. Format context payload for Gemini
  const context = {
    stocks,
    hnStories,
    arxivPapers: arxivPapers.map(p => ({ arxivId: p.arxivId, title: p.title, primaryAuthor: p.primaryAuthor, summary: p.summary.slice(0, 300) + '...' })),
    githubRepos
  };

  console.log("🧠 Invoking Gemini for intelligent synthesis...");

  const prompt = `
You are an expert AI market analyst and data compiler. Your task is to process real-world scraped data feeds and output structured JSON matching our dashboard datasets.
Here is the real-world raw feed data:
${JSON.stringify(context, null, 2)}

You must synthesize this data and produce a SINGLE JSON object containing arrays for our 8 sections. Follow these schema guidelines:

1. "news": Array of NewsItem objects. Max 15 items. Map real stories from Hacker News (using their URLs) or synthesize recent news.
   Interface:
   export interface NewsItem {
     id: string; // prefix e.g., 'news-01'
     headline: string;
     category: 'Models' | 'Agents' | 'Research' | 'Robotics' | 'Enterprise' | 'Startups';
     timestamp: string; // e.g., '10 mins ago' or '2 hrs ago'
     source: string; // e.g., 'Hacker News', 'TechCrunch'
     importanceScore: number; // 0 to 1
     impactAnalysis: string; // 1-2 sentence technical impact analysis
     url?: string; // Must map the exact URL from the Hacker News story context or related tech news page
   }

2. "watchlist": Array of CompanyWatchlistItem objects. Exactly 10 items.
   Keep top players (OpenAI, Anthropic, Google DeepMind, Meta AI, xAI, Perplexity, Mistral, Cohere, Scale AI, Hugging Face). Update their momentum scores, valuations, status indicators, and write updated description briefs referencing any recent news.
   For NVDA, MSFT, GOOGL, AAPL, AMD stocks, match their current real price details in descriptions.
   Interface:
   export interface CompanyWatchlistItem {
     id: string; // 'co-01' to 'co-10'
     name: string;
     category: string;
     description: string;
     momentumScore: number; // 0 to 100
     weeklyTrend: 'up' | 'down' | 'steady';
     statusIndicator: 'active' | 'deploying' | 'monitoring' | 'restricted';
     sparklineData: number[]; // 7 points, last item should represent their momentum score
     ceo: string;
     marketValuation: string;
   }

3. "research": Array of ResearchPaper objects. Exactly 10 items. Map the parsed arXiv papers. Include authors and IDs. Use Gemini to estimate difficulty (1-5) and impact (1-5).
   Interface:
   export interface ResearchPaper {
     id: string; // 'r-01' to 'r-10'
     title: string;
     institution: string;
     summary: string; // short concise summary
     difficultyScore: number;
     impactScore: number;
     arxivId: string;
     primaryAuthor: string;
   }

4. "products": Array of AIProduct objects. Exactly 16 items. Summarize popular tools (e.g. Cursor, ChatGPT, Claude Projects, v0, Bolt.new, NotebookLM, Suno, Midjourney). Update growth metrics and buzz scores.
   Interface:
   export interface AIProduct {
     id: string; // 'p-01' to 'p-16'
     rank: number; // 1 to 16
     product: string;
     category: string;
     growth: number; // percentage growth e.g., 240
     buzzScore: number; // 0 to 100
     creators: string;
   }

5. "startups": Array of AIStartup objects. Exactly 15 items. Synthesize/update key startups (Cognition AI, Suno AI, Physical Intelligence, Poolside, Pika Labs, CrewAI, Etched, Udio, Cleanlab, etc.).
   Interface:
   export interface AIStartup {
     id: string; // 'st-01' to 'st-15'
     name: string;
     category: string;
     funding: string; // e.g. "$175M" or "$1.2B"
     fundingValue: number; // numeric value in millions, e.g. 175
     watchScore: number; // 0 to 100
     trend: 'up' | 'down' | 'stable';
     miniFundingHistory: number[]; // 4 historical values
     leadInvestors: string[];
   }

6. "repos": Array of OSRepo objects. Exactly 8 items. Map actual top trending repos (like llama3, vllm, langchain, crewAI, ollama, comfyUI, dspy, etc.) with real star counts, stars gained, and git activity grids.
   Interface:
   export interface OSRepo {
     id: string; // 'oss-01' to 'oss-08'
     name: string;
     starsGained: string;
     starsNumeric: number;
     contributors: number;
     momentum: number; // 0 to 100
     activityGrid: number[]; // 12 numbers representing contribution frequency (0 to 100)
   }

7. "podcasts": Array of MediaPodcastItem objects. Exactly 8 items. Synthesize relevant recent tech podcast episodes or video summaries.
   Interface:
   export interface MediaPodcastItem {
     id: string; // 'pod-01' to 'pod-08'
     thumbnailUrl: string; // use valid unsplash urls from the source code or placeholders
     title: string;
     speaker: string;
     duration: string; // e.g. '42:15'
     summary: string;
     source: string; // e.g., 'Lex Fridman Podcast', 'The AI Podcast'
     url?: string; // A URL link to the YouTube video or podcast episode page
   }

Return ONLY a single valid JSON object. Do not include markdown code block formatting in your response. Do not wrap the JSON in \`\`\`json. Return pure JSON text.
`;

  let payload: any;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      attempts++;
      console.log(`🧠 Invoking Gemini for intelligent synthesis (attempt ${attempts}/${maxAttempts})...`);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }

      payload = JSON.parse(text);
      break; // Success, break out of loop
    } catch (err: any) {
      console.warn(`⚠️ Gemini API call attempt ${attempts} failed: ${err.message || err}`);
      if (attempts >= maxAttempts) {
        console.error("CRITICAL: All Gemini API call attempts failed.");
        throw err;
      }
      const delay = attempts * 5000;
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  try {

    // 3. Write data to typescript files
    const dataDir = path.join(process.cwd(), 'src/data');

    // news.ts
    const newsContent = `import { NewsItem } from '../types';

export const mockNews: NewsItem[] = ${JSON.stringify(payload.news, null, 2)};
`;
    fs.writeFileSync(path.join(dataDir, 'news.ts'), newsContent);
    console.log("✓ Updated src/data/news.ts");

    // companies.ts
    const companiesContent = `import { CompanyWatchlistItem, AIProduct, OSRepo } from '../types';

export const watchlistCompanies: CompanyWatchlistItem[] = ${JSON.stringify(payload.watchlist, null, 2)};

export const productLeaderboard: AIProduct[] = ${JSON.stringify(payload.products, null, 2)};

export const ossRepos: OSRepo[] = ${JSON.stringify(payload.repos, null, 2)};
`;
    fs.writeFileSync(path.join(dataDir, 'companies.ts'), companiesContent);
    console.log("✓ Updated src/data/companies.ts");

    // podcasts.ts
    const podcastsContent = `import { MediaPodcastItem } from '../types';

export const mockPodcasts: MediaPodcastItem[] = ${JSON.stringify(payload.podcasts, null, 2)};
`;
    fs.writeFileSync(path.join(dataDir, 'podcasts.ts'), podcastsContent);
    console.log("✓ Updated src/data/podcasts.ts");

    // research.ts
    const researchContent = `import { ResearchPaper } from '../types';

export const mockResearch: ResearchPaper[] = ${JSON.stringify(payload.research, null, 2)};
`;
    fs.writeFileSync(path.join(dataDir, 'research.ts'), researchContent);
    console.log("✓ Updated src/data/research.ts");

    // startups.ts
    const startupsContent = `import { AIStartup } from '../types';

export const mockStartups: AIStartup[] = ${JSON.stringify(payload.startups, null, 2)};
`;
    fs.writeFileSync(path.join(dataDir, 'startups.ts'), startupsContent);
    console.log("✓ Updated src/data/startups.ts");

    console.log("🎉 AI Command Ops Center daily update completed successfully!");

  } catch (error) {
    console.error("CRITICAL ERROR executing daily sync:", error);
    process.exit(1);
  }
}

main();
