import NichePage from "@/components/niche/NichePage";
import { MED_CONFIG } from "@/components/niche/nicheConfigs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ИИ-агент для стоматологии — запись пациентов 24/7 | Samartsev AI",
  description:
    "Автоматическая запись пациентов через ИИ-агента. Отвечает за 2 секунды в любое время. Интеграция с МИС / CRM клиники.",
};

export default function MedPage() {
  return <NichePage config={MED_CONFIG} />;
}
