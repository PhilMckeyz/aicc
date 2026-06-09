import { CompanyWatchlistItem, AIProduct, OSRepo } from '../types';

export const watchlistCompanies: CompanyWatchlistItem[] = [
  {
    "id": "co-01",
    "name": "OpenAI",
    "category": "Foundation Model",
    "description": "Pioneers of generative AI with ChatGPT and DALL-E. Strategic partnerships, notably with Microsoft (MSFT: $403.66), continue to drive their ecosystem growth and enterprise adoption across various industries.",
    "momentumScore": 96,
    "weeklyTrend": "up",
    "statusIndicator": "active",
    "sparklineData": [
      89,
      99,
      81,
      96,
      84,
      94,
      96
    ],
    "ceo": "Sam Altman",
    "marketValuation": "$80B+"
  },
  {
    "id": "co-02",
    "name": "Anthropic",
    "category": "Foundation Model",
    "description": "Creators of the Claude family of LLMs, known for their focus on safety and constitutional AI. Rapidly expanding enterprise solutions and competing fiercely in the advanced model space.",
    "momentumScore": 86,
    "weeklyTrend": "up",
    "statusIndicator": "active",
    "sparklineData": [
      97,
      84,
      81,
      74,
      99,
      77,
      86
    ],
    "ceo": "Dario Amodei",
    "marketValuation": "$18B+"
  },
  {
    "id": "co-03",
    "name": "Google DeepMind",
    "category": "Research & Models",
    "description": "Google's leading AI research lab, responsible for Gemini models and groundbreaking advancements. Leverages Google's vast compute resources and integrates deeply with services, bolstered by GOOGL's current price of $365.4.",
    "momentumScore": 94,
    "weeklyTrend": "up",
    "statusIndicator": "deploying",
    "sparklineData": [
      91,
      80,
      96,
      80,
      83,
      97,
      94
    ],
    "ceo": "Demis Hassabis",
    "marketValuation": "$2.3T (Google Parent)"
  },
  {
    "id": "co-04",
    "name": "Meta AI",
    "category": "Research & Open Source",
    "description": "Driving innovation in AI research with a strong commitment to open-source models like Llama. Actively integrating AI across Meta's social platforms and metaverse initiatives.",
    "momentumScore": 77,
    "weeklyTrend": "steady",
    "statusIndicator": "active",
    "sparklineData": [
      68,
      86,
      89,
      64,
      86,
      91,
      77
    ],
    "ceo": "Mark Zuckerberg (overall Meta)",
    "marketValuation": "$1.2T (Meta Parent)"
  },
  {
    "id": "co-05",
    "name": "xAI",
    "category": "Foundation Model",
    "description": "Elon Musk's AI venture, developing Grok with a focus on real-time data and unique conversational style. Aiming to understand the true nature of the universe and provide a counterpoint to other leading models.",
    "momentumScore": 72,
    "weeklyTrend": "up",
    "statusIndicator": "deploying",
    "sparklineData": [
      66,
      68,
      79,
      64,
      61,
      79,
      72
    ],
    "ceo": "Elon Musk",
    "marketValuation": "$24B+"
  },
  {
    "id": "co-06",
    "name": "Perplexity AI",
    "category": "Search & Information",
    "description": "Revolutionizing search with conversational AI, offering direct, cited answers rather than links. Gaining significant traction as a more efficient information retrieval tool.",
    "momentumScore": 88,
    "weeklyTrend": "up",
    "statusIndicator": "active",
    "sparklineData": [
      80,
      81,
      94,
      80,
      94,
      84,
      88
    ],
    "ceo": "Aravind Srinivas",
    "marketValuation": "$1B+"
  },
  {
    "id": "co-07",
    "name": "Mistral AI",
    "category": "Foundation Model (Europe)",
    "description": "A leading European AI startup specializing in efficient and powerful open-source models. Rapidly gaining market share for its compact yet highly capable LLMs, often integrated into enterprise solutions.",
    "momentumScore": 91,
    "weeklyTrend": "up",
    "statusIndicator": "active",
    "sparklineData": [
      86,
      96,
      94,
      89,
      82,
      99,
      91
    ],
    "ceo": "Arthur Mensch",
    "marketValuation": "$6B+"
  },
  {
    "id": "co-08",
    "name": "Cohere",
    "category": "Enterprise AI",
    "description": "Focused on enterprise-grade LLMs and retrieval-augmented generation (RAG) for businesses. Providing tools for developers to integrate powerful natural language capabilities into their applications securely.",
    "momentumScore": 76,
    "weeklyTrend": "steady",
    "statusIndicator": "deploying",
    "sparklineData": [
      68,
      62,
      81,
      85,
      71,
      78,
      76
    ],
    "ceo": "Aidan Gomez",
    "marketValuation": "$3B+"
  },
  {
    "id": "co-09",
    "name": "Scale AI",
    "category": "Data & Evaluation",
    "description": "A critical player in the AI ecosystem, providing high-quality data labeling, annotation, and model evaluation services. Essential for training and refining advanced AI systems. Their growth is underpinned by the overall AI boom.",
    "momentumScore": 70,
    "weeklyTrend": "up",
    "statusIndicator": "monitoring",
    "sparklineData": [
      69,
      78,
      69,
      62,
      76,
      70,
      70
    ],
    "ceo": "Alexandr Wang",
    "marketValuation": "$14B+"
  },
  {
    "id": "co-10",
    "name": "Hugging Face",
    "category": "AI Platform & Community",
    "description": "The 'GitHub for Machine Learning,' providing a vast hub for open-source models, datasets, and applications. Crucial for democratizing AI and fostering collaborative development, supported by hardware like NVDA at $206.28 and AMD at $465.22.",
    "momentumScore": 95,
    "weeklyTrend": "up",
    "statusIndicator": "active",
    "sparklineData": [
      97,
      82,
      81,
      94,
      92,
      85,
      95
    ],
    "ceo": "Clément Delangue",
    "marketValuation": "$4.5B+"
  }
];

