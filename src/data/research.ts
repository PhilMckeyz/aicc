import { ResearchPaper } from '../types';

export const mockResearch: ResearchPaper[] = [
  {
    "id": "r-01",
    "title": "OmniGameArena: A Unified UE5 Benchmark for VLM Game Agents with Improvement Dynamics",
    "institution": "Academic Research",
    "summary": "Vision-language model (VLM) agents are increasingly deployed in interactive game environments. Yet game benchmarks for VLM agents typically report a single first-attempt score per (agent, game) pair, focus on single-agent Solo play, and lack unified protocols for evaluating heterogeneous agent class...",
    "difficultyScore": 5,
    "impactScore": 4,
    "arxivId": "2606.09826",
    "primaryAuthor": "Mingxian Lin"
  },
  {
    "id": "r-02",
    "title": "An Agency-Transferring Model-Free Policy Enhancement Technique",
    "institution": "Academic Research",
    "summary": "Training reinforcement learning (RL) policies from scratch is   costly: it requires careful reward and environment design,   extensive tuning, and substantial computation.   Yet many control problems already have a functional but   suboptimal policy available as a baseline.   This paper proposes a m...",
    "difficultyScore": 3,
    "impactScore": 5,
    "arxivId": "2606.09825",
    "primaryAuthor": "Anton Bolychev"
  },
  {
    "id": "r-03",
    "title": "Causally Evaluating the Learnability of Formal Language Tasks",
    "institution": "Academic Research",
    "summary": "Language models, as multi-task learners, acquire a wide range of abilities during training. A fundamental question is how much task-specific data is needed to learn a given task. Answering this for natural language is difficult: tasks are hard to delineate and can confound one another. To rigorously...",
    "difficultyScore": 4,
    "impactScore": 4,
    "arxivId": "2606.09822",
    "primaryAuthor": "Vésteinn Snæbjarnarson"
  },
  {
    "id": "r-04",
    "title": "Rethinking the Divergence Regularization in LLM RL",
    "institution": "Academic Research",
    "summary": "Reinforcement learning (RL) has become a key component of post-training large language models (LLMs). In practice, LLM RL is often off-policy because of training-inference mismatch and policy staleness, making trust-region control essential for stable optimization. Mainstream methods such as PPO and...",
    "difficultyScore": 5,
    "impactScore": 4,
    "arxivId": "2606.09821",
    "primaryAuthor": "Jiarui Yao"
  },
  {
    "id": "r-05",
    "title": "Weighted universal approximation of differentiable maps on infinite-dimensional manifolds",
    "institution": "Academic Research",
    "summary": "We generalize the universal approximation theorem for functional input neural networks (FNN) to differentiable maps by including the approximation of the derivatives. A FNN maps the input from a possibly infinite-dimensional weighted manifold to the real-valued hidden layer, on which a non-linear sc...",
    "difficultyScore": 3,
    "impactScore": 4,
    "arxivId": "2606.09820",
    "primaryAuthor": "Philipp Schmocker"
  },
  {
    "id": "r-06",
    "title": "PTL-Diffusion: Manifold-Aware Diffusion with Periodic Terminal Laws",
    "institution": "Academic Research",
    "summary": "Standard diffusion models typically use a single time-homogeneous Gaussian terminal distribution as the reference law for generation. While this choice is analytically convenient and empirically powerful, it provides little explicit structure for data concentrated near low-dimensional manifolds, whe...",
    "difficultyScore": 5,
    "impactScore": 4,
    "arxivId": "2606.09816",
    "primaryAuthor": "Danqi Zhuang"
  },
  {
    "id": "r-07",
    "title": "AHA-WAM:Asynchronous Horizon-Adaptive World-Action Modeling with Observation-Guided Context Routing",
    "institution": "Academic Research",
    "summary": "World-action models have emerged as a promising paradigm for robot manipulation, jointly modeling visual scene dynamics and actions to inject physical priors into policy learning. However, existing world-action models couple world prediction and action execution at the same temporal resolution, forc...",
    "difficultyScore": 4,
    "impactScore": 4,
    "arxivId": "2606.09811",
    "primaryAuthor": "Jisong Cai"
  },
  {
    "id": "r-08",
    "title": "Evaluation Cards: An Interpretive Layer for AI Evaluation Reporting",
    "institution": "Academic Research",
    "summary": "AI evaluation results are produced at scale but reported inconsistently across leaderboards, model cards, benchmark papers, and company blogs. The cost is interpretive: readers cannot reliably compare results across sources, identify what a report omits, or trace an aggregate claim to its underlying...",
    "difficultyScore": 3,
    "impactScore": 5,
    "arxivId": "2606.09809",
    "primaryAuthor": "Avijit Ghosh"
  },
  {
    "id": "r-09",
    "title": "Topological Neural Operators",
    "institution": "Academic Research",
    "summary": "We introduce Topological Neural Operators (TNOs), a principled framework for operator learning on cell complexes that lifts neural operators (NOs) from functions on points and/or edges to topological domains. TNOs represent data as features defined on cells of varying dimension and model their inter...",
    "difficultyScore": 5,
    "impactScore": 4,
    "arxivId": "2606.09806",
    "primaryAuthor": "Lennart Bastian"
  },
  {
    "id": "r-10",
    "title": "Echo-Memory: A Controlled Study of Memory in Action World Models",
    "institution": "Academic Research",
    "summary": "We present \\textbf{Echo-Memory}, a controlled study of memory mechanisms in action-conditioned world models. These models generate multi-segment videos from a first frame, text prompt, and camera-action sequence, but their central failure is often memory rather than local image synthesis: after the ...",
    "difficultyScore": 4,
    "impactScore": 5,
    "arxivId": "2606.09803",
    "primaryAuthor": "Wayne King"
  }
];
