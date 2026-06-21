import { CrmKanban } from "@/components/CrmKanban";

export const metadata = {
  title: "CRM | Leads",
};

export default function CrmPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-emerald-500/20">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-6">
        <CrmKanban />
      </div>
    </div>
  );
}
