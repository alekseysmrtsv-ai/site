

const CASES = [
  {
    category: "Сеть клиник / медицина",
    iconBg: "clinical_notes",
    iconWatermark: "medical_services",
    title: "ИИ-оператор 24/7 вместо потерянных пациентов",
    features: [
      "отвечает за 2 секунды",
      "записывает на приём",
      "подбирает филиал",
      "уточняет симптомы",
      "передаёт срочные случаи администратору",
    ],
    stat: "+17% записей без найма сотрудников",
    statSub: "0 пропущенных ночных обращений",
    cta: "Рассчитать для клиники",
  },
  {
    category: "Девелопер / недвижимость",
    iconBg: "real_estate_agent",
    iconWatermark: "apartment",
    title: "ИИ-квалификатор вместо мусорных лидов",
    features: [
      "собирает бюджет",
      "ипотека / наличные",
      "район / объект",
      "срок покупки",
      "сортирует лиды по приоритету",
    ],
    stat: "до −38% пустых диалогов",
    statSub: "менеджеры работают только с горячими клиентами",
    cta: "Рассчитать для недвижимости",
  },
  {
    category: "Производство / B2B",
    iconBg: "engineering",
    iconWatermark: "factory",
    title: "ИИ-пресейл инженер вместо потери дорогих заявок",
    features: [
      "собирает ТЗ",
      "уточняет параметры",
      "создаёт первичное КП",
      "заводит сделку в CRM",
      "уведомляет отдел продаж",
    ],
    stat: "ответ клиенту за 3 минуты",
    statSub: "вместо 1–2 дней ожидания",
    cta: "Рассчитать для B2B",
  },
  {
    category: "Интернет-магазины",
    iconBg: "storefront",
    iconWatermark: "shopping_cart",
    title: "ИИ-консультант, который не даёт клиенту уйти",
    features: [
      "отвечает по наличию",
      "подбирает товар",
      "помогает оформить заказ",
      "сопровождает после оплаты",
    ],
    stat: "до +22% заявок с трафика",
    statSub: "автоматическое закрытие брошенных корзин",
    cta: "Рассчитать для eCommerce",
  },
];

export default function CasesSection() {
  return (
    <section
      id="cases"
      className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-16 md:py-24"
    >
      {/* Header */}
      <div className="mb-16 max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-heavy tracking-tight leading-tight mb-6">
          Где ИИ уже возвращает деньги бизнесу
        </h2>
        <p className="text-lg text-text-muted font-body leading-relaxed">
          Типовые сценарии внедрения автономных ИИ-агентов для компаний, где
          каждая пропущенная заявка стоит денег.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {CASES.map((c, idx) => (
          <div
            key={idx}
            className="card-hover bg-surface rounded-md border border-border p-8 flex flex-col h-full relative overflow-hidden group"
          >
            {/* Watermark icon */}
            <div className="absolute top-0 right-0 p-6 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
              <span className="material-symbols-outlined text-6xl text-heavy">
                {c.iconWatermark}
              </span>
            </div>

            {/* Category badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-bg flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-xl text-primary">
                  {c.iconBg}
                </span>
              </div>
              <span className="text-[11px] font-bold font-display tracking-widest uppercase text-text-muted">
                {c.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl font-bold mb-6 text-heavy leading-snug min-h-[4rem]">
              {c.title}
            </h3>

            {/* Feature list */}
            <ul className="space-y-4 mb-8 flex-grow">
              {c.features.map((f, fi) => (
                <li
                  key={fi}
                  className="flex items-start gap-3 text-text-muted text-sm font-body"
                >
                  <span
                    className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    check_circle
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Stats box */}
            <div className="bg-bg p-5 rounded-md mb-8 mt-auto border border-border">
              <div className="text-xl font-display font-bold text-primary mb-1">
                {c.stat}
              </div>
              <div className="text-sm font-body text-text-muted">
                {c.statSub}
              </div>
            </div>

            {/* CTA link */}
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 text-primary font-bold font-display text-sm group-hover:translate-x-1 transition-transform"
            >
              {c.cta}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
