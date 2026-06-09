import React, { useState, useRef, useEffect } from 'react';
import { mockStartups } from '../../data/startups';
import { mockNews } from '../../data/news';
import { watchlistCompanies } from '../../data/companies';
import { ChatMessage, CommandSuggestion, IntelligenceReport } from '../../types';
import { Terminal, Send, Trash2, Cpu, FileText, ChevronUp, ChevronDown, CheckCircle } from 'lucide-react';

interface AnalystConsoleProps {
  externalQueryTrigger?: string;
  onClearExternalQuery?: () => void;
}

export const AnalystConsole: React.FC<AnalystConsoleProps> = ({ 
  externalQueryTrigger = "", 
  onClearExternalQuery 
}) => {
  const [isConsoleMaximized, setIsConsoleMaximized] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-msg",
      sender: "analyst",
      text: "AI COMMAND TERMINAL READY. Input direct queries or activate trigger shortcuts for immediate structural analysis briefs.",
      timestamp: new Date().toLocaleTimeString(),
      report: {
        title: "INITIAL OPERATIONS STANDBY REPORT",
        sections: [
          {
            heading: "Current Ecosystem Index Status",
            bullets: [
              "H100/H200 compute spot allocation pipelines are optimal.",
              "Venture capital inflow registers heavy momentum, targeting multi-agent framework developers.",
              "Regulatory compliance parameters are under active audit regimes across standard US/EU zones."
            ],
            metrics: [
              { label: "SYS STABILITY", value: "99.8%", positive: true },
              { label: "ACTIVE SENSORS", value: "18/18", positive: true }
            ]
          }
        ],
        insights: [
          "Activate prompt buttons below to compile targeted global startup and research dossiers."
        ]
      }
    }
  ]);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Command suggestions
  const suggestions: CommandSuggestion[] = [
    { text: "What happened in AI this week?", label: "Ecosystem Briefing" },
    { text: "Which startups are gaining momentum?", label: "Trending Startups" },
    { text: "Summarize today's AI breakthroughs.", label: "Research Focus" },
    { text: "Show top AI companies by valuation.", label: "Valuation Dossier" }
  ];

  // Sync scroll position
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle incoming queries from header
  useEffect(() => {
    if (externalQueryTrigger) {
      handleQueryDispatch(externalQueryTrigger);
      if (onClearExternalQuery) {
        onClearExternalQuery();
      }
    }
  }, [externalQueryTrigger]);

  const handleQueryDispatch = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setIsConsoleMaximized(true);

    // Simulate system computational latency
    setTimeout(() => {
      const report = generateDynamicReport(text);
      const analystMsg: ChatMessage = {
        id: `an-${Date.now()}`,
        sender: 'analyst',
        text: `Analysis compiled successfully in response to query parameters: "${text}". Here is the compiled structured brief.`,
        timestamp: new Date().toLocaleTimeString(),
        report: report
      };

      setMessages(prev => [...prev, analystMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleQueryDispatch(inputValue.trim());
      setInputValue('');
    }
  };

  const clearChatHistory = () => {
    setMessages([
      {
        id: "cleared-msg",
        sender: "analyst",
        text: "SESSION RESET. Command terminal is receptive to new operational parameters.",
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  // Parsing keywords and fetching real data from datasets to generate authentic briefs
  const generateDynamicReport = (query: string): IntelligenceReport => {
    const normalized = query.toLowerCase();

    // Startups Query
    if (normalized.includes('startup') || normalized.includes('momentum') || normalized.includes('gaining')) {
      // Pull top 3 startups by watchScore from mock data
      const leadStartups = [...mockStartups]
        .sort((a, b) => b.watchScore - a.watchScore)
        .slice(0, 3);

      return {
        title: "HIGH-MOMENTUM STARTUP DETECTOR DOSSIER",
        sections: [
          {
            heading: "Identified Frontiers",
            bullets: leadStartups.map(s => 
              `${s.name} (${s.category}) is backed by ${s.leadInvestors.join(', ')} with a total capital substrate of ${s.funding}.`
            ),
            metrics: leadStartups.map(s => ({
              label: `${s.name.toUpperCase()} RISK/WATCH`,
              value: `${s.watchScore}%`,
              positive: s.watchScore >= 95
            }))
          },
          {
            heading: "Venture Velocity & Sourcing Patterns",
            bullets: [
              "Early-stage funding centers intensely around code-generation agents and humanoid robotic actuators.",
              "Venture firms show preference for companies utilizing custom compiled compiler environments over raw prompt interfaces."
            ]
          }
        ],
        insights: [
          "Software developer agents represent the highest density sector this cycle, showing +340% YoY valuation spikes."
        ]
      };
    }

    // Companies & Valuations Query
    if (normalized.includes('company') || normalized.includes('valuation') || normalized.includes('market')) {
      const topCompanies = [...watchlistCompanies]
        .sort((a, b) => b.momentumScore - a.momentumScore)
        .slice(0, 4);

      return {
        title: "AI ENTERPRISE VALUATIONS BRIEF",
        sections: [
          {
            heading: "Top Structured Watchlist Entities",
            bullets: topCompanies.map(c => 
              `${c.name} has a momentum benchmark of ${c.momentumScore}/100 and currently operates on a valuation status of ${c.marketValuation}.`
            ),
            metrics: topCompanies.map(c => ({
              label: `${c.name.toUpperCase()} MOMENTUM`,
              value: `${c.momentumScore}`,
              positive: c.weeklyTrend === 'up'
            }))
          }
        ],
        insights: [
          "OpenAI continues to lead scale valuations with a recently reported $157B capitalization target, followed aggressively by Anthropic's enterprise scaling ventures."
        ]
      };
    }

    // Research & Breakthroughs Query
    if (normalized.includes('breakthrough') || normalized.includes('research') || normalized.includes('paper') || normalized.includes('summarize')) {
      const criticalNews = mockNews.filter(n => n.category === 'Research' || n.category === 'Models').slice(0, 3);
      return {
        title: "SCHOLASTIC RESEARCH BREAKTHROUGH BRIEFING",
        sections: [
          {
            heading: "Identified Innovations Today",
            bullets: criticalNews.map(n => 
              `${n.headline} - Managed by ${n.source} reporting high contextual impact.`
            ),
            metrics: [
              { label: "AVERAGE IMPACT RATIO", value: "93.4%", positive: true },
              { label: "ACADEMIC SIGNAL RATIO", value: "Normal", positive: true }
            ]
          }
        ],
        insights: [
          "Recent publications favor KV Cache architectural optimizations and asynchronous hardware instruction loops to sustain sub-ms latencies during scale inference."
        ]
      };
    }

    // General News and Weekly briefing Query
    return {
      title: "GLOBAL ECOSYSTEM OPERATION DIGEST",
      sections: [
        {
          heading: "Macro Indicator Summary",
          bullets: [
            "Silicon Fab throughput remains stable, TSMC reported high yield parameters on custom 3nm pipelines.",
            "Enterprise API billing integrations indicate a massive migration toward multi-step routing agents over simple chat prompts.",
            "Regulatory guidelines continue to build compliance walls, increasing basic model pre-training reporting overheads."
          ],
          metrics: [
            "Total tracked companies are healthy",
            "Seed capital velocity remains in upward momentum indices"
          ].map((item, idx) => ({
            label: `PARAMETER_${idx + 1}`,
            value: "STABLE",
            positive: true
          }))
        }
      ],
      insights: [
        "Infrastructure optimization tools representation is soaring, reflecting a shift from raw model pre-training to runtime inference efficiency."
      ]
    };
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#131A22] border-t border-cmd-border transition-all duration-300 ${
        isConsoleMaximized ? "h-[360px]" : "h-12"
      }`}
    >
      {/* Console Top Title and minimize/maximize controllers */}
      <div className="h-10 px-4 bg-[#0B0F14] border-b border-cmd-border/80 flex items-center justify-between select-none shrink-0">
        <div 
          onClick={() => setIsConsoleMaximized(!isConsoleMaximized)}
          className="flex items-center gap-2 cursor-pointer font-mono"
        >
          <Terminal className="w-4 h-4 text-cmd-primary animate-pulse" />
          <span className="text-[10px] font-black tracking-widest text-[#00D4FF] uppercase flex items-center gap-1.5">
            AI COMMAND SENSORY TERMINAL
            <span className="w-2 h-2 rounded-full bg-cmd-positive animate-pulse-slow" />
          </span>
        </div>

        {/* Floating actions */}
        <div className="flex items-center gap-3">
          {/* Quick Clear */}
          {isConsoleMaximized && (
            <button 
              onClick={clearChatHistory}
              className="p-1 text-gray-500 hover:text-cmd-negative transition-all cursor-pointer"
              title="Reset history"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Minimize / Maximize toggle */}
          <button 
            onClick={() => setIsConsoleMaximized(!isConsoleMaximized)}
            className="p-1 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            {isConsoleMaximized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isConsoleMaximized ? (
        <div className="absolute inset-x-0 top-10 bottom-0 flex flex-col justify-between">
          {/* Messages Stream Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0B0F14]/75 to-[#131A22]">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${
                  msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                {/* Visual sender badge */}
                <div className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 font-mono text-[10px] font-bold ${
                  msg.sender === 'user' 
                    ? "bg-cmd-primary/10 border border-cmd-primary text-cmd-primary" 
                    : "bg-[#253041]/40 border border-cmd-border text-gray-300"
                }`}>
                  {msg.sender === 'user' ? "US" : "AN"}
                </div>

                {/* Message body with custom reports and bullet items */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-gray-400 font-bold uppercase">
                      {msg.sender === 'user' ? "SECURE CLIENT USER" : "AI ECOSYSTEM ANALYST"}
                    </span>
                    <span className="text-[9px] text-gray-600 font-mono italic">
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="text-[11.5px] font-mono text-gray-200 bg-[#131A22]/20 py-1.5 px-2.5 rounded border border-cmd-border/30 max-w-2xl leading-relaxed">
                    {msg.text}
                  </p>

                  {/* Render Compiled report layout if requested */}
                  {msg.report && (
                    <div className="bg-[#0B0F14]/80 border-l-2 border-cmd-primary p-3 rounded-r space-y-3 max-w-3xl mt-2 font-mono">
                      {/* Report Banner */}
                      <span className="text-[9px] font-black text-cmd-primary block tracking-widest leading-none">
                        ◆ {msg.report.title}
                      </span>

                      {/* Sections breakdown */}
                      {msg.report.sections.map((sect, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <h4 className="text-[10.5px] font-bold text-white border-b border-cmd-border/30 pb-0.5 uppercase">
                            {sect.heading}
                          </h4>
                          <ul className="space-y-1 text-[10.5px] text-gray-300 pl-3 list-disc">
                            {sect.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="leading-tight">{b}</li>
                            ))}
                          </ul>

                          {/* Display custom metrics pill cards if compiled */}
                          {sect.metrics && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                              {sect.metrics.map((met, mIdx) => (
                                <div key={mIdx} className="bg-[#131A22] border border-cmd-border/50 p-1.5 text-center rounded-sm">
                                  <span className="text-[8px] text-gray-500 block leading-none">{met.label}</span>
                                  <span className={`text-[10.5px] font-black ${
                                    met.positive ? "text-cmd-positive" : "text-cmd-warning"
                                  }`}>
                                    {met.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Key Insights note block */}
                      {msg.report.insights.map((ins, iIdx) => (
                        <div key={iIdx} className="border border-dashed border-cmd-primary/30 p-2 bg-cmd-primary/[0.02] rounded text-[10px] text-gray-300 leading-snug">
                          <span className="text-cmd-primary font-bold">ANALYST RECOMMENDATION DIRECTIVE:</span> {ins}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Simulated typing dot-pulses */}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-sm bg-[#253041]/40 border border-cmd-border text-gray-300 flex items-center justify-center font-mono text-[10px] font-bold select-none">
                  AN
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-[9px] font-mono text-gray-500 font-bold uppercase block tracking-widest leading-none">
                    ENGINE COMPILING BRIEF...
                  </span>
                  <div className="inline-flex gap-1 py-1.5 px-3 bg-[#131A22]/40 rounded border border-cmd-border/40">
                    <span className="w-1.5 h-1.5 bg-cmd-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-cmd-primary rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-cmd-primary rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Senders Input elements and pre-designed prompt buttons row */}
          <div className="h-16 bg-[#0B0F14] border-t border-cmd-border px-4 flex flex-col justify-center gap-1.5 shrink-0">
            {/* Quick Suggestions Buttons Row */}
            <div className="flex gap-2 overflow-x-auto pb-0.5 select-none shrink-0 scrollbar-none">
              <span className="text-[8px] font-mono text-gray-500 font-bold uppercase flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-cmd-primary" />
                Dossier Shortcuts:
              </span>
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQueryDispatch(sug.text)}
                  className="px-2 py-0.5 text-[9px] font-mono tracking-wider font-semibold bg-cmd-border/30 hover:bg-cmd-primary/15 hover:text-cmd-primary border border-cmd-border/60 hover:border-cmd-primary/70 rounded text-gray-400 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {sug.label}
                </button>
              ))}
            </div>

            {/* Input Form and Send button */}
            <form onSubmit={handleFormSubmit} className="flex gap-3">
              <span className="text-cmd-primary font-mono text-xs font-black self-center select-none">
                $ {`>`}
              </span>
              <input
                type="text"
                placeholder="Submit custom parameters or queries, e.g. 'Show startups' or 'Summarize breakthroughs'..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-transparent border-none text-[11px] font-mono text-cmd-primary placeholder-cmd-primary/45 focus:outline-none focus:ring-0 leading-none py-1"
              />
              <button 
                type="submit"
                className="p-1 px-3 text-cmd-primary hover:text-white bg-cmd-border/40 hover:bg-cmd-primary/10 border border-cmd-border/60 hover:border-cmd-primary rounded flex items-center gap-1 transition-all cursor-pointer font-mono text-[9px] font-black uppercase"
              >
                COMPILE BRIEF
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsConsoleMaximized(true)}
          className="h-full flex items-center justify-center text-center gap-2 cursor-pointer font-mono uppercase bg-[#131A22] text-gray-400 hover:text-white"
        >
          <Terminal className="w-4 h-4 text-cmd-primary animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest leading-none">
            [+] Click focused prompt bar to execute custom parameters & reports
          </span>
        </div>
      )}
    </div>
  );
};
