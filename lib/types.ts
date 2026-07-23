// The full shape of a generated business plan, matching the FastAPI backend's
// /generate-plan and /plans/{id} response (the "plan" field / "plan_json" field).
//
// Several fields below are typed loosely (string | number, or string | object)
// because different LLM runs of the same agent don't always return the exact
// same shape — the components that render these are written to handle either.

export type Source = string | { name?: string; url?: string };

export interface MarketResearch {
  demand_signals: string[];
  market_trends: string[];
  estimated_market_size: string;
  summary: string;
  sources: (string | { name?: string; url?: string })[];
  confidence: string;
  confidence_reason: string;
}

export interface Competitor {
  name: string;
  positioning: string;
}

export interface CompetitorAnalysis {
  competitors: Competitor[];
  market_gaps: string[];
  summary: string;
  sources: (string | { name?: string; url?: string })[];
  confidence: string;
  confidence_reason: string;
}

export interface SimilarFailure {
  name: string;
  reason_for_failure: string;
  market: string;
}

export interface HistoricalFailures {
  similar_failures: SimilarFailure[];
  lessons: string[];
  summary: string;
  sources: (string | { name?: string; url?: string })[];
  confidence: string;
  confidence_reason: string;
}

export interface Finance {
  currency: string;
  startup_cost: number | string;
  monthly_burn: number | string;
  breakeven_months: number | string;
  breakeven_note: string;
  expected_pricing: string;
  assumed_customers_month_12: number | string;
  cac: number | string;
  ltv: number | string;
  gross_margin: string;
  assumptions: string[];
  disclaimer: string;
}

export interface Swot {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export type GoToMarketIdea = string | { idea?: string; description?: string };

export interface Marketing {
  positioning: string;
  go_to_market_ideas: GoToMarketIdea[];
}

export interface Legal {
  considerations: string[];
  disclaimer: string;
}

export interface InvestmentScore {
  market_potential: number;
  competition: number;
  execution_difficulty: number;
  moat: number;
  overall_score: number;
  reasoning: string;
}

export interface FounderAdvisor {
  launch_decision: string;
  reason: string;
  biggest_risk: string;
  mvp_suggestion: string;
  first_100_customers: string;
  next_30_days: string[];
}

export interface BusinessPlan {
  idea: string;
  target_country: string;
  target_customer: string;
  market_research: MarketResearch;
  competitor_analysis: CompetitorAnalysis;
  historical_failures: HistoricalFailures;
  finance: Finance;
  swot: Swot;
  marketing: Marketing;
  legal: Legal;
  investment_score: InvestmentScore;
  founder_advisor: FounderAdvisor;
  overall_verdict: string;
}

export interface GeneratePlanResponse {
  success: boolean;
  plan: BusinessPlan | null;
  raw_output: string | null;
  error: string | null;
}

export interface PlanFormInput {
  business_idea: string;
  target_country: string;
  target_customer: string;
}
