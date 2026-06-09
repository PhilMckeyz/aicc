export interface NewsItem {
  id: string;
  headline: string;
  category: 'Models' | 'Agents' | 'Research' | 'Robotics' | 'Enterprise' | 'Startups';
  timestamp: string; // ISO string or relative time
  source: string;
  importanceScore: number; // 0 to 1
  impactAnalysis: string;
}

export interface CompanyWatchlistItem {
  id: string;
  name: string;
  category: string;
  description: string;
  momentumScore: number; // 0 to 100
  weeklyTrend: 'up' | 'down' | 'steady';
  statusIndicator: 'active' | 'deploying' | 'monitoring' | 'restricted';
  sparklineData: number[]; // 7 points for a week
  ceo: string;
  marketValuation: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  institution: string;
  summary: string;
  difficultyScore: number; // 1 to 5
  impactScore: number; // 1 to 5
  arxivId: string;
  primaryAuthor: string;
}

export interface AIProduct {
  id: string;
  rank: number;
  product: string;
  category: string;
  growth: number; // e.g., 420 for 420%
  buzzScore: number; // 0 to 100
  creators: string;
}

export interface AIStartup {
  id: string;
  name: string;
  category: string;
  funding: string; // e.g. "$125M"
  fundingValue: number; // numeric in millions for computations
  watchScore: number; // 0 to 100
  trend: 'up' | 'down' | 'stable';
  miniFundingHistory: number[]; // 4 points
  leadInvestors: string[];
}

export interface OSRepo {
  id: string;
  name: string;
  starsGained: string;
  starsNumeric: number;
  contributors: number;
  momentum: number; // percentage growth or score
  activityGrid: number[]; // 12 points for git-like activity
}

export interface MediaPodcastItem {
  id: string;
  thumbnailUrl: string;
  title: string;
  speaker: string;
  duration: string;
  summary: string;
  source: string;
}

export interface CommandSuggestion {
  text: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'analyst';
  text: string;
  timestamp: string;
  report?: IntelligenceReport;
}

export interface IntelligenceReport {
  title: string;
  sections: {
    heading: string;
    bullets: string[];
    metrics?: { label: string; value: string; positive?: boolean }[];
  }[];
  insights: string[];
}

export interface CardVisibility {
  marketPulse: boolean;
  newsFeed: boolean;
  watchlist: boolean;
  researchRadar: boolean;
  leaderboard: boolean;
  startups: boolean;
  oss: boolean;
  media: boolean;
}

