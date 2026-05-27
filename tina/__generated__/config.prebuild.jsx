// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "landing",
        label: "\u041B\u0435\u043D\u0434\u0438\u043D\u0433",
        path: "content/landing",
        format: "json",
        ui: {
          allowedActions: {
            create: true,
            delete: true
          }
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero \u0421\u0435\u043A\u0446\u0438\u044F",
            fields: [
              { type: "string", name: "badge", label: "\u0411\u0435\u0439\u0434\u0436 (\u043D\u0430\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C)" },
              { type: "string", name: "headline", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0412\u0430\u0440\u0438\u0430\u043D\u0442 \u0410)", ui: { component: "textarea" } },
              { type: "boolean", name: "abTestActive", label: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C A/B \u0442\u0435\u0441\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430", description: "\u0415\u0441\u043B\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E, 50% \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0443\u0432\u0438\u0434\u044F\u0442 \u0412\u0430\u0440\u0438\u0430\u043D\u0442 B." },
              { type: "string", name: "headlineB", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0412\u0430\u0440\u0438\u0430\u043D\u0442 B)", ui: { component: "textarea" } },
              { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              { type: "string", name: "ctaPrimary", label: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0430" },
              { type: "string", name: "ctaSecondary", label: "\u0412\u0442\u043E\u0440\u0438\u0447\u043D\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0430" }
            ]
          },
          {
            type: "object",
            name: "calculator",
            label: "\u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440",
            fields: [
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "leadsLabel", label: "\u041C\u0435\u0442\u043A\u0430: \u041B\u0438\u0434\u043E\u0432 \u0432 \u043C\u0435\u0441\u044F\u0446" },
              { type: "string", name: "checkLabel", label: "\u041C\u0435\u0442\u043A\u0430: \u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0447\u0435\u043A" },
              { type: "string", name: "lossLabel", label: "\u041C\u0435\u0442\u043A\u0430: \u041F\u043E\u0442\u0435\u0440\u044F \u043B\u0438\u0434\u043E\u0432" },
              { type: "string", name: "resultLabel", label: "\u0422\u0435\u043A\u0441\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430" },
              { type: "string", name: "resultSub", label: "\u041F\u043E\u0434\u0442\u0435\u043A\u0441\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "faq",
            label: "FAQ",
            ui: {
              itemProps: (item) => ({ label: item?.q || "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441" })
            },
            fields: [
              { type: "string", name: "q", label: "\u0412\u043E\u043F\u0440\u043E\u0441" },
              { type: "string", name: "a", label: "\u041E\u0442\u0432\u0435\u0442", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "techStack",
            label: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0421\u0442\u0435\u043A",
            fields: [
              { type: "string", name: "label", label: "\u0412\u0435\u0440\u0445\u043D\u044F\u044F \u043C\u0435\u0442\u043A\u0430" },
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "items",
                label: "\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438",
                ui: { itemProps: (item) => ({ label: item?.name || "\u041D\u043E\u0432\u0430\u044F \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F" }) },
                fields: [
                  { type: "string", name: "name", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" },
                  { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" },
                  { type: "image", name: "logo", label: "\u041B\u043E\u0433\u043E\u0442\u0438\u043F (SVG/PNG)" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "solutions",
            label: "\u041E\u0442\u0440\u0430\u0441\u043B\u0435\u0432\u044B\u0435 \u0420\u0435\u0448\u0435\u043D\u0438\u044F",
            fields: [
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "items",
                label: "\u0420\u0435\u0448\u0435\u043D\u0438\u044F",
                ui: { itemProps: (item) => ({ label: item?.title || "\u041D\u043E\u0432\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435" }) },
                fields: [
                  { type: "string", name: "icon", label: "\u0418\u043A\u043E\u043D\u043A\u0430 (Material Symbols)" },
                  { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
                  { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E/\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", ui: { component: "textarea" } },
                  { type: "string", name: "stat", label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u043C\u0435\u0442\u0440\u0438\u043A\u0430 \u043A\u0435\u0439\u0441\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: +17% \u0437\u0430\u043F\u0438\u0441\u0435\u0439)" },
                  { type: "string", name: "statSub", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u043C\u0435\u0442\u0440\u0438\u043A\u0438 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 0 \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432)" },
                  { type: "string", name: "cta", label: "\u041F\u0440\u0438\u0437\u044B\u0432 \u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044E (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0434\u043B\u044F \u043A\u043B\u0438\u043D\u0438\u043A\u0438)" },
                  {
                    type: "object",
                    list: true,
                    name: "features",
                    label: "\u0424\u0438\u0447\u0438 (\u0434\u0435\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F)",
                    ui: { itemProps: (item) => ({ label: item?.bold || "\u041D\u043E\u0432\u0430\u044F \u0444\u0438\u0447\u0430" }) },
                    fields: [
                      { type: "string", name: "icon", label: "\u0418\u043A\u043E\u043D\u043A\u0430 (Material Symbols)" },
                      { type: "string", name: "bold", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (\u0436\u0438\u0440\u043D\u044B\u0439)" },
                      { type: "string", name: "text", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "\u041A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C",
            fields: [
              { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
              { type: "string", name: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "steps",
                label: "\u0428\u0430\u0433\u0438",
                ui: { itemProps: (item) => ({ label: item?.title || "\u041D\u043E\u0432\u044B\u0439 \u0448\u0430\u0433" }) },
                fields: [
                  { type: "string", name: "n", label: "\u041D\u043E\u043C\u0435\u0440" },
                  { type: "string", name: "title", label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
                  { type: "string", name: "desc", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "chatWidget",
            label: "\u{1F4AC} \u0427\u0430\u0442-\u0432\u0438\u0434\u0436\u0435\u0442",
            fields: [
              { type: "string", name: "greeting", label: "\u041F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", ui: { component: "textarea" } },
              { type: "string", name: "subtitle", label: "\u041F\u043E\u0434\u043F\u0438\u0441\u044C \u043F\u043E\u0434 \u0432\u0438\u0434\u0436\u0435\u0442\u043E\u043C" },
              {
                type: "object",
                list: true,
                name: "faqButtons",
                label: "FAQ-\u043A\u043D\u043E\u043F\u043A\u0438 (\u0431\u044B\u0441\u0442\u0440\u044B\u0435 \u043E\u0442\u0432\u0435\u0442\u044B)",
                ui: {
                  itemProps: (item) => ({ label: `${item?.emoji || "\u2753"} ${item?.label || "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441"}` }),
                  defaultItem: {
                    emoji: "\u2753",
                    label: "\u041D\u043E\u0432\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441",
                    answer: "\u041E\u0442\u0432\u0435\u0442...",
                    followUp: "",
                    keywords: ""
                  }
                },
                fields: [
                  { type: "string", name: "emoji", label: "\u042D\u043C\u043E\u0434\u0437\u0438", description: "\u041E\u0434\u043D\u0430 \u0438\u043A\u043E\u043D\u043A\u0430, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u{1F916} \u2699\uFE0F \u23F1\uFE0F \u{1F512} \u{1F4C8}" },
                  { type: "string", name: "label", label: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438", description: "\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u043A\u043D\u043E\u043F\u043A\u0438" },
                  { type: "string", name: "answer", label: "\u041E\u0442\u0432\u0435\u0442", ui: { component: "textarea" }, description: "\u041C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 (\u0431\u0435\u0437 LLM, 0 \u0442\u043E\u043A\u0435\u043D\u043E\u0432)" },
                  { type: "string", name: "followUp", label: "\u0423\u0442\u043E\u0447\u043D\u044F\u044E\u0449\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", ui: { component: "textarea" }, description: "\u0414\u043E\u043F. \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u0432\u0435\u0442\u0430 \u0434\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F \u0434\u0438\u0430\u043B\u043E\u0433\u0430" },
                  { type: "string", name: "keywords", label: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043B\u043E\u0432\u0430 (\u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E)", description: "\u0414\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u044F \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u0430, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442\u0435, \u0447\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0435\u0441\u044C, \u043A\u0430\u043A\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
