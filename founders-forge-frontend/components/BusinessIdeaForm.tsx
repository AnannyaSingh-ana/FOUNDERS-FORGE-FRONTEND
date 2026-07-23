"use client";

import { useState, FormEvent } from "react";
import { PlanFormInput } from "@/lib/types";

interface BusinessIdeaFormProps {
  onSubmit: (input: PlanFormInput) => void;
  errorMessage?: string | null;
}

export default function BusinessIdeaForm({ onSubmit, errorMessage }: BusinessIdeaFormProps) {
  const [businessIdea, setBusinessIdea] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!businessIdea.trim()) return;
    onSubmit({
      business_idea: businessIdea.trim(),
      target_country: targetCountry.trim() || "Global",
      target_customer: targetCustomer.trim() || "General consumers",
    });
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#E8590C] tracking-[0.2em] mb-2">
          INTAKE — SHEET 00
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-[#EDE8DE] tracking-tight mb-3">
          Founders&rsquo; Forge
        </h1>
        <p className="text-[#8AA0B4] text-sm leading-relaxed">
          Describe your idea. A crew of nine research agents will draft a
          grounded business plan: market demand, competitors, historical
          failures, finances, SWOT, marketing, legal notes, an investment
          score, and a founder&rsquo;s verdict.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-[#2A3A4A] bg-[#111A24] rounded-sm p-6 md:p-7 space-y-5"
      >
        <div>
          <label
            htmlFor="business_idea"
            className="block font-mono text-xs uppercase tracking-wider text-[#8AA0B4] mb-2"
          >
            Business idea
          </label>
          <textarea
            id="business_idea"
            required
            rows={4}
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            placeholder="e.g. A subscription box that delivers local, seasonal produce boxes to apartment-dwelling professionals who don't have time to visit farmers markets."
            className="w-full bg-[#0B1220] border border-[#2A3A4A] rounded-sm px-3 py-2 text-[#EDE8DE] placeholder:text-[#4C5C6C] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:border-[#E8590C]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="target_country"
              className="block font-mono text-xs uppercase tracking-wider text-[#8AA0B4] mb-2"
            >
              Target country
            </label>
            <input
              id="target_country"
              type="text"
              value={targetCountry}
              onChange={(e) => setTargetCountry(e.target.value)}
              placeholder="e.g. United States"
              className="w-full bg-[#0B1220] border border-[#2A3A4A] rounded-sm px-3 py-2 text-[#EDE8DE] placeholder:text-[#4C5C6C] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:border-[#E8590C]"
            />
          </div>
          <div>
            <label
              htmlFor="target_customer"
              className="block font-mono text-xs uppercase tracking-wider text-[#8AA0B4] mb-2"
            >
              Target customer
            </label>
            <input
              id="target_customer"
              type="text"
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              placeholder="e.g. Busy urban professionals aged 25-40"
              className="w-full bg-[#0B1220] border border-[#2A3A4A] rounded-sm px-3 py-2 text-[#EDE8DE] placeholder:text-[#4C5C6C] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8590C] focus:border-[#E8590C]"
            />
          </div>
        </div>

        {errorMessage && (
          <p className="text-sm text-[#F4713C] font-mono border border-[#F4713C]/40 bg-[#2A1610] rounded-sm px-3 py-2">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#E8590C] hover:bg-[#D14F09] active:bg-[#B84408] transition-colors text-[#0B1220] font-display font-semibold tracking-wide text-sm py-3 rounded-sm"
        >
          Generate business plan
        </button>
      </form>
    </div>
  );
}
