import NichePage from "@/components/niche/NichePage";
import { AUTO_CONFIG } from "@/components/niche/nicheConfigs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ИИ-агент для автосервиса — приём заявок 24/7 | Samartsev AI",
  description:
    "ИИ-ассистент для автосервисов. Принимает заявки ночью и в выходные. Интеграция с CRM и 1С.",
};

export default function AutoPage() {
  return <NichePage config={AUTO_CONFIG} />;
}
