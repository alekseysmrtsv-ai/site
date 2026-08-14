"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";

interface Props {
  title: string;
}

export function ArticleShareBar({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTelegram = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const text = `${title} — Практический разбор от Samartsev AI`;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 my-8">
      <span className="text-xs font-semibold text-gray-700">
        Понравился материал? Поделитесь с коллегами:
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            copied
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-800"
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
          {copied ? "Ссылка скопирована!" : "Скопировать ссылку"}
        </button>

        <button
          onClick={handleShareTelegram}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#229ED9] hover:bg-[#1E8CC0] text-white transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          В Telegram
        </button>
      </div>
    </div>
  );
}
