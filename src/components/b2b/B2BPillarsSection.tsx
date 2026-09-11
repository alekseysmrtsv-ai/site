"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Sliders,
  GraduationCap,
  CheckCircle2,
  FileSpreadsheet,
  FileCheck,
  Search,
  Sparkles,
  ArrowRight,
  Database,
  HelpCircle,
  UserCheck,
  BookOpen,
} from "lucide-react";

interface PillarItem {
  title: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
}

interface PillarCategory {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  items: PillarItem[];
}

const PILLARS: PillarCategory[] = [
  {
    id: "sales",
    badge: "1️⃣ Направление",
    title: "Продажи",
    subtitle:
      "Обработка лидов без задержек, генерация точных предложений за секунды и прозрачный мониторинг рынка.",
    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
    color: "emerald",
    items: [
      {
        title: "Обработка заявок 24/7",
        description:
          "Алгоритм мгновенно принимает обращение из любого канала (сайт, мессенджеры, почта), задает уточняющие квалификационные вопросы и сразу фиксирует сделку со всеми полями в CRM. Менеджер получает готового теплого клиента.",
        benefit: "0 пропущенных ночных лидов · Ответ за 2 секунды",
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      },
      {
        title: "Генерация коммерческих предложений",
        description:
          "Нейросеть мгновенно считывает данные из заявки или переписки, сверяет актуальные остатки и прайс-листы в CRM/1С и собирает индивидуальное брендированное КП в PDF под конкретного заказчика за несколько секунд.",
        benefit: "Сокращение времени расчета с 3 часов до 30 секунд",
        icon: <FileCheck className="w-5 h-5 text-emerald-500" />,
      },
      {
        title: "Мониторинг конкурентов",
        description:
          "Автономный скрипт регулярно обходит сайты, каталоги и прайсы конкурентов. Система автоматически фиксирует изменения цен, появление новинок или акций и выгружает данные в удобную сводную таблицу для коммерческого директора.",
        benefit: "Всегда актуальное позиционирование и защита маржи",
        icon: <Search className="w-5 h-5 text-emerald-500" />,
      },
    ],
  },
  {
    id: "ops",
    badge: "2️⃣ Направление",
    title: "Операционка",
    subtitle:
      "Устранение самых больших невидимых затрат компании: ручной перебивки данных, ошибок в договорах и хаоса в отчетах.",
    icon: <Sliders className="w-6 h-6 text-primary" />,
    color: "primary",
    items: [
      {
        title: "Автоматическая работа с документами",
        description:
          "Алгоритм сам вытаскивает реквизиты (ИНН, КПП, подписант, банковские счета) из входящих писем, сканов или карточек и автоматически формирует типовые договоры, акты и счета по вашему корпоративному шаблону.",
        benefit: "Исключение опечаток · Экономия до 40 ч юриста и бэк-офиса",
        icon: <FileCheck className="w-5 h-5 text-primary" />,
      },
      {
        title: "Сверка отчетов и сквозные дашборды",
        description:
          "Скрипты автоматически собирают фактические цифры из нескольких разных систем (1C, CRM, банки, рекламные кабинеты, таблицы складов) и сводят их в единый понятный дашборд для собственника.",
        benefit: "Управленческие отчеты в реальном времени без задержек",
        icon: <FileSpreadsheet className="w-5 h-5 text-primary" />,
      },
      {
        title: "Бесшовный перенос данных",
        description:
          "Программа связывает сервисы через API и исключает ручной дублирующий ввод информации при переносе заявок и оплат между CRM, 1С, складскими и логистическими сервисами.",
        benefit: "0 потерянных заказов · Полный порядок в базах данных",
        icon: <Database className="w-5 h-5 text-primary" />,
      },
    ],
  },
  {
    id: "knowledge",
    badge: "3️⃣ Направление",
    title: "Знания компании",
    subtitle:
      "Устранение потерь времени на поиск внутренней информации, разгрузка руководителей и ускоренный ввод новых сотрудников.",
    icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
    color: "amber",
    items: [
      {
        title: "Единая корпоративная база знаний",
        description:
          "Бизнес годами копит регламенты в виде десятков разрозненных файлов в Google Drive, Word и чатах. ИИ объединяет их в единый умный векторный индекс для мгновенного семантического поиска информации.",
        benefit: "Ответ на любой регламентный вопрос за 1 секунду",
        icon: <BookOpen className="w-5 h-5 text-amber-500" />,
      },
      {
        title: "Мгновенные ответы на внутренние вопросы",
        description:
          "Команда постоянно отвлекает руководителей однотипными процедурными запросами. Внутренний корпоративный ассистент выдает точные ответы строго на основе утвержденных правил компании моментально.",
        benefit: "Разгрузка РОПа, тимлидов и HR-специалистов на 50%+",
        icon: <HelpCircle className="w-5 h-5 text-amber-500" />,
      },
      {
        title: "Адаптация и обучение новичков",
        description:
          "Обучение нового сотрудника обычно отнимает часы рабочего времени старших специалистов. Цифровой наставник самостоятельно проводит стажера по всем процессам, отвечает на вопросы и проверяет усвоение знаний.",
        benefit: "Сокращение онбординга с 3 недель до 5 дней",
        icon: <UserCheck className="w-5 h-5 text-amber-500" />,
      },
      {
        title: "Ассистент по документации на звонке",
        description:
          "Менеджеры часто тратят время на чтение сложных 60-страничных инструкций и регламентов перед ответом клиенту. Алгоритм сам находит нужный пункт договора или техническое условие и выводит его на экран за долю секунды.",
        benefit: "Уверенные ответы клиенту без пауз «я уточню и перезвоню»",
        icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      },
    ],
  },
];

export default function B2BPillarsSection() {
  const [activeTab, setActiveTab] = useState<string>("sales");

  const currentPillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <section id="pillars" className="w-full py-20 bg-bg text-heavy border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
            <span>🧩</span>
            <span>Системная экосистема</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            Три столпа автоматизации бизнеса
          </h2>
          <p className="text-text-muted text-base md:text-lg font-body leading-relaxed">
            Автоматизация дает максимальный ROI, когда решает задачи не точечно, а закрывает сквозную цепочку: от первого касания клиента до внутренней отчетности и обучения команды.
          </p>
        </div>

        {/* Pillar Switcher Navigation */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-surface rounded-2xl border border-border/80 max-w-2xl w-full">
            {PILLARS.map((pillar) => {
              const isActive = pillar.id === activeTab;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`py-3 px-4 rounded-xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all ${
                    isActive
                      ? "bg-bg text-heavy border border-border shadow-md"
                      : "text-text-muted hover:text-heavy hover:bg-bg/40"
                  }`}
                >
                  <span className="shrink-0">{pillar.icon}</span>
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Pillar Card Breakdown */}
        <div className="bg-surface border border-border rounded-3xl p-6 sm:p-10 shadow-card">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {currentPillar.badge}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-heavy">
              {currentPillar.title}
            </h3>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              {currentPillar.subtitle}
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentPillar.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-bg border border-border/80 hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-heavy">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <span className="text-[11px] sm:text-xs font-semibold text-primary flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{item.benefit}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
