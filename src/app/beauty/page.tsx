import NichePage from "@/components/niche/NichePage";
import { BEAUTY_CONFIG } from "@/components/niche/nicheConfigs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ИИ-агент для салона красоты — онлайн-запись 24/7 | Samartsev AI",
  description:
    "ИИ-ассистент для beauty-салонов. Записывает клиентов, отвечает в мессенджерах, снижает потери заявок.",
};

export default function BeautyPage() {
  return <NichePage config={BEAUTY_CONFIG} />;
}
