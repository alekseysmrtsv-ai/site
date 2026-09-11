"use client";

import React from "react";
import { ShieldCheck, Lock, Server, FileText, Cpu, CheckCircle } from "lucide-react";

export default function B2BSecuritySection() {
  const securityFeatures = [
    {
      title: "Отечественные LLM: YandexGPT и GigaChat",
      description:
        "Полная независимость от зарубежных API и риска внезапных блокировок. Интегрируем российские языковые модели из реестра отечественного ПО или разворачиваем открытые Open-Source модели (Qwen, Llama) в вашем закрытом периметре.",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      badge: "Реестровые модели РФ",
    },
    {
      title: "Двухконтурный PII-санитайзер (152-ФЗ)",
      description:
        "Перед обработкой клиентских запросов алгоритм автоматически маскирует персональные данные (ФИО, телефоны, паспортные данные, номера счетов). Модель видит только обезличенный контекст задачи.",
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      badge: "Защита персданных",
    },
    {
      title: "Серверы в РФ или On-Premise в вашем ЦОД",
      description:
        "Система разворачивается в изолированных Docker-контейнерах на защищенных серверах в дата-центрах РФ (уровень Tier III) либо полностью локально на вашей внутренней серверной инфраструктуре заказчика.",
      icon: <Server className="w-6 h-6 text-primary" />,
      badge: "Локальный контур",
    },
    {
      title: "Официальный NDA и коммерческая тайна",
      description:
        "До начала аудита и подключения к вашим базам подписываем официальное Соглашение о неразглашении (NDA). Исходный код скриптов автоматизации, базы и история обращений остаются исключительно вашей собственностью.",
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      badge: "Юридическая защита",
    },
  ];

  return (
    <section id="security" className="w-full py-20 bg-bg text-heavy border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Корпоративная безопасность</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-heavy leading-tight">
            Российский контур данных и соответствие 152-ФЗ
          </h2>
          <p className="text-slate-700 text-base md:text-lg font-body leading-relaxed">
            Мы знаем требования служб безопасности и комплаенса: коммерческая тайна, прайсы и персональные данные клиентов никогда не попадают в публичные сети.
          </p>
        </div>

        {/* Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {securityFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-surface border-2 border-border hover:border-slate-400 transition-all flex flex-col justify-between space-y-4 shadow-subtle"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-bg border border-border flex items-center justify-center shadow-inner">
                    {feat.icon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-bg border border-border text-slate-700">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-heavy">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Гарантия конфиденциальности и юридической чистоты</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security Compliance Banner */}
        <div className="p-7 sm:p-9 rounded-3xl bg-surface border-2 border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="font-display font-bold text-base sm:text-xl text-heavy">
              Требуется развертывание строго на ваших серверах (On-Premise)?
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 font-body">
              Упакуем агентов в изолированный локальный Docker-стек с подключением к корпоративному Git, n8n Self-Hosted и локальной базе знаний.
            </p>
          </div>
          <a
            href="https://t.me/samartsev_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors shadow-sm"
          >
            Обсудить требования безопасности
          </a>
        </div>
      </div>
    </section>
  );
}
