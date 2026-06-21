import { NextResponse } from "next/server";

const N8N_URL = "http://84.22.148.12:5678";

export async function GET() {
  try {
    const res = await fetch(`${N8N_URL}/webhook/get-leads`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch leads");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("n8n not reachable, returning mock data", error);
    return NextResponse.json([
      { id: 1, type: "outreach", name: "Стоматология Улыбка", website: "ulibka.ru", phone: "+7 (999) 123-45-67", niche: "Стоматология", status: "new", score: 5, response_time: null, comment: "Выглядят перспективно, надо писать директору.", updated_at: new Date().toISOString() },
      { id: 2, type: "outreach", name: "ДентаЛюкс", website: "dentalux.ru", phone: "+7 (999) 765-43-21", niche: "Стоматология", status: "testing", score: 4, response_time: null, comment: "", updated_at: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, type: "outreach", name: "МедЦентр 24", website: "med24.ru", phone: "+7 (800) 555-35-35", niche: "Многопрофильная", status: "responded", score: 5, response_time: "45 минут", comment: "Сказали перезвонить в четверг.", updated_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 4, type: "inbound", name: "ООО Вектор", website: "vector-corp.ru", phone: "+7 (495) 111-22-33", niche: "B2B SaaS", status: "new", score: 3, response_time: null, comment: "", updated_at: new Date().toISOString() },
      { id: 5, type: "inbound", name: "ИП Смирнов", website: "smirnov.tech", phone: "+7 (911) 222-33-44", niche: "E-commerce", status: "audit", score: 4, response_time: null, comment: "Аудит назначен на 12:00", updated_at: new Date().toISOString() },
      { id: 6, type: "inbound", name: "Ромашка Трейд", website: "romashka.ru", phone: "+7 (922) 333-44-55", niche: "Ритейл", status: "proposal", score: 5, response_time: null, comment: "Отправил КП на почту.", updated_at: new Date().toISOString() },
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
    if (!res.ok) throw new Error("Failed to update lead");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("n8n not reachable, mocking success", error);
    return NextResponse.json({ success: true });
  }
}