export const productLeaderboard: AIProduct[] = [
  {
    "id": "p-01",
    "rank": 1,
    "product": "ChatGPT",
    "category": "Conversational AI",
    "growth": 196,
    "buzzScore": 96,
    "creators": "OpenAI"
  },
  {
    "id": "p-02",
    "rank": 2,
    "product": "Claude AI",
    "category": "Conversational AI",
    "growth": 236,
    "buzzScore": 93,
    "creators": "Anthropic"
  },
  {
    "id": "p-03",
    "rank": 3,
    "product": "Midjourney",
    "category": "Image Generation",
    "growth": 476,
    "buzzScore": 96,
    "creators": "Midjourney Inc."
  },
  {
    "id": "p-04",
    "rank": 4,
    "product": "Suno AI",
    "category": "Music Generation",
    "growth": 141,
    "buzzScore": 94,
    "creators": "Suno"
  },
  {
    "id": "p-05",
    "rank": 5,
    "product": "Microsoft Copilot",
    "category": "Productivity AI",
    "growth": 371,
    "buzzScore": 90,
    "creators": "Microsoft"
  },
  {
    "id": "p-06",
    "rank": 6,
    "product": "Gemini",
    "category": "Multimodal AI",
    "growth": 204,
    "buzzScore": 73,
    "creators": "Google DeepMind"
  },
  {
    "id": "p-07",
    "rank": 7,
    "product": "DALL-E 3",
    "category": "Image Generation",
    "growth": 444,
    "buzzScore": 91,
    "creators": "OpenAI"
  },
  {
    "id": "p-08",
    "rank": 8,
    "product": "Perplexity AI",
    "category": "AI Search",
    "growth": 273,
    "buzzScore": 77,
    "creators": "Perplexity AI"
  },
  {
    "id": "p-09",
    "rank": 9,
    "product": "Llama 3",
    "category": "Open-Source LLM",
    "growth": 286,
    "buzzScore": 91,
    "creators": "Meta AI"
  },
  {
    "id": "p-10",
    "rank": 10,
    "product": "Stable Diffusion XL",
    "category": "Image Generation",
    "growth": 178,
    "buzzScore": 95,
    "creators": "Stability AI"
  },
  {
    "id": "p-11",
    "rank": 11,
    "product": "Notion AI",
    "category": "Productivity AI",
    "growth": 218,
    "buzzScore": 89,
    "creators": "Notion"
  },
  {
    "id": "p-12",
    "rank": 12,
    "product": "GitHub Copilot",
    "category": "Coding Assistant",
    "growth": 139,
    "buzzScore": 77,
    "creators": "Microsoft/GitHub"
  },
  {
    "id": "p-13",
    "rank": 13,
    "product": "RunwayML",
    "category": "Video Generation",
    "growth": 454,
    "buzzScore": 92,
    "creators": "Runway AI"
  },
  {
    "id": "p-14",
    "rank": 14,
    "product": "ElevenLabs",
    "category": "Voice AI",
    "growth": 427,
    "buzzScore": 88,
    "creators": "ElevenLabs"
  },
  {
    "id": "p-15",
    "rank": 15,
    "product": "Vercel v0",
    "category": "Frontend Generation",
    "growth": 298,
    "buzzScore": 81,
    "creators": "Vercel"
  },
  {
    "id": "p-16",
    "rank": 16,
    "product": "Cursor",
    "category": "AI Code Editor",
    "growth": 418,
    "buzzScore": 78,
    "creators": "Cursor"
  }
];

