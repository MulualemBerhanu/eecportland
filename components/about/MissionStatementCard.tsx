"use client";

import { useRef } from "react";

type Props = {
  title: string;
  verse: string;
  summary: string;
  fullBody: string;
};

export function MissionStatementCard({ title, verse, summary, fullBody }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <article className="rounded-3xl border border-cream-200 bg-white p-8 shadow-sm sm:p-10">
      <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">{title}</p>
      <p className="mt-4 text-sm leading-relaxed text-charcoal-700">{verse}</p>
      <p className="mt-5 leading-relaxed text-charcoal-700">{summary}</p>

      <details ref={detailsRef} className="group mt-5 rounded-2xl border border-cream-200 bg-cream-50/60 p-4">
        <summary className="cursor-pointer list-none text-sm font-semibold text-navy-950">
          Read full mission statement
        </summary>
        <p className="mt-3 whitespace-pre-line leading-relaxed text-charcoal-700">{fullBody}</p>
        <button
          type="button"
          onClick={() => {
            if (detailsRef.current) detailsRef.current.open = false;
          }}
          className="mt-4 text-sm font-semibold text-gold-700 underline decoration-gold-500/35 underline-offset-2 hover:text-navy-950"
        >
          Minimize full mission statement
        </button>
      </details>
    </article>
  );
}
