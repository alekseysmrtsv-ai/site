import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности | Samartsev AI",
  description: "Политика обработки персональных данных в соответствии с ФЗ №152.",
};

export default function PrivacyPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen dot-grid">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-heavy transition-colors text-sm font-medium mb-10"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Вернуться на главную
        </Link>

        <h1 className="font-display text-4xl font-bold text-heavy mb-4">
          Политика конфиденциальности
        </h1>
        <p suppressHydrationWarning className="text-text-muted font-body mb-10">Последнее обновление: 1 апреля {year}&nbsp;г.</p>

        <div className="prose prose-slate max-w-none font-body text-text-main space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">1. Общие положения</h2>
            <p className="text-text-muted leading-relaxed">
              Настоящая политика конфиденциальности определяет порядок обработки персональных данных
              пользователей сайта <strong>samartsev.tech</strong> в соответствии с Федеральным законом
              №152-ФЗ «О персональных данных».
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Имя и контактная информация (телефон или email), указанные в форме обратной связи</li>
              <li>Сообщения, отправленные через демо-чат</li>
              <li>Технические данные: IP-адрес, браузер, ОС (в рамках аналитики)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">3. Цели обработки</h2>
            <ul className="list-disc pl-6 text-text-muted space-y-2">
              <li>Обработка входящих заявок и связь с потенциальными клиентами</li>
              <li>Улучшение качества сервиса</li>
              <li>Отправка коммерческих предложений (только с вашего согласия)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">4. Хранение и защита</h2>
            <p className="text-text-muted leading-relaxed">
              Данные хранятся на защищённых серверах. Мы не передаём ваши персональные данные третьим
              лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">5. Ваши права</h2>
            <p className="text-text-muted leading-relaxed">
              Вы вправе в любой момент запросить удаление, изменение или предоставление ваших данных.
              Для этого напишите на <a href="mailto:hello@samartsev.tech" className="text-heavy underline hover:text-primary transition-colors">hello@samartsev.tech</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">6. Cookies</h2>
            <p className="text-text-muted leading-relaxed">
              Сайт использует cookies для улучшения работы. Вы можете отключить cookies в настройках
              браузера, однако это может повлиять на функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-heavy mb-3">7. Контакты</h2>
            <p className="text-text-muted leading-relaxed">
              По вопросам обработки персональных данных: <a href="mailto:hello@samartsev.tech" className="text-heavy underline hover:text-primary transition-colors">hello@samartsev.tech</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
