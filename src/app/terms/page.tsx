import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия использования | Samartsev AI",
  description:
    "Условия использования сайта samartsev.tech и предоставляемых услуг.",
};

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-heavy transition-colors text-sm font-medium mb-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Вернуться на главную
        </Link>

        <h1 className="font-display text-4xl font-bold text-heavy mb-4">
          Условия использования
        </h1>
        <p
          suppressHydrationWarning
          className="text-text-muted font-body mb-10"
        >
          Последнее обновление: 1 апреля {year}&nbsp;г.
        </p>

        <div className="prose prose-slate max-w-none font-body text-text-main space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              1. Общие положения
            </h2>
            <p className="text-text-muted leading-relaxed">
              Настоящие условия регулируют использование сайта{" "}
              <strong>samartsev.tech</strong> и услуг по внедрению ИИ-автоматизации,
              предоставляемых — Самозанятый Самарцев Алексей (далее — «Исполнитель»).
              Используя сайт, вы соглашаетесь с данными условиями.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              2. Описание услуг
            </h2>
            <p className="text-text-muted leading-relaxed">
              Исполнитель оказывает услуги по проектированию, настройке и
              внедрению автономных ИИ-агентов на базе платформы n8n, включая
              интеграцию с CRM-системами, мессенджерами и другими бизнес-инструментами.
              Конкретный объём работ определяется индивидуальным договором.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              3. Демо-чат на сайте
            </h2>
            <p className="text-text-muted leading-relaxed">
              Чат-виджет на сайте является демонстрацией возможностей ИИ-агента.
              Сообщения, введённые в чат, могут обрабатываться автоматически и
              не являются офертой или юридически обязывающей коммуникацией.
              Данные чата обрабатываются в соответствии с{" "}
              <Link
                href="/privacy"
                className="text-heavy underline hover:text-primary transition-colors"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              4. Калькулятор
            </h2>
            <p className="text-text-muted leading-relaxed">
              Результаты, отображаемые калькулятором упущенной выручки, носят
              оценочный характер и основаны на усреднённых рыночных данных. Они
              не являются гарантией конкретного финансового результата.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              5. Интеллектуальная собственность
            </h2>
            <p className="text-text-muted leading-relaxed">
              Все материалы сайта (дизайн, тексты, логотип, код) являются
              собственностью Исполнителя и защищены законодательством РФ об
              авторском праве. Копирование и распространение без письменного
              согласия запрещено.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              6. Ограничение ответственности
            </h2>
            <p className="text-text-muted leading-relaxed">
              Исполнитель не несёт ответственности за убытки, возникшие в
              результате использования информации с сайта, включая результаты
              калькулятора и рекомендации ИИ-агента. Сайт предоставляется «как
              есть» без каких-либо гарантий.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              7. Изменение условий
            </h2>
            <p className="text-text-muted leading-relaxed">
              Исполнитель оставляет за собой право изменять настоящие условия.
              Актуальная версия всегда доступна на данной странице. Продолжая
              использование сайта после внесения изменений, вы принимаете новые
              условия.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">
              8. Контакты
            </h2>
            <p className="text-text-muted leading-relaxed">
              По всем вопросам:{" "}
              <a
                href="mailto:aleksei.samartsev.ya@yandex.ru"
                className="text-heavy underline hover:text-primary transition-colors"
              >
                aleksei.samartsev.ya@yandex.ru
              </a>{" "}
              или в Telegram:{" "}
              <a
                href="https://t.me/samartsev_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-heavy underline hover:text-primary transition-colors"
              >
                @samartsev_ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
