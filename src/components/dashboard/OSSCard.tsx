import React, { useState } from 'react';
import { ossRepos } from '../../data/companies';
import { GitBranch, Star, Users, Flame, Info, Check, ArrowRight, Github } from 'lucide-react';

interface OSSCardProps {
  searchText?: string;
}

export const OSSCard: React.FC<OSSCardProps> = ({ searchText = "" }) => {
  const [selectedRepoId, setSelectedRepoId] = useState<string | null>(null);

  const filteredRepos = ossRepos.filter((repo) => {
    const query = searchText.toLowerCase();
    return !query || 
      repo.name.toLowerCase().includes(query) ||
      repo.starsGained.toLowerCase().includes(query);
  });

  const selectedRepo = ossRepos.find(r => r.id === selectedRepoId);

  return (
    <div id="ai-oss-intelligence" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col h-[520px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-cmd-border/40 pb-3 shrink-0">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cmd-primary" />
            Open Source Intelligence
          </h2>
          <p className="text-[11px] text-gray-400">
            Analyzing open weights velocities, core repository commit streams, and community growth.
          </p>
        </div>
        <div className="text-[10px] text-gray-400 font-mono">
          MONITORING {ossRepos.length} REPOS
        </div>
      </div>

      {/* Main split grid layout */}
      <div className="flex-grow grid grid-cols-1 xl:grid-cols-12 gap-3 overflow-hidden pt-3">
        {/* Repo items grid */}
        <div className={`overflow-y-auto space-y-2 pr-1 ${selectedRepoId ? "xl:col-span-7" : "xl:col-span-12"}`}>
          {filteredRepos.length === 0 ? (
            <div className="p-4 text-center bg-[#0B0F14]/40 text-gray-500 font-mono text-xs rounded border border-cmd-border/40">
              No repositories match the query arguments.
            </div>
          ) : (
            filteredRepos.map((repo) => {
              const matchesSelected = repo.id === selectedRepoId;
              
              return (
                <div
                  key={repo.id}
                  onClick={() => setSelectedRepoId(matchesSelected ? null : repo.id)}
                  className={`border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded cursor-pointer transition-all ${
                    matchesSelected 
                      ? "bg-cmd-primary/5 border-cmd-primary" 
                      : "bg-[#0B0F14]/40 border-cmd-border/50 hover:border-gray-500 hover:bg-[#131A22]"
                  }`}
                >
                  {/* Left block layout */}
                  <div className="space-y-1 min-w-[140px]">
                    <div className="flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-gray-400" />
                      <h4 className="text-[11px] font-black text-white leading-none">
                        {repo.name}
                      </h4>
                    </div>
                    <span className="text-[10px] text-[#00E676] font-mono font-bold block">
                      {repo.starsGained}
                    </span>
                  </div>

                  {/* Git Commit Intensity Grid (GitHub-style Activity Grid visualizer) */}
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">
                      12-Week Commit Wave:
                    </span>
                    <div className="flex gap-1">
                      {repo.activityGrid.map((value, scoreIdx) => {
                        // Calculate commit density color class
                        let colorClass = "bg-[#253041]/30 border border-transparent";
                        if (value >= 85) {
                          colorClass = "bg-cmd-positive border border-cmd-positive/30"; // Premium intense commits
                        } else if (value >= 60) {
                          colorClass = "bg-cmd-positive/70 border border-cmd-positive/20";
                        } else if (value >= 35) {
                          colorClass = "bg-cmd-positive/40 border border-cmd-positive/10";
                        } else if (value >= 15) {
                          colorClass = "bg-cmd-positive/20";
                        }

                        return (
                          <div
                            key={scoreIdx}
                            title={`Weekly Activity Coefficient: ${value}%`}
                            className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-110 ${colorClass}`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Metrics items */}
                  <div className="flex items-center gap-4 shrink-0 font-mono text-right text-[10px]">
                    <div className="hidden md:block">
                      <span className="text-gray-400 block uppercase">CONTRIBS</span>
                      <span className="text-white font-bold">{repo.contributors}</span>
                    </div>
                    <div>
                      <span className="text-[#00D4FF] block font-extrabold uppercase text-[9px] tracking-wider font-mono">
                        MOMENTUM
                      </span>
                      <span className="text-white font-black">{repo.momentum}%</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Repo details window */}
        {selectedRepo && (
          <div className="xl:col-span-5 bg-[#0B0F14]/75 border border-cmd-border/80 rounded p-3 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-cmd-border/40 pb-2">
                <div>
                  <h3 className="text-xs font-black font-mono text-white leading-none">
                    {selectedRepo.name}
                  </h3>
                  <p className="text-[9.5px] text-[#00D4FF] uppercase tracking-wider mt-1 block">OSS REPOSITORY SPECS</p>
                </div>
                <Users className="w-4 h-4 text-cmd-primary shrink-0" />
              </div>

              {/* Specifications block */}
              <div className="space-y-1.5 text-[10px] font-mono">
                <div className="flex justify-between py-1 border-b border-cmd-border/30">
                  <span className="text-gray-400">STAR COUNT:</span>
                  <span className="text-white font-bold inline-flex items-center gap-1">
                    <Star className="w-3 h-3 text-cmd-warning fill-cmd-warning" />
                    {(selectedRepo.starsNumeric / 1000).toFixed(1)}K Total
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-cmd-border/30">
                  <span className="text-gray-400">ACTIVE COMMITS WEEKLY:</span>
                  <span className="text-[#00E676] font-bold">Intense Peak</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cmd-border/30">
                  <span className="text-gray-400">COLLABORATION LEVEL:</span>
                  <span className="text-cmd-primary font-bold">Tier 1 Elite</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">SENSORY MOMENTUM:</span>
                  <span className="text-white font-semibold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-cmd-negative" />
                    {selectedRepo.momentum}% velocity
                  </span>
                </div>
              </div>

              {/* Informative text */}
              <div className="bg-[#131A22]/50 p-2 border border-cmd-border/40 text-[10.5px] leading-relaxed text-gray-300">
                This repository exhibits high weekly commit density, tracking an exponential increase in community contributions and download allocations.
              </div>
            </div>

            <button
              onClick={() => setSelectedRepoId(null)}
              className="w-full bg-[#131A22] border border-cmd-border text-gray-300 hover:text-white py-1 font-mono text-[9px] uppercase tracking-wider hover:border-gray-600 transition-all"
            >
              Close specs drawer
            </button>
          </div>
        )}
      </div>

      {/* Footer copyright */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 mt-2 shrink-0 select-none">
        <span>COMMIT REGISTER SYNC: SECURE SSH HUB</span>
        <span>MAPPED FROM GITHUB CORE SENSORS</span>
      </div>
    </div>
  );
};
