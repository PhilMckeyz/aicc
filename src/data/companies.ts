import { CompanyWatchlistItem, AIProduct, OSRepo } from '../types';

export const watchlistCompanies: CompanyWatchlistItem[] = [
  {
    id: "co-01",
    name: "OpenAI",
    category: "Foundation Models",
    description: "Creators of ChatGPT, GPT-4o, and the 'o1/o3' multi-step reasoning models.",
    momentumScore: 98.4,
    weeklyTrend: "up",
    statusIndicator: "active",
    sparklineData: [92, 94, 93, 95, 96, 98, 98.4],
    ceo: "Sam Altman",
    marketValuation: "$157B"
  },
  {
    id: "co-02",
    name: "Anthropic",
    category: "Alignment Tech & Models",
    description: "Developers of the Claude model family and advanced capability alignment.",
    momentumScore: 94.6,
    weeklyTrend: "up",
    statusIndicator: "deploying",
    sparklineData: [88, 89, 91, 90, 93, 93.5, 94.6],
    ceo: "Dario Amodei",
    marketValuation: "$40B"
  },
  {
    id: "co-03",
    name: "Google DeepMind",
    category: "General Intelligence",
    description: "Pioneers of Gemini, AlphaFold, AlphaGo, and deep reinforcement research.",
    momentumScore: 93.2,
    weeklyTrend: "steady",
    statusIndicator: "active",
    sparklineData: [92, 92.5, 93, 93, 92.8, 93, 93.2],
    ceo: "Demis Hassabis",
    marketValuation: "Sovereign Division"
  },
  {
    id: "co-04",
    name: "Meta AI",
    category: "Open-Weights Models",
    description: "Engineers of the Llama open framework and PyTorch engineering arrays.",
    momentumScore: 91.5,
    weeklyTrend: "up",
    statusIndicator: "monitoring",
    sparklineData: [85, 87, 86, 89, 90, 91, 91.5],
    ceo: "Mark Zuckerberg",
    marketValuation: "Sovereign Division"
  },
  {
    id: "co-05",
    name: "xAI",
    category: "Scale Supercomputing",
    description: "Makers of Grok AI integrated with scale GPU supercompute clusters.",
    momentumScore: 89.1,
    weeklyTrend: "up",
    statusIndicator: "active",
    sparklineData: [78, 80, 82, 85, 86, 88, 89.1],
    ceo: "Elon Musk",
    marketValuation: "$50B"
  },
  {
    id: "co-06",
    name: "Perplexity AI",
    category: "Search & Synthesis",
    description: "Producers of the conversational answer search and crawling engine.",
    momentumScore: 92.0,
    weeklyTrend: "up",
    statusIndicator: "active",
    sparklineData: [85, 86, 88, 89, 90, 91, 92.0],
    ceo: "Aravind Srinivas",
    marketValuation: "$9B"
  },
  {
    id: "co-07",
    name: "Mistral AI",
    category: "European Sovereign AI",
    description: "Developers of high-efficiency open models like Mistral Large and Codestral.",
    momentumScore: 85.4,
    weeklyTrend: "steady",
    statusIndicator: "monitoring",
    sparklineData: [84, 85, 85, 85.2, 84.8, 85.3, 85.4],
    ceo: "Arthur Mensch",
    marketValuation: "$6.2B"
  },
  {
    id: "co-08",
    name: "Cohere",
    category: "Enterprise Workloads",
    description: "Providers of custom multilingual embedding arrays and enterprise agent bases.",
    momentumScore: 82.8,
    weeklyTrend: "down",
    statusIndicator: "monitoring",
    sparklineData: [85, 84, 83.5, 83, 82.9, 82.5, 82.8],
    ceo: "Aidan Gomez",
    marketValuation: "$5.5B"
  },
  {
    id: "co-09",
    name: "Scale AI",
    category: "Data Engineering",
    description: "The data annotation backend serving synthetic training structures.",
    momentumScore: 95.1,
    weeklyTrend: "up",
    statusIndicator: "active",
    sparklineData: [90, 91, 92.5, 93, 94.2, 94.8, 95.1],
    ceo: "Alexandr Wang",
    marketValuation: "$14B"
  },
  {
    id: "co-10",
    name: "Hugging Face",
    category: "Open Collaboration",
    description: "The global library repository hosting open weights, datasets, and spaces.",
    momentumScore: 88.7,
    weeklyTrend: "steady",
    statusIndicator: "active",
    sparklineData: [88, 88.5, 88.6, 88.7, 88.7, 88.6, 88.7],
    ceo: "Clément Delangue",
    marketValuation: "$4.5B"
  }
];

