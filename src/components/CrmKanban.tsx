"use client";

import { useEffect, useState, useMemo } from "react";
import { Clock, Globe, Phone, Star, Search, Plus, X, Trash2, Archive, AlertTriangle, Building, RefreshCcw, Save, CalendarClock } from "lucide-react";
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Dialog from '@radix-ui/react-dialog';

type Lead = {
  id: number;
  type: "outreach" | "inbound";
  name: string;
  website: string;
  phone: string;
  niche: string;
  status: string;
  score: number;
  response_time: string | null;
  comment?: string | null;
  updated_at?: string;
};

const OUTREACH_COLUMNS = [
  { id: "new", title: "Новые" },
  { id: "testing", title: "Тест запущен" },
  { id: "responded", title: "Ответили" },
  { id: "offer_sent", title: "Оффер отправлен" },
];

const INBOUND_COLUMNS = [
  { id: "new", title: "Новые" },
  { id: "audit", title: "Назначен аудит" },
  { id: "proposal", title: "КП Отправлено" },
  { id: "success", title: "Успех" },
];

function formatDate(isoString?: string) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(date);
}

function SortableLeadCard({ lead, isDuplicate, onClick }: { lead: Lead; isDuplicate: boolean; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id.toString(), data: lead });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white border border-gray-200 hover:border-emerald-400 hover:shadow-lg p-4 rounded-xl cursor-grab active:cursor-grabbing transition-all relative group touch-manipulation"
    >
      {isDuplicate && (
        <div className="absolute -top-2 -right-2 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-red-200 z-20">
          <AlertTriangle className="w-3 h-3" /> В архиве
        </div>
      )}
      <div className="flex justify-between items-start mb-2 relative z-0">
        <h3 className="font-semibold text-gray-900 leading-tight pr-4">{lead.name}</h3>
        <div className="flex text-yellow-400 shrink-0">
          {[...Array(lead.score || 0)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      </div>
      
      <div className="space-y-1.5 text-xs text-gray-500 relative z-0">
        {lead.niche && (
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-gray-400" />
            <span>{lead.niche}</span>
          </div>
        )}
        {lead.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{lead.website}</span>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-gray-400" />
            <span>{lead.phone}</span>
          </div>
        )}
        {lead.updated_at && (
          <div className="flex items-center gap-2 text-gray-400 mt-2">
            <CalendarClock className="w-3 h-3" />
            <span>Изменено: {formatDate(lead.updated_at)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Column({ col, children, count }: { col: any, children: React.ReactNode, count: number }) {
  const { setNodeRef } = useDroppable({ id: col.id });

  return (
    <div ref={setNodeRef} className="bg-gray-100/80 border border-gray-200 rounded-2xl p-4 flex flex-col min-h-[65vh] min-w-[280px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200/80">
        <h2 className="font-semibold text-gray-700">{col.title}</h2>
        <span className="bg-white border border-gray-200 text-xs px-2.5 py-1 rounded-full text-gray-500 font-medium shadow-sm">
          {count}
        </span>
      </div>
      <div className="flex-1 space-y-3">
        {children}
      </div>
    </div>
  );
}

export function CrmKanban() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"outreach" | "inbound" | "archive">("outreach");
  const [search, setSearch] = useState("");
  
  const [activeLead, setActiveLead] = useState<Lead | null>(null);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isParserModalOpen, setIsParserModalOpen] = useState(false);
  const [parserQuery, setParserQuery] = useState("");
  const [parserLimit, setParserLimit] = useState(20);
  const [isParsing, setIsParsing] = useState(false);

  const [editForm, setEditForm] = useState<Partial<Lead>>({});

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setEditForm(selectedLead);
    } else {
      setEditForm({});
    }
  }, [selectedLead]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const columns = activeTab === "outreach" ? OUTREACH_COLUMNS : INBOUND_COLUMNS;
  const archivedLeads = leads.filter(l => l.status === "archived");

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (l.type !== activeTab) return false;
      if (l.status === "archived" || l.status === "deleted") return false;
      if (search) {
        const q = search.toLowerCase();
        return l.name.toLowerCase().includes(q) || (l.website && l.website.toLowerCase().includes(q)) || (l.niche && l.niche.toLowerCase().includes(q));
      }
      return true;
    });
  }, [leads, activeTab, search]);

  const checkIsDuplicate = (lead: Lead) => {
    if (!lead.website && !lead.phone) return false;
    return archivedLeads.some(a => 
      (a.website && lead.website && a.website.includes(lead.website)) || 
      (a.phone && lead.phone && a.phone === lead.phone)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const lead = leads.find(l => l.id.toString() === active.id);
    if (lead) setActiveLead(lead);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const activeLeadItem = leads.find(l => l.id.toString() === activeId);
    if (!activeLeadItem) return;

    const isOverColumn = columns.some(c => c.id === overId);
    let newStatus = activeLeadItem.status;

    if (isOverColumn) {
      newStatus = overId;
    } else {
      const overLeadItem = leads.find(l => l.id.toString() === overId);
      if (overLeadItem) {
        newStatus = overLeadItem.status;
      }
    }

    if (activeLeadItem.status === newStatus) {
      const activeIndex = leads.findIndex(l => l.id.toString() === activeId);
      const overIndex = leads.findIndex(l => l.id.toString() === overId);
      if (activeIndex !== overIndex && overIndex !== -1) {
        setLeads((items) => arrayMove(items, activeIndex, overIndex));
      }
      return;
    }

    const activeIndex = leads.findIndex(l => l.id.toString() === activeId);
    let newLeads = [...leads];
    newLeads[activeIndex] = { ...newLeads[activeIndex], status: newStatus, updated_at: new Date().toISOString() };
    
    setLeads(newLeads);
    
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: activeLeadItem.id, status: newStatus, updated_at: new Date().toISOString() })
    });
  };

  const updateLeadStatus = async (id: number, newStatus: string) => {
    const updatedDate = new Date().toISOString();
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus, updated_at: updatedDate } : l));
    setSelectedLead(null);
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus, updated_at: updatedDate })
    });
  };

  const saveLeadDetails = async () => {
    if (!selectedLead || !editForm) return;
    const updatedDate = new Date().toISOString();
    const updatedLead = { ...selectedLead, ...editForm, updated_at: updatedDate };
    
    setLeads(leads.map(l => l.id === selectedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);
    
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLead)
    });
  };

  const handleAddLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLead: Lead = {
      id: Date.now(), 
      type: formData.get("type") as "outreach" | "inbound",
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      website: formData.get("website") as string,
      niche: formData.get("niche") as string,
      status: "new",
      score: 0,
      response_time: null,
      comment: "",
      updated_at: new Date().toISOString()
    };
    
    setLeads([...leads, newLead]);
    setIsAddModalOpen(false);
  };

  const handleDeleteLead = () => {
    if (!selectedLead) return;
    if (window.confirm(`Вы уверены, что хотите удалить лид "${selectedLead.name}"? Это действие необратимо.`)) {
      updateLeadStatus(selectedLead.id, "deleted");
    }
  };

  const startParser = async () => {
    if (!parserQuery.trim()) {
      alert("Введите поисковый запрос!");
      return;
    }
    
    setIsParsing(true);
    try {
      const res = await fetch(`/api/parser?query=${encodeURIComponent(parserQuery)}&limit=${parserLimit}`, {
        method: "GET"
      });
      
      if (!res.ok) throw new Error("Ошибка запуска");
      
      alert(`Парсер запущен по запросу "${parserQuery}". Данные начнут появляться через пару минут.`);
      setIsParserModalOpen(false);
      setParserQuery("");
    } catch (err) {
      alert("Не удалось запустить парсер. Проверьте подключение.");
      console.error(err);
    } finally {
      setIsParsing(false);
    }
  };

  if (loading) return <div className="text-gray-500 animate-pulse text-center py-20 font-medium">Загрузка CRM...</div>;

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CRM Лидов</h1>
          <div className="flex bg-gray-200/50 p-1 rounded-lg mt-4 w-fit border border-gray-200">
            <button 
              onClick={() => setActiveTab("outreach")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "outreach" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Холодные
            </button>
            <button 
              onClick={() => setActiveTab("inbound")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "inbound" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Входящие
            </button>
            <button 
              onClick={() => setActiveTab("archive")}
              className={`px-6 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "archive" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Архив
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Поиск лидов..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <button 
            onClick={() => setIsParserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <RefreshCcw className="w-4 h-4" /> Собрать лиды (Apify)
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Добавить
          </button>
        </div>
      </div>

      {activeTab === "archive" ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-4 min-h-[60vh]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Archive className="w-5 h-5 text-gray-400" /> 
              Архив лидов
            </h2>
            <span className="text-sm text-gray-500">Всего в архиве: {archivedLeads.length}</span>
          </div>
          {archivedLeads.length === 0 ? (
            <p className="text-gray-500 text-center py-10">В архиве пока ничего нет.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {archivedLeads.map(lead => (
                <div key={lead.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{lead.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-1"><Globe className="w-3 h-3"/> {lead.website || "—"}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-3"><Phone className="w-3 h-3"/> {lead.phone || "—"}</p>
                  </div>
                  <button 
                    onClick={() => updateLeadStatus(lead.id, "new")} 
                    className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-gray-200 hover:border-emerald-500 text-sm text-gray-700 hover:text-emerald-600 rounded-lg transition-colors"
                  >
                    <RefreshCcw className="w-4 h-4" /> Восстановить в "Новые"
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4 overflow-x-auto pb-4 custom-scrollbar">
            {columns.map((col) => {
              const colLeads = filteredLeads.filter((l) => l.status === col.id);
              return (
                <Column key={col.id} col={col} count={colLeads.length}>
                  <SortableContext id={col.id} items={colLeads.map(l => l.id.toString())} strategy={verticalListSortingStrategy}>
                    {colLeads.map(lead => (
                      <SortableLeadCard 
                        key={lead.id} 
                        lead={lead} 
                        isDuplicate={checkIsDuplicate(lead)}
                        onClick={() => setSelectedLead(lead)} 
                      />
                    ))}
                  </SortableContext>
                </Column>
              );
            })}
          </div>

          <DragOverlay>
            {activeLead ? (
              <div className="opacity-80 rotate-2 scale-105 pointer-events-none cursor-grabbing">
                <SortableLeadCard lead={activeLead} isDuplicate={checkIsDuplicate(activeLead)} onClick={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {/* LEAD DETAILS MODAL */}
      <Dialog.Root open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            {selectedLead && (
              <>
                <div className="flex items-start justify-between mb-4 border-b border-gray-100 pb-4">
                  <div className="w-full pr-4">
                    <input 
                      value={editForm.name || ""} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="text-xl font-bold text-gray-900 w-full focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded px-1 -ml-1"
                    />
                    <p className="text-gray-400 text-xs mt-1">Последнее изменение: {formatDate(selectedLead.updated_at)}</p>
                  </div>
                  <Dialog.Close className="text-gray-400 hover:text-gray-600 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors shrink-0">
                    <X className="w-5 h-5" />
                  </Dialog.Close>
                </div>

                <div className="space-y-4 mb-6 custom-scrollbar overflow-y-auto max-h-[50vh] pr-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                      <p className="text-xs text-gray-500 mb-1">Телефон</p>
                      <input 
                        value={editForm.phone || ""} 
                        onChange={e => setEditForm({...editForm, phone: e.target.value})}
                        className="font-medium text-gray-900 w-full bg-transparent focus:outline-none"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                      <p className="text-xs text-gray-500 mb-1">Сайт</p>
                      <input 
                        value={editForm.website || ""} 
                        onChange={e => setEditForm({...editForm, website: e.target.value})}
                        className="font-medium text-emerald-600 w-full bg-transparent focus:outline-none"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                      <p className="text-xs text-gray-500 mb-1">Ниша</p>
                      <input 
                        value={editForm.niche || ""} 
                        onChange={e => setEditForm({...editForm, niche: e.target.value})}
                        className="font-medium text-gray-900 w-full bg-transparent focus:outline-none"
                      />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Оценка (Score)</p>
                      <div className="flex text-yellow-400 gap-1 mt-1">
                        {[1,2,3,4,5].map(star => (
                          <Star 
                            key={star} 
                            onClick={() => setEditForm({...editForm, score: star})}
                            className={`w-4 h-4 cursor-pointer transition-colors ${star <= (editForm.score || 0) ? "fill-current" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Комментарий / Заметки</label>
                    <textarea 
                      value={editForm.comment || ""}
                      onChange={e => setEditForm({...editForm, comment: e.target.value})}
                      placeholder="Оставь заметку об этом лиде..."
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[80px] custom-scrollbar"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Статус (Колонка)</label>
                    <select 
                      value={editForm.status || selectedLead.status} 
                      onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                      className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {(selectedLead.type === "outreach" ? OUTREACH_COLUMNS : INBOUND_COLUMNS).map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 justify-between border-t border-gray-100 pt-4">
                  <div className="flex gap-2">
                    <button onClick={() => updateLeadStatus(selectedLead.id, "archived")} className="flex items-center justify-center p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" title="В архив">
                      <Archive className="w-4 h-4" />
                    </button>
                    <button onClick={handleDeleteLead} className="flex items-center justify-center p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Удалить">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button onClick={saveLeadDetails} className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-sm">
                    <Save className="w-4 h-4" /> Сохранить изменения
                  </button>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ADD LEAD MODAL */}
      <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <Dialog.Title className="text-xl font-bold text-gray-900">Новый лид</Dialog.Title>
                <Dialog.Description className="text-gray-500 text-sm mt-1">Добавление карточки вручную</Dialog.Description>
              </div>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4 mb-2">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Тип пайплайна</label>
                <select name="type" className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                  <option value="outreach">Холодный аутрич</option>
                  <option value="inbound">Входящая заявка</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Компания / Имя</label>
                <input required name="name" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Например: ООО Вектор" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Телефон / Telegram</label>
                <input name="phone" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="+7 999..." />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Сайт</label>
                <input name="website" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="domain.ru" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Ниша</label>
                <input name="niche" type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="Стоматология" />
              </div>
              
              <button type="submit" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors">
                Сохранить карточку
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* PARSER MODAL */}
      <Dialog.Root open={isParserModalOpen} onOpenChange={setIsParserModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <Dialog.Title className="text-xl font-bold text-gray-900">Сбор новых лидов</Dialog.Title>
                <Dialog.Description className="text-gray-500 text-sm mt-1">Apify + Яндекс.Карты</Dialog.Description>
              </div>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 p-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="space-y-4 mb-2">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Широкая ниша</label>
                <input 
                  value={parserQuery}
                  onChange={e => setParserQuery(e.target.value)}
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none" 
                  placeholder="Например: Автосервисы" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Количество (лимит)</label>
                <input 
                  value={parserLimit}
                  onChange={e => setParserLimit(Number(e.target.value))}
                  type="number" 
                  min="5"
                  max="100"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 outline-none" 
                />
              </div>
              
              <button 
                onClick={startParser}
                disabled={isParsing}
                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                {isParsing ? "Запуск..." : <><RefreshCcw className="w-4 h-4" /> Запустить сбор</>}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </>
  );
}