export const ossRepos: OSRepo[] = [
  {
    "id": "oss-01",
    "name": "Significant-Gravitas/AutoGPT",
    "starsGained": "2.8K today",
    "starsNumeric": 184862,
    "contributors": 3077,
    "momentum": 88,
    "activityGrid": [
      57,
      37,
      61,
      69,
      36,
      61,
      83,
      66,
      66,
      83,
      61,
      37
    ]
  },
  {
    "id": "oss-02",
    "name": "f/prompts.chat",
    "starsGained": "1.3K today",
    "starsNumeric": 163466,
    "contributors": 1414,
    "momentum": 97,
    "activityGrid": [
      78,
      35,
      80,
      89,
      74,
      78,
      45,
      82,
      50,
      75,
      62,
      69
    ]
  },
  {
    "id": "oss-03",
    "name": "rasbt/LLMs-from-scratch",
    "starsGained": "2.1K today",
    "starsNumeric": 96919,
    "contributors": 988,
    "momentum": 95,
    "activityGrid": [
      80,
      69,
      37,
      81,
      88,
      73,
      56,
      81,
      65,
      80,
      44,
      88
    ]
  },
  {
    "id": "oss-04",
    "name": "hacksider/Deep-Live-Cam",
    "starsGained": "1.8K today",
    "starsNumeric": 93687,
    "contributors": 836,
    "momentum": 72,
    "activityGrid": [
      85,
      73,
      46,
      72,
      70,
      58,
      41,
      50,
      58,
      55,
      58,
      87
    ]
  },
  {
    "id": "oss-05",
    "name": "thedotmack/claude-mem",
    "starsGained": "1.1K today",
    "starsNumeric": 81463,
    "contributors": 476,
    "momentum": 95,
    "activityGrid": [
      56,
      78,
      83,
      82,
      33,
      39,
      66,
      41,
      33,
      75,
      74,
      47
    ]
  },
  {
    "id": "oss-06",
    "name": "OpenHands/OpenHands",
    "starsGained": "1.5K today",
    "starsNumeric": 76323,
    "contributors": 646,
    "momentum": 85,
    "activityGrid": [
      57,
      41,
      53,
      86,
      88,
      50,
      48,
      77,
      53,
      60,
      58,
      34
    ]
  },
  {
    "id": "oss-07",
    "name": "FlowiseAI/Flowise",
    "starsGained": "0.9K today",
    "starsNumeric": 53437,
    "contributors": 1632,
    "momentum": 90,
    "activityGrid": [
      31,
      60,
      47,
      74,
      69,
      52,
      72,
      34,
      38,
      76,
      38,
      80
    ]
  },
  {
    "id": "oss-08",
    "name": "jingyaogong/minimind",
    "starsGained": "0.7K today",
    "starsNumeric": 51438,
    "contributors": 440,
    "momentum": 78,
    "activityGrid": [
      38,
      72,
      42,
      75,
      41,
      54,
      79,
      55,
      43,
      84,
      56,
      49
    ]
  }
];
