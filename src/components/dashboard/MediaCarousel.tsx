import React, { useRef } from 'react';
import { mockPodcasts } from '../../data/podcasts';
import { Play, Tv, ChevronLeft, ChevronRight, Speaker, Clock } from 'lucide-react';

interface MediaCarouselProps {
  searchText?: string;
}

export const MediaCarousel: React.FC<MediaCarouselProps> = ({ searchText = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredPodcasts = mockPodcasts.filter((pod) => {
    const query = searchText.toLowerCase();
    return !query || 
      pod.title.toLowerCase().includes(query) ||
      pod.speaker.toLowerCase().includes(query) ||
      pod.summary.toLowerCase().includes(query);
  });

  const scrollLeftAction = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRightAction = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div id="ai-podcast-intelligence" className="bg-[#131A22] border border-cmd-border rounded p-4 flex flex-col justify-between h-[340px] shadow-md hover:border-cmd-primary/35 transition-all">
      {/* Widget Header with navigation controls */}
      <div className="flex justify-between items-center border-b border-cmd-border/40 pb-3 shrink-0">
        <div>
          <h2 className="text-sm font-black tracking-wider text-white uppercase font-mono flex items-center gap-2">
            <Tv className="w-4 h-4 text-cmd-primary" />
            Podcast & Video Intelligence
          </h2>
          <p className="text-[11px] text-gray-400">
            Scanning academic briefings, keynotes, and technical audio streams with generative summaries.
          </p>
        </div>

        {/* Next and Prev buttons */}
        <div className="flex items-center gap-1.5 pb-1">
          <button 
            onClick={scrollLeftAction}
            className="p-1 border border-cmd-border hover:border-gray-500 rounded bg-[#0B0F14]/60 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={scrollRightAction}
            className="p-1 border border-cmd-border hover:border-gray-500 rounded bg-[#0B0F14]/60 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex-grow flex gap-4 overflow-x-auto select-none mt-4 pb-2 pr-[2px] scrollbar-thin scrollbar-thumb-cmd-border scrollbar-track-transparent scroll-smooth"
      >
        {filteredPodcasts.length === 0 ? (
          <div className="w-full flex items-center justify-center text-center p-8 text-gray-500 font-mono text-xs border border-dashed border-cmd-border/40 bg-[#0B0F14]/40 rounded">
            No media broadcasts match the active filters.
          </div>
        ) : (
          filteredPodcasts.map((pod) => (
            <div
              key={pod.id}
              className="w-[280px] shrink-0 bg-[#0B0F14]/45 border border-cmd-border/60 hover:border-cmd-primary/60 hover:bg-[#131A22] p-2.5 rounded flex flex-col justify-between transition-all group relative cursor-pointer"
            >
              {/* Thumbnail representation */}
              <div className="aspect-video w-full bg-cmd-border/40 relative rounded overflow-hidden">
                <img 
                  src={pod.thumbnailUrl} 
                  alt={pod.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                
                {/* Embedded Glassmorphic Play Button Overlay */}
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center group-hover:bg-black/25 transition-all">
                  <div className="w-9 h-9 bg-[#131A22]/80 group-hover:bg-cmd-primary border border-cmd-border group-hover:border-cmd-primary rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 transform group-hover:scale-110">
                    <Play className="w-4 h-4 text-white group-hover:text-[#0B0F14] ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-1.5 right-1.5 bg-[#0B0F14]/85 text-white font-mono text-[8.5px] px-1.5 py-0.5 rounded border border-cmd-border/45 flex items-center gap-1 font-bold">
                  <Clock className="w-2.5 h-2.5 text-cmd-primary" />
                  {pod.duration}
                </span>
              </div>

              {/* Text metadata */}
              <div className="mt-2.5 space-y-1.5">
                <div className="flex justify-between text-[8px] font-mono text-cmd-primary uppercase font-bold tracking-wider">
                  <span>{pod.source}</span>
                  <span className="text-gray-400">LECTURE SPEC</span>
                </div>
                <h4 className="text-[11px] font-black text-white leading-tight group-hover:text-cmd-primary line-clamp-2 transition-colors">
                  {pod.title}
                </h4>
                <p className="text-[10px] text-gray-400 line-clamp-2 leading-tight">
                  {pod.summary}
                </p>
              </div>

              {/* Speaker detail row */}
              <div className="mt-3 pt-2 border-t border-cmd-border/30 text-[9.5px] font-mono text-gray-400 flex items-center gap-1.5 truncate">
                <Speaker className="w-3 h-3 text-cmd-primary" />
                <span className="truncate">Speaker: <b className="text-white">{pod.speaker}</b></span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer system details */}
      <div className="pt-2 text-[9px] text-gray-500 font-mono flex justify-between border-t border-cmd-border/40 mt-3 shrink-0 select-none">
        <span>AUDIO FEED SYNC: EXCEL-COMPILING CONTINUOUS BROADCASTS</span>
        <span>INDEX COUNT: {mockPodcasts.length} PODCASTS</span>
      </div>
    </div>
  );
};
