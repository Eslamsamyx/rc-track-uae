"use client";

import { Accordion, type AccordionItem } from "./Accordion";

export interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
}

export function FaqAccordion({
  questions,
  pageTitle,
  className,
}: {
  questions: FaqQuestion[];
  pageTitle?: string;
  className?: string;
}) {
  const items: AccordionItem[] = questions.map((q) => ({
    id: q.id,
    question: q.question,
    answer: <p>{q.answer}</p>,
  }));

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: pageTitle,
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  });

  return (
    <div className={className}>
      <FaqJsonLd json={jsonLd} />
      <Accordion items={items} allowMultiple />
    </div>
  );
}

function FaqJsonLd({ json }: { json: string }) {
  // JSON.stringify output is safe to inject as schema.org structured data;
  // all inputs come from internal copy maps, not user input.
  const safeJson = json.replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
