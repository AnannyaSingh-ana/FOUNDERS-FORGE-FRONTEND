import { BusinessPlan } from "@/lib/types";
import Section from "@/components/ui/Section";

interface PlanResultsProps {
  plan: BusinessPlan;
  onStartOver: () => void;
}

function BulletList({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="space-y-1.5 list-none">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-[#E8590C] mt-1 text-[10px]">&#9670;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SourceList({ sources }: { sources: string[] }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="pt-2 mt-2 border-t border-[#233040]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#4C5C6C] mb-1">
        Sources
      </p>
      <ul className="space-y-1">
        {sources.map((src, i) => (
          <li key={i} className="text-xs text-[#6E8496] truncate">
            {src}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-[#233040] rounded-sm px-3 py-2.5">
      <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">
        {label}
      </p>
      <p className="font-mono text-lg text-[#EDE8DE]">{value}</p>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, (value / 10) * 100));
  return (
    <div>
      <div className="flex justify-between font-mono text-xs mb-1">
        <span className="text-[#8AA0B4] uppercase tracking-wider">{label}</span>
        <span className="text-[#EDE8DE]">{value}/10</span>
      </div>
      <div className="h-1.5 bg-[#0B1220] rounded-full overflow-hidden border border-[#233040]">
        <div
          className="h-full bg-[#E8590C]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function PlanResults({ plan, onStartOver }: PlanResultsProps) {
  const {
    market_research,
    competitor_analysis,
    historical_failures,
    finance,
    swot,
    marketing,
    legal,
    investment_score,
    founder_advisor,
    overall_verdict,
  } = plan;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-xs text-[#E8590C] tracking-[0.2em] mb-2">
            COMPLETED PLAN
          </p>
          <h1 className="font-display text-2xl md:text-3xl text-[#EDE8DE] tracking-tight">
            {plan.idea}
          </h1>
          <p className="text-[#8AA0B4] text-sm mt-1">
            {plan.target_country} &middot; {plan.target_customer}
          </p>
        </div>
        <button
          onClick={onStartOver}
          className="font-mono text-xs uppercase tracking-wider border border-[#2A3A4A] text-[#C9D2DA] hover:border-[#E8590C] hover:text-[#E8590C] transition-colors px-4 py-2 rounded-sm shrink-0"
        >
          Start over
        </button>
      </div>

      {/* Overall verdict banner */}
      <div className="border border-[#E8590C]/50 bg-[#1A1006] rounded-sm px-5 py-4 mb-8">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#E8590C] mb-1">
          Overall verdict
        </p>
        <p className="text-[#EDE8DE] text-sm leading-relaxed">{overall_verdict}</p>
      </div>

      <div className="space-y-6">
        <Section code="01" title="Market Research" confidence={market_research.confidence}>
          <p>{market_research.summary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">
                Demand signals
              </p>
              <BulletList items={market_research.demand_signals} />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">
                Market trends
              </p>
              <BulletList items={market_research.market_trends} />
            </div>
          </div>
          <Stat label="Estimated market size" value={market_research.estimated_market_size} />
          <p className="text-xs text-[#6E8496] italic">{market_research.confidence_reason}</p>
          <SourceList sources={market_research.sources} />
        </Section>

        <Section code="02" title="Competitor Analysis" confidence={competitor_analysis.confidence}>
          <p>{competitor_analysis.summary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {competitor_analysis.competitors.map((c, i) => (
              <div key={i} className="border border-[#233040] rounded-sm px-3 py-2.5">
                <p className="text-[#EDE8DE] font-medium text-sm">{c.name}</p>
                <p className="text-xs text-[#8AA0B4] mt-1">{c.positioning}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              Market gaps
            </p>
            <BulletList items={competitor_analysis.market_gaps} />
          </div>
          <p className="text-xs text-[#6E8496] italic">{competitor_analysis.confidence_reason}</p>
          <SourceList sources={competitor_analysis.sources} />
        </Section>

        <Section code="03" title="Historical Failures" confidence={historical_failures.confidence}>
          <p>{historical_failures.summary}</p>
          <div className="space-y-2 pt-1">
            {historical_failures.similar_failures.map((f, i) => (
              <div key={i} className="border border-[#233040] rounded-sm px-3 py-2.5">
                <p className="text-[#EDE8DE] font-medium text-sm">
                  {f.name} <span className="text-[#6E8496] font-normal">&mdash; {f.market}</span>
                </p>
                <p className="text-xs text-[#8AA0B4] mt-1">{f.reason_for_failure}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              Lessons to apply
            </p>
            <BulletList items={historical_failures.lessons} />
          </div>
          <p className="text-xs text-[#6E8496] italic">{historical_failures.confidence_reason}</p>
          <SourceList sources={historical_failures.sources} />
        </Section>

        <Section code="04" title="Finance">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Startup cost" value={`${finance.currency} ${finance.startup_cost.toLocaleString()}`} />
            <Stat label="Monthly burn" value={`${finance.currency} ${finance.monthly_burn.toLocaleString()}`} />
            <Stat label="Breakeven" value={`${finance.breakeven_months} mo`} />
            <Stat label="Gross margin" value={finance.gross_margin} />
            <Stat label="Expected pricing" value={finance.expected_pricing} />
            <Stat label="Customers (mo 12)" value={finance.assumed_customers_month_12.toLocaleString()} />
            <Stat label="CAC" value={`${finance.currency} ${finance.cac.toLocaleString()}`} />
            <Stat label="LTV" value={`${finance.currency} ${finance.ltv.toLocaleString()}`} />
          </div>
          <p className="text-xs text-[#8AA0B4] pt-1">{finance.breakeven_note}</p>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              Assumptions
            </p>
            <BulletList items={finance.assumptions} />
          </div>
          <p className="text-xs text-[#6E8496] italic pt-1">{finance.disclaimer}</p>
        </Section>

        <Section code="05" title="SWOT">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-[#233040] rounded-sm px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">Strengths</p>
              <BulletList items={swot.strengths} />
            </div>
            <div className="border border-[#233040] rounded-sm px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">Weaknesses</p>
              <BulletList items={swot.weaknesses} />
            </div>
            <div className="border border-[#233040] rounded-sm px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">Opportunities</p>
              <BulletList items={swot.opportunities} />
            </div>
            <div className="border border-[#233040] rounded-sm px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1">Threats</p>
              <BulletList items={swot.threats} />
            </div>
          </div>
        </Section>

        <Section code="06" title="Marketing">
          <p>{marketing.positioning}</p>
          <div className="space-y-2 pt-1">
            {marketing.go_to_market_ideas.map((idea, i) => (
              <div key={i} className="border border-[#233040] rounded-sm px-3 py-2.5">
                <p className="text-[#EDE8DE] font-medium text-sm">{idea.idea}</p>
                <p className="text-xs text-[#8AA0B4] mt-1">{idea.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section code="07" title="Legal">
          <BulletList items={legal.considerations} />
          <p className="text-xs text-[#6E8496] italic pt-1">{legal.disclaimer}</p>
        </Section>

        <Section code="08" title="Investment Score">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ScoreBar label="Market potential" value={investment_score.market_potential} />
            <ScoreBar label="Competition" value={investment_score.competition} />
            <ScoreBar label="Execution difficulty" value={investment_score.execution_difficulty} />
            <ScoreBar label="Moat" value={investment_score.moat} />
          </div>
          <div className="pt-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[#6E8496] mb-1">
              Overall score: <span className="text-[#E8590C]">{investment_score.overall_score}/10</span>
            </p>
            <p>{investment_score.reasoning}</p>
          </div>
        </Section>

        <Section code="09" title="Founder Advisor">
          <p className="font-mono text-xs uppercase tracking-wider text-[#E8590C]">
            {founder_advisor.launch_decision}
          </p>
          <p>{founder_advisor.reason}</p>
          <Stat label="Biggest risk" value={founder_advisor.biggest_risk} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              MVP suggestion
            </p>
            <p>{founder_advisor.mvp_suggestion}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              First 100 customers
            </p>
            <p>{founder_advisor.first_100_customers}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#6E8496] mb-1 mt-2">
              Next 30 days
            </p>
            <BulletList items={founder_advisor.next_30_days} />
          </div>
        </Section>
      </div>
    </div>
  );
}
