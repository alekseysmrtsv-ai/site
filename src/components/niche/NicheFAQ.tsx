import { FAQItem } from "@/types/landing";

interface NicheFAQProps {
  faqItems: FAQItem[];
}

export default function NicheFAQ({ faqItems }: NicheFAQProps) {
  return (
    <section id="faq" className="py-16 px-6 bg-surface border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heavy">
            Частые вопросы
          </h2>
          <p className="text-text-muted text-lg font-body">
            Всё, что нужно знать перед стартом интеграции.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqItems.map((item: FAQItem) => (
            <details
              key={item.q}
              className="group bg-surface border border-border rounded-md p-6 shadow-subtle hover:border-primary transition-colors duration-200"
            >
              <summary className="flex justify-between items-center cursor-pointer font-display text-base font-semibold text-heavy gap-4 select-none">
                <span>{item.q}</span>
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-transform duration-200 group-open:rotate-45 flex-shrink-0">
                  add
                </span>
              </summary>
              <p className="mt-4 text-text-muted leading-relaxed text-sm font-body">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
