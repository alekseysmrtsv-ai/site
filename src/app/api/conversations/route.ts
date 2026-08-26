import { NextResponse } from "next/server";

const CRM_API_URL = "http://84.22.148.12:5679";

export async function GET() {
  try {
    const res = await fetch(`${CRM_API_URL}/conversations`, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`CRM API responded with ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("CRM conversations API unreachable, returning mock preview data", error);
    return NextResponse.json([
      {
        session_id: "demo-beauty-salon-01",
        lead_id: 96,
        lead_name: "Анна (Салон красоты 'Эстетика')",
        lead_phone: "+7 (926) 888-12-34",
        lead_email: "anna@estetika.ru",
        lead_niche: "Салон красоты",
        lead_status: "new",
        lead_score: 4,
        lead_created_at: new Date().toISOString(),
        message_count: 8,
        last_message_at: new Date().toISOString(),
        messages: [
          { id: 1, role: "assistant", message: "Здравствуйте! Чем могу помочь по автоматизации вашего бизнеса?", created_at: new Date(Date.now() - 3600000).toISOString() },
          { id: 2, role: "user", message: "У меня салон красоты, теряются клиенты после онлайн-записи и просят скидки.", created_at: new Date(Date.now() - 3500000).toISOString() },
          { id: 3, role: "assistant", message: "Понимаю! В бьюти-сфере без автоподтверждения и умных напоминаний теряется до 20-30% записей. Сколько клиентов примерно не доходит в месяц?", created_at: new Date(Date.now() - 3400000).toISOString() },
          { id: 4, role: "user", message: "Около 20-25 человек каждый месяц. Всё пишем вручную в WhatsApp, когда успеваем.", created_at: new Date(Date.now() - 3300000).toISOString() },
          { id: 5, role: "assistant", message: "25 потерянных клиентов при среднем чеке 2500 ₽ — это больше 60 000 ₽ упущенной выручки каждый месяц. ИИ-агент подтверждает запись за 3 секунды и снижает неявки до 5%. Хотите разобрать аудит на ваших цифрах?", created_at: new Date(Date.now() - 3200000).toISOString() },
          { id: 6, role: "user", message: "Да, давайте обсудим со специалистом.", created_at: new Date(Date.now() - 3100000).toISOString() },
          { id: 7, role: "assistant", message: "Отлично! Оставьте, пожалуйста, номер телефона или контакт в Telegram — Алексей свяжется с вами в удобное время.", created_at: new Date(Date.now() - 3000000).toISOString() },
          { id: 8, role: "user", message: "+7 (926) 888-12-34 Анна, лучше созвон во второй половине дня", created_at: new Date(Date.now() - 2900000).toISOString() }
        ]
      }
    ]);
  }
}
