"use client";

import { ListCollapse } from "lucide-react";
import { TocItem } from "@/lib/toc";

interface Props {
  items: TocItem[];
}

export function ArticleTableOfContents({ items }: Props) {
  if (!items || items.length === 0) return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 my-8">
      <div className="flex items-center gap-2 font-bold text-sm text-[#111111] font-display mb-3.5 uppercase tracking-wider">
        <ListCollapse className="w-4 h-4 text-[#00E68A]" />
        В этой статье:
      </div>
      <nav>
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="text-xs sm:text-sm text-[#4B5563] hover:text-[#00E68A] transition-colors flex items-baseline gap-2 group"
              >
                <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#00E68A] transition-colors">
                  0{idx + 1}.
                </span>
                <span className="leading-snug underline-offset-4 group-hover:underline">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
