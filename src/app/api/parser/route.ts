import { NextResponse } from "next/server";

const N8N_URL = "http://84.22.148.12:5678";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = searchParams.get('limit');

    if (!query) {
      return NextResponse.json({ error: "Поисковый запрос обязателен" }, { status: 400 });
    }

    // Отправляем запрос на n8n webhook
    const res = await fetch(`${N8N_URL}/webhook/run-parser-sniper?query=${encodeURIComponent(query)}&limit=${limit || 20}`, {
      method: "GET"
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
