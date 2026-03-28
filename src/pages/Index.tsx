import { useState, useMemo } from "react";
import spinners from "@/data/spinners.json";
import SpinnerCard from "@/components/SpinnerCard";
import { Search, Terminal } from "lucide-react";

type SpinnerData = { interval: number; frames: string[] };
const allSpinners = Object.entries(spinners as Record<string, SpinnerData>);

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return allSpinners;
    const q = search.toLowerCase();
    return allSpinners.filter(([name]) => name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-terminal-bg/80 backdrop-blur-md border-b border-terminal-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-6 h-6 text-terminal-green" />
            <h1 className="font-mono text-xl font-bold text-terminal-text">
              CLI Spinner 展示館
            </h1>
            <span className="font-mono text-xs text-terminal-muted ml-auto">
              共 {filtered.length} / {allSpinners.length} 個
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terminal-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜尋 spinner 名稱..."
              className="w-full font-mono text-sm bg-terminal-card border border-terminal-border rounded-md pl-10 pr-4 py-2.5 text-terminal-text placeholder:text-terminal-muted focus:outline-none focus:border-terminal-accent focus:ring-1 focus:ring-terminal-accent transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20 font-mono text-terminal-muted">
            找不到符合「{search}」的 spinner
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map(([name, data]) => (
              <SpinnerCard
                key={name}
                name={name}
                frames={data.frames}
                interval={data.interval}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-border py-4 text-center font-mono text-xs text-terminal-muted">
        點擊任意卡片可暫停/播放動畫
      </footer>
    </div>
  );
};

export default Index;
