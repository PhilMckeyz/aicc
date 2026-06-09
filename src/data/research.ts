import { ResearchPaper } from '../types';

export const mockResearch: ResearchPaper[] = [
  {
    id: "r-01",
    title: "Deep Reinforcement Learning from Human Feedback: Post-Training Optimizations",
    institution: "Stanford AI Lab",
    summary: "Explores scalable reinforcement learning techniques to minimize hallucination rates while doubling code-generation correctness on complex algorithmic tasks.",
    difficultyScore: 5,
    impactScore: 5,
    arxivId: "2405.1203",
    primaryAuthor: "Dr. Elena Rostova"
  },
  {
    id: "r-02",
    title: "Optimizing KV Cache Memory Pools for Ultra-long Context Transformers",
    institution: "Meta FAIR",
    summary: "Introduces dynamic chunk-eviction arrays based on attention scoring weights, reducing memory consumption by 64% over standard sequence lengths.",
    difficultyScore: 4,
    impactScore: 5,
    arxivId: "2405.1198",
    primaryAuthor: "Arthur Lin"
  },
  {
    id: "r-03",
    title: "Scaling Laws for Collaborative Multi-Agent Systems in Closed Sandboxes",
    institution: "Microsoft Research",
    summary: "Identifies mathematical tipping points where multi-agent communication structures achieve super-linear performance boosts compared to single monolithic entities.",
    difficultyScore: 4,
    impactScore: 4,
    arxivId: "2405.1152",
    primaryAuthor: "Sarah Jenkins"
  },
  {
    id: "r-04",
    title: "Direct Preference Optimization: Simple Training of Aligners Without Post-Pretraining",
    institution: "Stanford NLP",
    summary: "Replaces standard actor-critic policy setups with simple cross-entropy minimization on preferred vs rejected outputs, cutting alignment overheads.",
    difficultyScore: 3,
    impactScore: 5,
    arxivId: "2305.18290",
    primaryAuthor: "Rafael Rafailov"
  },
  {
    id: "r-05",
    title: "FlashAttention-3: Fast and Accurate Attention with Asynchronous Workgroups",
    institution: "Tri Dao et al.",
    summary: "Optimizes execution on Hopper GPUs using asynchronous WGMMA instructions to reach up to 74% compute utilization during sequence training.",
    difficultyScore: 5,
    impactScore: 5,
    arxivId: "2407.02030",
    primaryAuthor: "Tri Dao"
  },
  {
    id: "r-06",
    title: "Speculative Decoding via Logit Approximation Networks",
    institution: "Google DeepMind",
    summary: "Replaces small model drafting arrays with direct logit approximation, allowing high-performance models to serve tokens at 3.2x baseline speed.",
    difficultyScore: 4,
    impactScore: 4,
    arxivId: "2403.01198",
    primaryAuthor: "David Silver"
  },
  {
    id: "r-07",
    title: "Mixture of Depths: Dynamically Allocating Compute in Transformer Layers",
    institution: "Google DeepMind",
    summary: "Introduces dynamic token routing through feedforward blocks, enabling the network to spend variable compute budgets per token based on complexity.",
    difficultyScore: 5,
    impactScore: 5,
    arxivId: "2404.02258",
    primaryAuthor: "Noam Shazeer"
  },
  {
    id: "r-08",
    title: "QoR: Quality of Reasoning Benchmarks for Multi-turn Code-Editing Loops",
    institution: "MIT CSAIL",
    summary: "Establishes structured engineering criteria to evaluate interactive reasoning models across multi-step file dependency structures.",
    difficultyScore: 3,
    impactScore: 4,
    arxivId: "2406.11590",
    primaryAuthor: "Prof. Hal Abelson"
  },
  {
    id: "r-09",
    title: "Constitutional AI: Self-Correction arrays Guided by Fundamental Principles",
    institution: "Anthropic Research",
    summary: "Details training pipelines where a critique-and-revision cycle is entirely automated by an internal alignment constitution set.",
    difficultyScore: 4,
    impactScore: 5,
    arxivId: "2212.08055",
    primaryAuthor: "Yuntao Bai"
  },
  {
    id: "r-10",
    title: "BitNet: Scaling 1-bit Transformers for Sub-milliwatt Embedded Execution",
    institution: "Microsoft Research Asia",
    summary: "Presents fully quantized -1, 0, 1 weight architectures that sustain perplexity metrics while eliminating floating-point matrix multiplications.",
    difficultyScore: 5,
    impactScore: 5,
    arxivId: "2310.11453",
    primaryAuthor: "Furu Wei"
  },
  {
    id: "r-11",
    title: "KAN: Kolmogorov-Arnold Networks as Alternatives to Multi-Layer Perceptrons",
    institution: "MIT & Caltech",
    summary: "Replaces fixed-weights grid systems with learnable B-spline functions on connections, improving mathematical boundary regression tasks.",
    difficultyScore: 5,
    impactScore: 4,
    arxivId: "2404.19756",
    primaryAuthor: "Ziming Liu"
  },
  {
    id: "r-12",
    title: "Ring Attention: Blockwise Parallel Computation of Trillion-Token Attention Areas",
    institution: "UC Berkeley",
    summary: "Enables context lengths to scale linearly with GPU cluster cluster size by passing key-value blocks in a ring-network configuration.",
    difficultyScore: 5,
    impactScore: 5,
    arxivId: "2310.01820",
    primaryAuthor: "Hao Liu"
  },
  {
    id: "r-13",
    title: "Retrieval-Augmented Generation arrays with Sparse Vector Hybrid Indexing",
    institution: "CMU LTI",
    summary: "Integrates BM25 lexical structures directly into geometric dense matching matrices, streamlining contextual relevance pipelines.",
    difficultyScore: 3,
    impactScore: 4,
    arxivId: "2401.03452",
    primaryAuthor: "Graham Neubig"
  },
  {
    id: "r-14",
    title: "Direct Preference Optimization via Token-Level Advantage Routing",
    institution: "ETH Zurich",
    summary: "Formulates reward allocation at token-level instead of sentence-level, improving correctness for math and logic workflows.",
    difficultyScore: 4,
    impactScore: 4,
    arxivId: "2402.11051",
    primaryAuthor: "Martin Vechev"
  },
  {
    id: "r-15",
    title: "Dense Passage Retrieval Over Hierarchical Engineering Graphs",
    institution: "University of Washington",
    summary: "Proposes structural graph embeddings that preserve source codebase hierarchies during vector passage indexing operations.",
    difficultyScore: 4,
    impactScore: 4,
    arxivId: "2403.09012",
    primaryAuthor: "Luke Zettlemoyer"
  }
];
