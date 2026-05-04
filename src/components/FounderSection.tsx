const FOUNDER_PHOTO = "https://lh3.googleusercontent.com/aida-public/AB6AXuBwfety_ktLf92tgu5cnEbB_h-2FlYuPndcMH4JEdmRxHGnFvwiEXXD05CDoy04ucABSFYH6zbDb0gJbUFVuz9W1BFyBMI6Exol7F5fUk_CHJ2oeEnDuVCs5oX6z5x6Ga0f0p627QZMJ6uOndlvi98ZYyx7-M-YNuYRjhSIhvhU6_XMJ6ZyBIsOUZegMs6Q11gus7dc0ZTjXD54UxgFb2urJh838WGGYWuw9W2BMJq7JkUWc0YFKG0jbnsuQqJ4J0LTEx-tOTR6I8w";

export default function FounderSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Photo */}
        <div className="relative inline-block">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border border-border shadow-subtle grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
            <img
              src={FOUNDER_PHOTO}
              alt="Алексей Самарцев — основатель Samartsev AI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heavy">
            Алексей Самарцев
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-body">
            Внедряю автономных ИИ-агентов на базе n8n, которые квалифицируют лидов и закрывают записи в CRM без участия человека.
            Гарантирую окупаемость за счёт возврата упущенной выручки.
          </p>
          <div className="pt-6">
            <span className="font-display text-xl text-text-muted italic opacity-60">
              A. Samartsev
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
