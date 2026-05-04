import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "landing",
        label: "Лендинг",
        path: "content/landing",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Секция",
            fields: [
              { type: "string", name: "badge", label: "Бейдж (над заголовком)" },
              { type: "string", name: "headline", label: "Заголовок (Вариант А)", ui: { component: "textarea" } },
              { type: "boolean", name: "abTestActive", label: "Включить A/B тест заголовка", description: "Если включено, 50% пользователей увидят Вариант B." },
              { type: "string", name: "headlineB", label: "Заголовок (Вариант B)", ui: { component: "textarea" } },
              { type: "string", name: "description", label: "Описание", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "Основная кнопка" },
              { type: "string", name: "ctaSecondary", label: "Вторичная кнопка" },

            ],
          },
          {
            type: "object",
            name: "calculator",
            label: "Калькулятор",
            fields: [
              { type: "string", name: "title", label: "Заголовок" },
              { type: "string", name: "leadsLabel", label: "Метка: Лидов в месяц" },
              { type: "string", name: "checkLabel", label: "Метка: Средний чек" },
              { type: "string", name: "lossLabel", label: "Метка: Потеря лидов" },
              { type: "string", name: "resultLabel", label: "Текст результата" },
              { type: "string", name: "resultSub", label: "Подтекст результата" },
            ],
          },
          {
            type: "object",
            list: true,
            name: "faq",
            label: "FAQ",
            ui: {
              itemProps: (item) => ({ label: item?.q || "Новый вопрос" }),
            },
            fields: [
              { type: "string", name: "q", label: "Вопрос" },
              { type: "string", name: "a", label: "Ответ", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "techStack",
            label: "Технологический Стек",
            fields: [
              { type: "string", name: "label", label: "Верхняя метка" },
              { type: "string", name: "title", label: "Заголовок", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "items",
                label: "Технологии",
                ui: { itemProps: (item) => ({ label: item?.name || "Новая технология" }) },
                fields: [
                  { type: "string", name: "name", label: "Название" },
                  { type: "string", name: "desc", label: "Описание" },
                  { type: "image", name: "logo", label: "Логотип (SVG/PNG)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "solutions",
            label: "Отраслевые Решения",
            fields: [
              { type: "string", name: "title", label: "Заголовок" },
              { type: "string", name: "description", label: "Описание", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "items",
                label: "Решения",
                ui: { itemProps: (item) => ({ label: item?.title || "Новое решение" }) },
                fields: [
                  { type: "string", name: "icon", label: "Иконка (Material Symbols)" },
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "description", label: "Описание", ui: { component: "textarea" } },
                  {
                    type: "object",
                    list: true,
                    name: "features",
                    label: "Фичи (детализация)",
                    ui: { itemProps: (item) => ({ label: item?.bold || "Новая фича" }) },
                    fields: [
                      { type: "string", name: "icon", label: "Иконка (Material Symbols)" },
                      { type: "string", name: "bold", label: "Заголовок (жирный)" },
                      { type: "string", name: "text", label: "Описание", ui: { component: "textarea" } },
                    ],
                  },
                ]
              }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "Как мы работаем",
            fields: [
              { type: "string", name: "title", label: "Заголовок" },
              { type: "string", name: "description", label: "Описание", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "steps",
                label: "Шаги",
                ui: { itemProps: (item) => ({ label: item?.title || "Новый шаг" }) },
                fields: [
                  { type: "string", name: "n", label: "Номер" },
                  { type: "string", name: "title", label: "Заголовок" },
                  { type: "string", name: "desc", label: "Описание", ui: { component: "textarea" } },
                ]
              }
            ]
          },
          {
            type: "object",
            name: "chatWidget",
            label: "💬 Чат-виджет",
            fields: [
              { type: "string", name: "greeting", label: "Приветственное сообщение", ui: { component: "textarea" } },
              { type: "string", name: "subtitle", label: "Подпись под виджетом" },
              {
                type: "object",
                list: true,
                name: "faqButtons",
                label: "FAQ-кнопки (быстрые ответы)",
                ui: {
                  itemProps: (item) => ({ label: `${item?.emoji || "❓"} ${item?.label || "Новый вопрос"}` }),
                  defaultItem: {
                    emoji: "❓",
                    label: "Новый вопрос",
                    answer: "Ответ...",
                    followUp: "",
                    keywords: "",
                  },
                },
                fields: [
                  { type: "string", name: "emoji", label: "Эмодзи", description: "Одна иконка, например: 🤖 ⚙️ ⏱️ 🔒 📈" },
                  { type: "string", name: "label", label: "Текст кнопки", description: "Короткий текст для кнопки" },
                  { type: "string", name: "answer", label: "Ответ", ui: { component: "textarea" }, description: "Мгновенный ответ (без LLM, 0 токенов)" },
                  { type: "string", name: "followUp", label: "Уточняющий вопрос (необязательно)", ui: { component: "textarea" }, description: "Доп. сообщение после ответа для продолжения диалога" },
                  { type: "string", name: "keywords", label: "Ключевые слова (через запятую)", description: "Для автоматического определения из текста, например: что делаете, чем занимаетесь, какие услуги" },
                ],
              },
            ],
          },


        ],
      },
    ],
  },



});

