import { NextResponse } from "next/server";

const N8N_URL = "http://84.22.148.12:5678";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, limit } = body;

    if (!query) {
      return NextResponse.json({ error: "Поисковый запрос обязателен" }, { status: 400 });
    }

    // Отправляем запрос на n8n webhook
    const res = await fetch(`${N8N_URL}/webhook/run-parser-sniper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, limit: limit || 20 }),
    });

    if (!res.ok) {
      throw new Error(`n8n responded with ${res.status}`);
    }

    return NextResponse.json({ success: true, message: "Парсер запущен" });
  } catch (error) {
    console.error("Error triggering parser:", error);
    return NextResponse.json(
      { error: "Не удалось запустить парсер. Проверьте статус n8n." },
      { status: 500 }
    );
  }
}