export const productLeaderboard: AIProduct[] = [
  { id: "p-01", rank: 1, product: "Vercel v0", category: "UI Code Generation", growth: 420, buzzScore: 99, creators: "Vercel" },
  { id: "p-02", rank: 2, product: "Cursor Composer", category: "Agentic IDE Editing", growth: 312, buzzScore: 98, creators: "Anysphere" },
  { id: "p-03", rank: 3, product: "ChatGPT Plus (o1/o3)", category: "Reasoning Assistant", growth: 195, buzzScore: 96, creators: "OpenAI" },
  { id: "p-04", rank: 4, product: "Perplexity Pro", category: "Intent Search Engine", growth: 168, buzzScore: 94, creators: "Perplexity AI" },
  { id: "p-05", rank: 5, product: "Claude Projects", category: "Context Workspaces", growth: 154, buzzScore: 95, creators: "Anthropic" },
  { id: "p-06", rank: 6, product: "Midjourney v6", category: "High Fidelity Graphics", growth: 120, buzzScore: 91, creators: "Midjourney" },
  { id: "p-07", rank: 7, product: "Bolt.new", category: "Direct Sandbox Hosting", growth: 290, buzzScore: 93, creators: "StackBlitz" },
  { id: "p-08", rank: 8, product: "ElevenLabs Reader", category: "Ultra-low Latency Speech", growth: 185, buzzScore: 89, creators: "ElevenLabs" },
  { id: "p-09", rank: 9, product: "NotebookLM", category: "Source Dynamic Podcasting", growth: 340, buzzScore: 92, creators: "Google" },
  { id: "p-10", rank: 10, product: "Phind", category: "Developer Search Arrays", growth: 89, buzzScore: 82, creators: "Phind Team" },
  { id: "p-11", rank: 11, product: "Suno v4", category: "Generative Audio Trackers", growth: 145, buzzScore: 88, creators: "Suno AI" },
  { id: "p-12", rank: 12, product: "ComfyUI Cloud", category: "Visual Node Graph Tooling", growth: 210, buzzScore: 90, creators: "Comfy Org" },
  { id: "p-13", rank: 13, product: "Udio Beta", category: "High Quality Vocal Synthesis", growth: 140, buzzScore: 85, creators: "Udio AI" },
  { id: "p-14", rank: 14, product: "Linear Agent", category: "Auto Issue Backlog Managers", growth: 220, buzzScore: 87, creators: "Linear" },
  { id: "p-15", rank: 15, product: "Luma Dream Machine", category: "Dynamic Cinematic Video", growth: 175, buzzScore: 86, creators: "Luma Labs" },
  { id: "p-16", rank: 16, product: "Runway Gen-3", category: "Generative Film Arrays", growth: 115, buzzScore: 85, creators: "Runway" }
];

export const ossRepos: OSRepo[] = [
  {
    id: "oss-01",
    name: "meta-llama / llama3",
    starsGained: "+4.2K this week",
    starsNumeric: 67200,
    contributors: 540,
    momentum: 94,
    activityGrid: [12, 18, 32, 45, 52, 60, 48, 65, 80, 85, 94, 98]
  },
  {
    id: "oss-02",
    name: "vllm-project / vllm",
    starsGained: "+2.8K this week",
    starsNumeric: 29400,
    contributors: 382,
    momentum: 91,
    activityGrid: [40, 42, 48, 55, 62, 60, 72, 85, 78, 88, 91, 92]
  },
  {
    id: "oss-03",
    name: "langchain-ai / langchain",
    starsGained: "+1.9K this week",
    starsNumeric: 93400,
    contributors: 2240,
    momentum: 82,
    activityGrid: [95, 92, 88, 90, 86, 84, 82, 85, 87, 83, 82, 81]
  },
  {
    id: "oss-04",
    name: "crewAIInc / crewAI",
    starsGained: "+3.5K this week",
    starsNumeric: 19800,
    contributors: 148,
    momentum: 96,
    activityGrid: [8, 15, 22, 35, 48, 56, 70, 78, 85, 92, 95, 98]
  },
  {
    id: "oss-05",
    name: "google / gemma-pytorch",
    starsGained: "+1.5K this week",
    starsNumeric: 15400,
    contributors: 86,
    momentum: 85,
    activityGrid: [30, 32, 35, 38, 42, 48, 40, 52, 60, 68, 70, 72]
  },
  {
    id: "oss-06",
    name: "stanfordnlp / dspy",
    starsGained: "+2.1K this week",
    starsNumeric: 18400,
    contributors: 134,
    momentum: 90,
    activityGrid: [10, 18, 25, 32, 45, 52, 58, 64, 72, 80, 84, 88]
  },
  {
    id: "oss-07",
    name: "ollama / ollama",
    starsGained: "+3.1K this week",
    starsNumeric: 78500,
    contributors: 412,
    momentum: 93,
    activityGrid: [60, 64, 70, 76, 82, 88, 85, 90, 94, 96, 95, 98]
  },
  {
    id: "oss-08",
    name: "comfyanonymous / ComfyUI",
    starsGained: "+2.4K this week",
    starsNumeric: 44200,
    contributors: 620,
    momentum: 88,
    activityGrid: [48, 50, 52, 58, 62, 60, 68, 72, 75, 82, 84, 86]
  }
];
