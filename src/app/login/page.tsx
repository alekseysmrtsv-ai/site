"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Inject the Telegram Login Widget script dynamically
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    // Replace with the user's actual bot username
    script.setAttribute("data-telegram-login", "lead_manager_for_site_bot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-auth-url", "/api/auth/telegram");
    script.setAttribute("data-request-access", "write");

    const container = document.getElementById("telegram-login-container");
    if (container && container.childNodes.length === 0) {
      container.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Вход в CRM</h2>
        <p className="text-gray-500 text-center mb-8">
          Доступ только для авторизованных администраторов. Пожалуйста, войдите через Telegram.
        </p>
        
        {/* Container for the Telegram Widget */}
        <div id="telegram-login-container" className="h-[40px] flex items-center justify-center"></div>

        <p className="mt-8 text-xs text-gray-400 text-center">
          *Ваш Telegram ID будет проверен по белому списку сервера.
        </p>
      </div>
    </div>
  );
}
