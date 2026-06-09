import React, { useState } from 'react';
import { mockResearch } from '../../data/research';
import { ResearchRadarChart } from '../charts/ResearchRadarChart';
import { BookOpen, Compass, ChevronRight, GraduationCap, Percent, AlertCircle } from 'lucide-react';

interface ResearchRadarCardProps {
  searchText?: string;
}

export const ResearchRadarCard: React.FC<ResearchRadarCardProps> = ({ searchText = "" }) => {
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);

  const filteredResearch = mockResearch.filter((paper) => {
    const query = searchText.toLowerCase();
    return !query || 
      paper.title.toLowerCase().includes(query) ||
      paper.institution.toLowerCase().includes(query) ||
      paper.primaryAuthor.toLowerCase().includes(query) ||
      paper.arxivId.includes(query);
  });

  const selectedPaper = mockResearch.find(p => p.id === selectedPaperId);

  return (
    <div id="ai-research-radar" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-cmd-border/40 pb-3">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <Compass className="w-4 h-4 text-cmd-primary" />
            AI Research Radar
          </h2>
          <p className="text-[11px] text-gray-400">
            Mapping scholastic breakthroughs, complexity thresholds, and structural impact ratings.
          </p>
        </div>
        <div className="text-[10px] bg-cmd-primary/10 text-cmd-primary border border-cmd-primary/20 px-1.5 py-0.5 rounded font-mono">
          {mockResearch.length} PAPERS DEPLOYED
        </div>
      </div>

      {/* Main Area: Split between Radial breakdown and List elements */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-3 overflow-hidden pt-3">
        {/* Left Side elements: Chart display + single detail highlight sheet */}
        <div className="md:col-span-12 xl:col-span-5 flex flex-col justify-between space-y-2 border-r border-cmd-border/40 pr-3">
          {/* Recharts compilation */}
          <div className="bg-[#0B0F14]/40 border border-cmd-border/40 p-2 rounded">
            <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center mb-1">
              STRUCTURAL PARAMETER SIGNATURES
            </h4>
            <ResearchRadarChart />
          </div>

          {/* Quick detail display sheet of click-focused paper */}
          <div className="bg-[#0B0F14]/70 border border-cmd-border/60 p-2.5 rounded h-[154px] overflow-y-auto flex flex-col justify-between">
            {selectedPaper ? (
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <a
                    href={`https://arxiv.org/abs/${selectedPaper.arxivId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-1.5 py-0.5 rounded hover:bg-[#00D4FF]/25 hover:underline transition-all block"
                  >
                    arXiv:{selectedPaper.arxivId} ↗
                  </a>
                  <span className="text-[9px] text-gray-400 font-mono">
                    Impact: {selectedPaper.impactScore}/5
                  </span>
                </div>
                <h5 className="text-[11px] font-black text-white hover:text-cmd-primary transition-colors leading-tight truncate">
                  <a
                    href={`https://arxiv.org/abs/${selectedPaper.arxivId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {selectedPaper.title}
                  </a>
                </h5>
                <p className="text-[10px] text-gray-400 leading-tight line-clamp-3">
                  {selectedPaper.summary}
                </p>
                <div className="flex justify-between text-[8.5px] font-mono text-gray-500 pt-1">
                  <span>Author: {selectedPaper.primaryAuthor}</span>
                  <span>Difficulty: {selectedPaper.difficultyScore}/5</span>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-2">
                <BookOpen className="w-5 h-5 text-gray-600 mb-1 animate-pulse" />
                <p className="text-[10px] font-mono text-gray-400 font-bold uppercase">
                  No Abstract Selected
                </p>
                <p className="text-[9px] text-gray-500 max-w-[180px]">
                  Select any scholastic dissertation in the neighboring briefing grid to render its abstract synopsis.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side elements: Compact grid of papers list */}
        <div className="md:col-span-12 xl:col-span-7 overflow-y-auto space-y-1.5 pr-1">
          {filteredResearch.length === 0 ? (
            <div className="p-4 text-center bg-[#0B0F14]/40 text-gray-500 font-mono text-xs">
              No matching research papers available.
            </div>
          ) : (
            filteredResearch.map((paper) => {
              const isSelected = paper.id === selectedPaperId;
              return (
                <div
                  key={paper.id}
                  onClick={() => setSelectedPaperId(isSelected ? null : paper.id)}
                  className={`border p-2 rounded cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-cmd-primary/5 border-cmd-primary" 
                      : "bg-[#0B0F14]/40 border-cmd-border/60 hover:border-gray-500 hover:bg-[#131A22]"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 flex-1">
                      {/* Institution with academic icon */}
                      <span className="text-[9px] font-mono text-cmd-primary inline-flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-cmd-primary" />
                        {paper.institution}
                      </span>
                      <h4 className="text-[11px] font-semibold text-white leading-tight">
                        {paper.title}
                      </h4>
                    </div>

                    {/* Scores badge display */}
                    <div className="text-right shrink-0 font-mono">
                      <div className="text-[9px] text-[#00E676] bg-[#00E676]/10 px-1 py-0.5 rounded font-black text-center">
                        IMP: {paper.impactScore * 20}%
                      </div>
                      <div className="text-[9px] text-gray-400 mt-0.5">
                        DIFF: {paper.difficultyScore}/5
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer statistics metadata */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 mt-2 shrink-0">
        <span>DISSERTATIONS REGISTERED REGIONALLY: US-WEST-01 / EU-CENTRAL-01</span>
        <span>INDEXING ENGINE FREQUENCY: 12HRS</span>
      </div>
    </div>
  );
};
