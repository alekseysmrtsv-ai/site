import { NextResponse } from "next/server";

const N8N_URL = "http://84.22.148.12:5678";

function normalizeLead(l: any) {
  // 1. Lead score
  let s = 0;
  if (l.lead_score === 100) s = 5;
  else if (l.lead_score === 50) s = 3;
  else if (l.lead_score === 10) s = 1;
  else s = l.lead_score || l.score || 0;

  // 2. Type (inbound vs outreach)
  let type = l.type || "outreach";
  if (l.source === "widget" || l.source === "landing_contact_form" || l.source === "form") {
    if (l.phone || l.email || l.name || l.extra_pii?.niche) {
      type = "inbound";
    }
  }

  // 3. Niche normalization
  const extra = typeof l.extra_pii === "string" ? JSON.parse(l.extra_pii || "{}") : (l.extra_pii || {});
  const rawNiche = (l.niche || extra.niche || "").trim();
  const name = (l.name || "").toLowerCase();
  const website = (l.website || "").toLowerCase();
  const comment = (l.comment || "").toLowerCase().slice(0, 300);
  const combined = `${rawNiche} ${name} ${website} ${comment}`.toLowerCase();

  let niche = "Общая";

  // Check explicit clean niche first
  if (rawNiche && !/^(outreach lead|widget|none|null|undefined|general|lead)$/i.test(rawNiche)) {
    const lower = rawNiche.toLowerCase();
    if (lower === "med" || lower.includes("стом") || lower.includes("дент") || lower.includes("зуб") || lower.includes("клиник")) {
      niche = "Стоматология";
    } else if (lower === "beauty" || lower.includes("красот") || lower.includes("салон") || lower.includes("бьют") || lower.includes("барбер") || lower.includes("маникюр") || lower.includes("spa") || lower.includes("спа")) {
      niche = "Салон красоты";
    } else if (lower === "auto" || lower.includes("авто") || lower.includes("сто") || lower.includes("акпп") || lower.includes("масел") || lower.includes("шиномонтаж")) {
      niche = "Автосервис";
    } else if (lower.includes("детейл") || lower.includes("полировк")) {
      niche = "Детейлинг";
    } else if (lower.includes("недвиж") || lower.includes("риелтор")) {
      niche = "Недвижимость";
    } else if (lower.includes("e-com") || lower.includes("магазин")) {
      niche = "E-commerce";
    } else if (lower.includes("b2b") || lower.includes("saas") || lower.includes("crm") || lower.includes("it")) {
      niche = "B2B SaaS";
    } else {
      const cleaned = rawNiche.replace(/\s+(москва|спб|санкт-петербург|самара|екатеринбург|казань|новосибирск|нижний новгород|уфа|красноярск|пермь|воронеж|волгоград|краснодар|сочи)\b/gi, "").trim();
      niche = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
  } else {
    // Infer from name, website, and comment
    if (
      /\b(стом|дент|зуб|dent|smile|улыб|кариес|имплант|ортопед|ортодонт|брекет|винир|zoom|палкин|айдентика|интан|примед|протез)\b/i.test(combined) ||
      website.includes("dent") || website.includes("stom") || website.includes("зуб") ||
      name.includes("зуб") || name.includes("стом") || name.includes("дент")
    ) {
      niche = "Стоматология";
    } else if (
      /\b(авто|cto\b|сто\b|car\b|akpp|акпп|масел|масло|рейк|шиномонтаж|детейл|кузов|полировк|машин|ремонт авто|автомастер|автодок|ремзона)\b/i.test(combined) ||
      website.includes("auto") || website.includes("car") || website.includes("cto") || website.includes("sto") ||
      name.includes("авто") || name.includes("car") || name.includes("сто")
    ) {
      if (combined.includes("детейл") || combined.includes("полировк")) niche = "Детейлинг";
      else niche = "Автосервис";
    } else if (
      /\b(красот|beauty|салон|барбер|стрижк|маникюр|педикюр|ресниц|бров|spa|спа|космет|волос|массаж|визаж)\b/i.test(combined) ||
      website.includes("beauty") || name.includes("beauty") || name.includes("салон")
    ) {
      niche = "Салон красоты";
    } else if (
      /\b(клиник|медцентр|врач|доктор|пациент)\b/i.test(combined) ||
      website.includes("clinic")
    ) {
      niche = "Медицина";
    } else if (/\b(недвиж|риелтор|квартир|жк\b)\b/i.test(combined)) {
      niche = "Недвижимость";
    } else if (/\b(магазин|e-com|доставка)\b/i.test(combined)) {
      niche = "E-commerce";
    } else if (/\b(b2b|saas|crm|it-)\b/i.test(combined)) {
      niche = "B2B SaaS";
    }
  }

  return {
    ...l,
    type,
    niche,
    score: s,
  };
}

export async function GET() {
  try {
    const res = await fetch(`${N8N_URL}/webhook/get-leads`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch leads");
    const data = await res.json();
    const leadsArray = Array.isArray(data) ? data : (data ? [data] : []);
    const mapped = leadsArray.map(normalizeLead);
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("n8n not reachable, returning mock data", error);
    return NextResponse.json([
      { id: 1, type: "outreach", name: "Стоматология Улыбка", website: "ulibka.ru", phone: "+7 (999) 123-45-67", niche: "Стоматология", status: "new", score: 5, response_time: null, comment: "Выглядят перспективно, надо писать директору.", updated_at: new Date().toISOString() },
      { id: 2, type: "outreach", name: "ДентаЛюкс", website: "dentalux.ru", phone: "+7 (999) 765-43-21", niche: "Стоматология", status: "testing", score: 4, response_time: null, comment: "", updated_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, type: "outreach", name: "МедЦентр 24", website: "med24.ru", phone: "+7 (800) 555-35-35", niche: "Медицина", status: "responded", score: 5, response_time: "45 минут", comment: "Сказали перезвонить в четверг.", updated_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 4, type: "inbound", name: "ООО Вектор", website: "vector-corp.ru", phone: "+7 (495) 111-22-33", niche: "B2B SaaS", status: "new", score: 3, response_time: null, comment: "", updated_at: new Date().toISOString() },
      { id: 5, type: "inbound", name: "ИП Смирнов", website: "smirnov.tech", phone: "+7 (911) 222-33-44", niche: "E-commerce", status: "audit", score: 4, response_time: null, comment: "Аудит назначен на 12:00", updated_at: new Date().toISOString() },
      { id: 6, type: "inbound", name: "Ромашка Трейд", website: "romashka.ru", phone: "+7 (922) 333-44-55", niche: "E-commerce", status: "proposal", score: 5, response_time: null, comment: "Отправил КП на почту.", updated_at: new Date().toISOString() },
    ]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${N8N_URL}/webhook/update-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      console.warn(`n8n update-lead responded with ${res.status}`);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("n8n not reachable, mocking success", error);
    return NextResponse.json({ success: true });
  }
}
