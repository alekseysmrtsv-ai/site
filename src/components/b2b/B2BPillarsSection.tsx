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
  AlertCircle,
  Link2,
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
  items: PillarItem[];
}

const PILLARS: PillarCategory[] = [
  {
    id: "sales",
    badge: "1️⃣ Первое направление",
    title: "Продажи",
    subtitle:
      "Обработка обращений без задержек, мгновенный расчет сложных смет и прозрачный мониторинг конкурентов.",
    icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    items: [
      {
        title: "Обработка заявок 24/7",
        description:
          "Алгоритм мгновенно принимает обращение из любого канала (сайт, WhatsApp, Telegram, почта), задает квалифицирующие вопросы по чек-листу и сразу фиксирует готовую сделку в CRM. Менеджер утром получает уже прогретого клиента.",
        benefit: "0 пропущенных ночных лидов · Ответ за 2 секунды",
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      },
      {
        title: "Генерация коммерческих предложений",
        description:
          "Нейросеть считывает номенклатуру из входящей спецификации, сверяет остатки и актуальный прайс в CRM/1С и собирает персонализированное КП в PDF под конкретного заказчика за 30 секунд.",
        benefit: "Сокращение времени расчета с 3 часов до 30 секунд",
        icon: <FileCheck className="w-5 h-5 text-emerald-400" />,
      },
      {
        title: "Мониторинг конкурентов",
        description:
          "Автономный скрипт регулярно обходит сайты, каталоги и прайсы конкурентов. Система автоматически фиксирует изменения цен, новые услуги или акции и выгружает данные в сводную таблицу для коммерческого директора.",
        benefit: "Всегда актуальное позиционирование и защита маржи",
        icon: <Search className="w-5 h-5 text-emerald-400" />,
      },
    ],
  },
  {
    id: "ops",
    badge: "2️⃣ Второе направление",
    title: "Операционка",
    subtitle:
      "Устранение скрытых затрат компании: ручной перебивки данных, ошибок в реквизитах и хаоса в сведении отчетов.",
    icon: <Sliders className="w-6 h-6 text-primary" />,
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
          "Скрипты автоматически собирают фактические цифры из нескольких систем (1C, CRM, банки, рекламные кабинеты, таблицы склада) и сводят их в единый прозрачный онлайн-дашборд для собственника.",
        benefit: "Управленческие отчеты в реальном времени без задержек",
        icon: <FileSpreadsheet className="w-5 h-5 text-primary" />,
      },
      {
        title: "Бесшовный перенос данных между базами",
        description:
          "Программа связывает учетные сервисы через API и исключает ручной дублирующий ввод информации при переносе заявок и оплат между CRM, 1С, складскими и логистическими сервисами.",
        benefit: "0 потерянных заказов · Идеальный порядок в базах",
        icon: <Database className="w-5 h-5 text-primary" />,
      },
    ],
  },
  {
    id: "knowledge",
    badge: "3️⃣ Третье направление",
    title: "Знания компании",
    subtitle:
      "Устранение потерь времени на поиск внутренней информации, разгрузка руководства и быстрый ввод новых сотрудников.",
    icon: <GraduationCap className="w-6 h-6 text-amber-400" />,
    items: [
      {
        title: "Единая корпоративная база знаний",
        description:
          "Бизнес годами копит регламенты в виде десятков разрозненных файлов в Google Drive, Word и чатах. ИИ объединяет их в единый умный векторный индекс (RAG) для мгновенного поиска информации.",
        benefit: "Ответ на любой регламентный вопрос за 1 секунду",
        icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      },
      {
        title: "Мгновенные ответы на внутренние вопросы",
        description:
          "Команда перестает отвлекать руководителей однотипными процедурными запросами. Внутренний корпоративный ассистент выдает точные ответы строго на основе утвержденных правил компании моментально.",
        benefit: "Разгрузка РОПа, тимлидов и HR-специалистов на 50%+",
        icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
      },
      {
        title: "Адаптация и обучение новичков",
        description:
          "Обучение нового сотрудника больше не сжигает часы старших специалистов. Цифровой наставник проводит стажера по всем процессам, отвечает на вопросы и проверяет усвоение регламентов тестами.",
        benefit: "Сокращение онбординга с 3 недель до 5 дней",
        icon: <UserCheck className="w-5 h-5 text-amber-400" />,
      },
      {
        title: "Ассистент по документации на звонке",
        description:
          "Менеджеры на звонке не тратят время на чтение сложных 50-страничных инструкций и договоров перед ответом клиенту. Алгоритм сам находит нужный пункт договора или техусловие и выводит его на экран.",
        benefit: "Уверенные ответы клиенту без пауз «я уточню и перезвоню»",
        icon: <Sparkles className="w-5 h-5 text-amber-400" />,
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
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/40 text-primary text-xs font-bold uppercase tracking-wider">
            <span>🧩</span>
            <span>Системная экосистема</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            Три ключевых направления автоматизации бизнеса
          </h2>
          <p className="text-slate-200 text-base md:text-lg font-body leading-relaxed">
            Я делю всю автоматизацию компании на три большие категории. Когда они работают вместе — бизнес получает максимальный эффект без разрывов между отделами.
          </p>
        </div>

        {/* ВВОДНЫЙ БЛОК-ПРЕДИСЛОВИЕ: Почему точечные решения не работают */}
        <div className="mb-14 p-7 sm:p-9 rounded-3xl bg-surface border-2 border-border shadow-card relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Почему точечная автоматизация не работает</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-heavy leading-snug">
                Чат-бот отдельно, 1С отдельно, регламенты в Google Drive — так рождаются разрывы данных
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-body">
                Большинство компаний покупают разрозненный софт: менеджеры вручную перебивают лиды в CRM, бухгалтерия сутками сверяет акты в 1С, а новые сотрудники дергают РОПа вопросами «где лежит файл». 
                Мы объединяем процессы в <strong>единый сквозной конвейер</strong>: продажи сразу передают данные в операционку, а обе системы опираются на единую базу знаний.
              </p>
            </div>

            {/* Scheme mini-card */}
            <div className="w-full lg:w-auto shrink-0 bg-bg p-5 rounded-2xl border border-border/80 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>1. ПРОДАЖИ</span>
                <span className="text-slate-500">→</span>
                <span className="text-slate-300 font-normal">квалификация & КП за 30с</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                <span>2. ОПЕРАЦИОНКА</span>
                <span className="text-slate-500">→</span>
                <span className="text-slate-300 font-normal">договоры, 1С и сверка</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <span>3. ЗНАНИЯ</span>
                <span className="text-slate-500">→</span>
                <span className="text-slate-300 font-normal">RAG база и обучение команды</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pillar Switcher Navigation */}
        <div className="flex justify-center mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-2 bg-surface rounded-2xl border-2 border-border max-w-3xl w-full">
            {PILLARS.map((pillar) => {
              const isActive = pillar.id === activeTab;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`py-3.5 px-5 rounded-xl font-display font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all ${
                    isActive
                      ? "bg-bg text-heavy border-2 border-primary/50 shadow-md"
                      : "text-slate-300 hover:text-heavy hover:bg-bg/50"
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
        <div className="bg-surface border-2 border-border rounded-3xl p-7 sm:p-11 shadow-card">
          <div className="max-w-3xl mb-9 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {currentPillar.badge}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-heavy">
              {currentPillar.title}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {currentPillar.subtitle}
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPillar.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-bg border border-border hover:border-primary/60 transition-all flex flex-col justify-between space-y-5 group shadow-sm"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                      {item.icon}
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg text-heavy">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-border/80">
                  <span className="text-xs sm:text-sm font-semibold text-primary flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
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
