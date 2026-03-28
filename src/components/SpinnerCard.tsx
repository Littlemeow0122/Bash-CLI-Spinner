import { useState, useEffect, useRef } from "react";

interface SpinnerCardProps {
  name: string;
  frames: string[];
  interval: number;
}

const SpinnerCard = ({ name, frames, interval }: SpinnerCardProps) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setFrameIndex((prev) => (prev + 1) % frames.length);
      }, interval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, frames.length, interval]);

  return (
    <div
      className="group relative rounded-lg border border-terminal-border bg-terminal-card p-4 transition-all duration-200 hover:border-terminal-accent hover:shadow-terminal cursor-pointer"
      onClick={() => setIsRunning(!isRunning)}
    >
      {/* Spinner preview */}
      <div className="flex items-center justify-center h-16 mb-3">
        <span className="text-3xl font-mono text-terminal-green select-none whitespace-pre">
          {frames[frameIndex]}
        </span>
      </div>

      {/* Name */}
      <div className="text-center">
        <p className="font-mono text-sm text-terminal-text truncate">{name}</p>
        <p className="font-mono text-xs text-terminal-muted mt-1">
          {interval}ms · {frames.length} 幀
        </p>
      </div>

      {/* Status indicator */}
      <div className="absolute top-2 right-2">
        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-terminal-green animate-pulse' : 'bg-terminal-muted'}`} />
      </div>

      {/* Hover hint */}
      <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-6 overflow-hidden transition-all duration-200 bg-terminal-accent/10 rounded-b-lg flex items-center justify-center">
        <span className="font-mono text-[10px] text-terminal-accent">
          {isRunning ? '點擊暫停' : '點擊播放'}
        </span>
      </div>
    </div>
  );
};

export default SpinnerCard;
