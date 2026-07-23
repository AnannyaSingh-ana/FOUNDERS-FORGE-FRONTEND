import { ReactNode } from "react";

interface SectionProps {
  code: string; // e.g. "01" — a schematic sheet number
  title: string;
  confidence?: string;
  children: ReactNode;
}

export default function Section({ code, title, confidence, children }: SectionProps) {
  return (
    <section className="relative border border-[#2A3A4A] bg-[#111A24] rounded-sm p-6 md:p-7">
      {/* corner marks, like a drafting sheet */}
      <span className="absolute -top-px -left-px w-3 h-3 border-t border-l border-[#E8590C]" />
      <span className="absolute -top-px -right-px w-3 h-3 border-t border-r border-[#E8590C]" />
      <span className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-[#E8590C]" />
      <span className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-[#E8590C]" />

      <div className="flex items-baseline justify-between gap-4 mb-4 border-b border-[#233040] pb-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-[#E8590C] tracking-widest">
            SHEET {code}
          </span>
          <h2 className="font-display text-xl md:text-2xl text-[#EDE8DE] tracking-tight">
            {title}
          </h2>
        </div>
        {confidence && (
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8AA0B4] shrink-0">
            confidence: {confidence}
          </span>
        )}
      </div>

      <div className="text-[#C9D2DA] text-sm leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}
