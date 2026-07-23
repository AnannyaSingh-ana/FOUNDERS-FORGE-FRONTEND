const AGENTS = [
  "Market Research",
  "Competitor Analysis",
  "Historical Failures",
  "Finance",
  "SWOT",
  "Marketing",
  "Legal",
  "Investment Score",
  "Founder Advisor",
];

export default function LoadingState() {
  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <p className="font-mono text-xs text-[#E8590C] tracking-[0.2em] mb-2">
        AT THE FORGE
      </p>
      <h2 className="font-display text-2xl md:text-3xl text-[#EDE8DE] tracking-tight mb-3">
        Your agents are drafting the plan
      </h2>
      <p className="text-[#8AA0B4] text-sm mb-10">
        This usually takes one to two minutes while each agent researches and
        writes its section.
      </p>

      <div className="border border-[#2A3A4A] bg-[#111A24] rounded-sm p-6 md:p-8">
        <ul className="space-y-3 text-left">
          {AGENTS.map((agent, i) => (
            <li
              key={agent}
              className="flex items-center gap-3 font-mono text-sm text-[#C9D2DA] opacity-0"
              style={{
                animation: `forge-glow 2.4s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-[#E8590C] shrink-0"
                style={{
                  animation: `forge-pulse 2.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                }}
              />
              {agent} Agent
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes forge-glow {
          0% { opacity: 0.25; }
          20% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0.25; }
        }
        @keyframes forge-pulse {
          0% { box-shadow: 0 0 0px rgba(232, 89, 12, 0); }
          20% { box-shadow: 0 0 8px rgba(232, 89, 12, 0.9); }
          60% { box-shadow: 0 0 8px rgba(232, 89, 12, 0.9); }
          100% { box-shadow: 0 0 0px rgba(232, 89, 12, 0); }
        }
      `}</style>
    </div>
  );
}
