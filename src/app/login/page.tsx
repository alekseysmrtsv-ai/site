"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, ArrowLeft, CheckCircle2, Loader2, Lock } from "lucide-react";
import Link from "next/link";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const idParam = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (errorParam === "unauthorized_id") {
      setErrorMessage(
        `Доступ запрещен. Ваш Telegram ID (${idParam || "не указан"}) отсутствует в списке разрешенных администраторов (TELEGRAM_ADMIN_ID).`
      );
    } else if (errorParam === "invalid_signature") {
      setErrorMessage("Ошибка валидации подписи Telegram. Проверьте правильность TELEGRAM_BOT_TOKEN.");
    } else if (errorParam === "no_bot_token") {
      setErrorMessage("На сервере не настроена переменная TELEGRAM_BOT_TOKEN в переменных окружения.");
    } else if (errorParam) {
      setErrorMessage(`Ошибка авторизации: ${errorParam}`);
    }
  }, [errorParam, idParam]);

  useEffect(() => {
    // Define global callback for Telegram Widget
    (window as any).onTelegramAuth = async (user: any) => {
      setLoading(true);
      setErrorMessage(null);
      try {
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        const data = await res.json();
        if (data.success) {
          window.location.href = data.redirect || "/crm";
        } else {
          setLoading(false);
          if (data.error === "unauthorized_id") {
            setErrorMessage(
              `Доступ запрещен. Ваш Telegram ID (${data.id || user.id}) не найден в списке администраторов.`
            );
          } else if (data.error === "invalid_signature") {
            setErrorMessage("Ошибка проверки подписи Telegram.");
          } else if (data.error === "no_bot_token") {
            setErrorMessage("На сервере не задан TELEGRAM_BOT_TOKEN.");
          } else {
            setErrorMessage("Ошибка входа. Попробуйте еще раз.");
          }
        }
      } catch (err) {
        setLoading(false);
        setErrorMessage("Сетевая ошибка при проверке сессии. Попробуйте обновить страницу.");
      }
    };

    // Inject the Telegram Login Widget script dynamically
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "lead_manager_for_site_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-radius", "8");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");

    const container = document.getElementById("telegram-login-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    return () => {
      delete (window as any).onTelegramAuth;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl border border-gray-200 shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 shadow-inner">
          <Lock className="w-8 h-8 text-[#229ED9]" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2 font-display">Вход в CRM</h1>
        <p className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
          Доступ только для авторизованных администраторов. Пожалуйста, войдите через Telegram.
        </p>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="w-full p-4 mb-6 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-red-700 leading-relaxed font-medium">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="w-8 h-8 text-[#00E68A] animate-spin" />
            <span className="text-xs font-semibold text-gray-600">Проверка прав доступа...</span>
          </div>
        ) : (
          <div id="telegram-login-container" className="min-h-[44px] flex items-center justify-center"></div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center space-y-3">
          <p className="text-[11px] text-gray-400">
            *Ваш Telegram ID проверяется по белому списку сервера (<code>TELEGRAM_ADMIN_ID</code>).
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
