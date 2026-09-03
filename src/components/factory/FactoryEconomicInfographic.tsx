"use client";

import React from "react";
import { Zap, Users, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FactoryEconomicInfographic() {
  return (
    <section id="infographic" className="relative w-full py-20 overflow-hidden bg-bg text-heavy border-y border-border">
      {/* Background subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider">
            <span>📊</span>
            <span>Экономический эффект внедрения</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            Окупаемость ИИ-автоматизации для завода
          </h2>
          <p className="text-text-muted text-base md:text-lg font-body leading-relaxed">
            В промышленности экономика строится не на кликах, а на скорости закрытия сделок: вы забираете контракт раньше конкурентов и освобождаете инженеров-сметчиков от 80% рутины.
          </p>
        </div>

        {/* 4 B2B Economic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Speed */}
          <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-subtle">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                  Ускорение в 100+ раз
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-heavy mb-2">
                Скорость подготовки сложного КП
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Мгновенный ответ заказчикам, пока коммерческий отдел конкурентов распределяет заявку по очереди сметчиков.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="p-3.5 rounded-xl bg-bg border border-border/80">
                <div className="text-[11px] text-text-muted mb-1">Без ИИ (вручную):</div>
                <div className="text-base sm:text-lg font-bold text-rose-500 font-display">24–72 часа</div>
                <div className="text-[10px] text-text-muted mt-0.5">ожидание сметчика</div>
              </div>
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30">
                <div className="text-[11px] text-primary font-medium mb-1">С ИИ Samartsev AI:</div>
                <div className="text-base sm:text-lg font-bold text-primary font-display">30 секунд</div>
                <div className="text-[10px] text-primary/80 mt-0.5">сверка с 1С и ГОСТ</div>
              </div>
            </div>
          </div>

          {/* Card 2: Sales Capacity */}
          <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-subtle">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                  +800% объем заявок
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-heavy mb-2">
                Пропускная способность отдела сбыта
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Инженеры освобождаются от ручной перебивки номенклатуры в Excel и сосредотачиваются на ведении ключевых клиентов.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="p-3.5 rounded-xl bg-bg border border-border/80">
                <div className="text-[11px] text-text-muted mb-1">Обычный сметчик:</div>
                <div className="text-base sm:text-lg font-bold text-heavy font-display">3–5 КП в день</div>
                <div className="text-[10px] text-text-muted mt-0.5">потолок нагрузки</div>
              </div>
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30">
                <div className="text-[11px] text-primary font-medium mb-1">С ИИ-генератором:</div>
                <div className="text-base sm:text-lg font-bold text-primary font-display">до 100 КП в день</div>
                <div className="text-[10px] text-primary/80 mt-0.5">без расширения штата</div>
              </div>
            </div>
          </div>

          {/* Card 3: Win Rate */}
          <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-subtle">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                  +20% ... +35%
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-heavy mb-2">
                Конверсия заявок в сделку
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                По отраслевой статистике B2B-закупок, 72% заказчиков заключают договор с тем поставщиком, кто первым предоставил грамотную спецификацию.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border/80 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Фактор скорости первого ответа:</span>
                <span className="text-emerald-500 font-bold">Решающий (72%)</span>
              </div>
              <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-border">
                <div className="bg-gradient-to-r from-primary to-emerald-500 h-full w-[72%]" />
              </div>
            </div>
          </div>

          {/* Card 4: ROI */}
          <div className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-subtle">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary">
                  1–2 спасенных заказа
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-heavy mb-2">
                Срок полной окупаемости
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                При среднем чеке промышленной партии от 300 000 до 3 000 000 ₽ система окупает инвестиции в разработку уже в первый месяц эксплуатации.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="p-3.5 rounded-xl bg-bg border border-border/80">
                <div className="text-[11px] text-text-muted mb-1">Стоимость пилота:</div>
                <div className="text-base sm:text-lg font-bold text-heavy font-display">от 150 000 ₽</div>
                <div className="text-[10px] text-text-muted mt-0.5">разовый проект</div>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="text-[11px] text-emerald-500 font-medium mb-1">Срок возврата:</div>
                <div className="text-base sm:text-lg font-bold text-emerald-500 font-display">2–4 недели</div>
                <div className="text-[10px] text-emerald-500/80 mt-0.5">с первого крупного КП</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner in general site style */}
        <div className="bg-surface border-2 border-primary/40 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-card">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Реальная математика потерь</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-heavy leading-snug">
              При 100 заявках в месяц задержка КП на 2 дня приводит к потере до 15–20 контрактов
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              ИИ сохраняет эти сделки в вашей воронке. Вы получаете автономную систему, работающую с вашей базой 1С без выгрузки коммерческой тайны во внешние сети.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto font-bold shadow-md">
              <a href="https://t.me/samartsev_ai" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <span>Обсудить аудит ТЗ завода</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
