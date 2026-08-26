"use client";

import { useEffect, useState, useMemo } from "react";
import { 
  Clock, 
  Globe, 
  Phone, 
  Star, 
  Search, 
  Plus, 
  X, 
  Trash2, 
  Archive, 
  AlertTriangle, 
  Building, 
  RefreshCcw, 
  Save, 
  CalendarClock, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Edit, 
  Copy, 
  Check, 
  LayoutGrid, 
  List, 
  Filter, 
  ArrowUpDown, 
  ExternalLink, 
  Flame, 
  Download, 
  ChevronDown, 
  CheckSquare, 
  Square, 
  Timer,
  FileText,
  RotateCcw,
  MessageSquare,
  MessageCircle,
  Bot,
  User
} from "lucide-react";
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragStartEvent, DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Dialog from '@radix-ui/react-dialog';

export type Lead = {
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
  data_quality?: any;
};

export type ChatMessage = {
  id: number;
  role: "user" | "assistant" | "system";
  message: string;
  created_at: string;
};

export type ConversationThread = {
  session_id: string;
  lead_id: number;
  lead_name: string;
  lead_phone: string;
  lead_email?: string;
  lead_niche: string;
  lead_status: string;
  lead_score: number;
  lead_created_at?: string;
  message_count: number;
  last_message_at: string;
  messages: ChatMessage[];
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

function isLeadStale(lead: Lead, daysThreshold = 3): boolean {
  if (!lead.updated_at) return false;
  const leadDate = new Date(lead.updated_at).getTime();
  const now = Date.now();
  const diffDays = (now - leadDate) / (1000 * 60 * 60 * 24);
  return diffDays >= daysThreshold;
}

function formatWebsiteUrl(url?: string): string {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
}

function getChecklistItems(editForm: any, selectedLead: any) {
  const dataQuality = editForm?.data_quality || selectedLead?.data_quality || {};
  const checklist = dataQuality.checklist || {};
  
  const hasChecklistData = Object.keys(checklist).length > 0;
  
  if (hasChecklistData) {
    return [
      { label: "Игнорирование звонков/сообщений", checked: !!checklist.no_response },
      { label: "Длительное время ожидания", checked: !!checklist.slow_response },
      { label: "Грубость / хамство персонала", checked: !!checklist.rudeness },
      { label: "Сложности с бронированием/записью", checked: !!checklist.booking_issue },
      { label: "Сетевой филиал (сеть)", checked: !!checklist.is_chain },
      { label: "Микро-бизнес (низкий приоритет)", checked: !!checklist.is_micro }
    ];
  }
  
  // Fallback based on score
  const score = editForm?.score || selectedLead?.score || 0;
  return [
    { label: "Игнорирование звонков/сообщений", checked: score >= 4 },
    { label: "Длительное время ожидания", checked: score >= 4 },
    { label: "Грубость / хамство персонала", checked: false },
    { label: "Сложности с бронированием/записью", checked: score >= 5 },
    { label: "Сетевой филиал (сеть)", checked: score === 3 },
    { label: "Микро-бизнес (низкий приоритет)", checked: score === 1 }
  ];
}

function SortableLeadCard({ 
  lead, 
  isDuplicate, 
  onClick,
  onCopyPitch,
  isCopied
}: { 
  lead: Lead; 
  isDuplicate: boolean; 
  onClick: () => void;
  onCopyPitch: (e: React.MouseEvent, lead: Lead) => void;
  isCopied: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id.toString(), data: lead });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const isStale = isLeadStale(lead) && lead.status !== "offer_sent" && lead.status !== "success";

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
        <div>
          <h3 className="font-semibold text-gray-900 leading-tight pr-2">{lead.name}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {lead.score !== undefined && lead.score >= 4 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">
                🔥 Горячий
              </span>
            )}
            {lead.score === 3 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                ⚡ Теплый
              </span>
            )}
            {lead.score !== undefined && lead.score > 0 && lead.score <= 2 && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-200">
                💤 Низкий
              </span>
            )}
            {isStale && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100/70 text-amber-800 border border-amber-200" title="Не обновлялся более 3 дней">
                <Timer className="w-2.5 h-2.5" /> 3д+
              </span>
            )}
          </div>
        </div>
        <div className="flex text-yellow-400 shrink-0">
          {lead.score !== undefined && lead.score > 0 && [...Array(lead.score)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      </div>
      
      <div className="space-y-1.5 text-xs text-gray-500 relative z-0 mt-2">
        {lead.niche && (
          <div className="flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="font-medium text-gray-700">{lead.niche}</span>
          </div>
        )}
        {lead.website && (
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2 overflow-hidden">
              <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{lead.website}</span>
            </div>
            <a
              href={formatWebsiteUrl(lead.website)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-emerald-600 p-0.5 rounded transition-colors"
              title="Открыть сайт"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
        {lead.phone && (
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{lead.phone}</span>
            </div>
            <a
              href={`tel:${lead.phone.replace(/[^+\d]/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="text-gray-400 hover:text-emerald-600 p-0.5 rounded transition-colors"
              title="Позвонить"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
            </a>
          </div>
        )}

        {/* Quick Pitch Action Button */}
        {lead.comment && (
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-600 truncate max-w-[170px]">
              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate italic">{lead.comment.slice(0, 30)}...</span>
            </div>
            <button
              type="button"
              onClick={(e) => onCopyPitch(e, lead)}
              className={`text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 transition-all ${
                isCopied 
                  ? "bg-emerald-100 text-emerald-800" 
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
              }`}
              title="Скопировать готовый сценарий в буфер"
            >
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {isCopied ? "Скопировано" : "Питч"}
            </button>
          </div>
        )}

        {lead.updated_at && (
          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 pt-1">
            <CalendarClock className="w-3 h-3" />
            <span>{formatDate(lead.updated_at)}</span>
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
  const [activeTab, setActiveTab] = useState<"outreach" | "inbound" | "dialogues" | "archive">("outreach");
  
  // View mode: Kanban vs Table
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");

  // Filtering State
  const [search, setSearch] = useState("");
  const [scoreFilter, setScoreFilter] = useState<"all" | "hot" | "warm" | "cold">("all");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [staleOnly, setStaleOnly] = useState<boolean>(false);
  const [hasScriptOnly, setHasScriptOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"default" | "score_desc" | "score_asc" | "date_desc" | "date_asc" | "name_asc">("default");

  // Conversations State
  const [conversations, setConversations] = useState<ConversationThread[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [convSearch, setConvSearch] = useState("");
  const [convCopied, setConvCopied] = useState(false);

  // Bulk operations
  const [selectedLeadIds, setSelectedLeadIds] = useState<number[]>([]);

  // Card interaction
  const [copiedLeadId, setCopiedLeadId] = useState<number | null>(null);
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isParserModalOpen, setIsParserModalOpen] = useState(false);
  const [parserQuery, setParserQuery] = useState("");
  const [parserLimit, setParserLimit] = useState(20);
  const [isParsing, setIsParsing] = useState(false);

  // Edit form in Modal
  const [editForm, setEditForm] = useState<Partial<Lead>>({});
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);

  const loadConversations = () => {
    fetch("/api/conversations")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setConversations(data);
          if (data.length > 0) {
            setSelectedSessionId((prev) => prev || data[0].session_id);
          }
        }
      })
      .catch((err) => console.error("Error loading conversations:", err));
  };

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      });
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedLead) {
      setEditForm(selectedLead);
      setIsEditingComment(false);
      setModalCopied(false);
    } else {
      setEditForm({});
      setIsEditingComment(false);
      setModalCopied(false);
    }
  }, [selectedLead]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const columns = activeTab === "outreach" ? OUTREACH_COLUMNS : INBOUND_COLUMNS;
  const archivedLeads = leads.filter(l => l.status === "archived");

  // Extract unique niches for filter dropdown
  const uniqueNiches = useMemo(() => {
    const set = new Set<string>();
    leads.forEach(l => {
      if (l.niche && l.niche.trim()) {
        set.add(l.niche.trim());
      }
    });
    return Array.from(set).sort();
  }, [leads]);

  // Active filters count for reset badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (search.trim()) count++;
    if (scoreFilter !== "all") count++;
    if (nicheFilter !== "all") count++;
    if (staleOnly) count++;
    if (hasScriptOnly) count++;
    if (sortBy !== "default") count++;
    return count;
  }, [search, scoreFilter, nicheFilter, staleOnly, hasScriptOnly, sortBy]);

  const resetAllFilters = () => {
    setSearch("");
    setScoreFilter("all");
    setNicheFilter("all");
    setStaleOnly(false);
    setHasScriptOnly(false);
    setSortBy("default");
  };

  // Filtered Conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (!convSearch.trim()) return true;
      const q = convSearch.toLowerCase();
      const matchName = (c.lead_name || "").toLowerCase().includes(q);
      const matchPhone = (c.lead_phone || "").toLowerCase().includes(q);
      const matchNiche = (c.lead_niche || "").toLowerCase().includes(q);
      const matchMsg = c.messages?.some((m) => m.message.toLowerCase().includes(q));
      return matchName || matchPhone || matchNiche || matchMsg;
    });
  }, [conversations, convSearch]);

  const selectedConversation = useMemo(() => {
    return conversations.find((c) => c.session_id === selectedSessionId) || conversations[0] || null;
  }, [conversations, selectedSessionId]);

  const copyConversationText = (conv: ConversationThread) => {
    const text = `💬 ДИАЛОГ: ${conv.lead_name || 'Клиент'} (${conv.lead_niche || 'Общая'})\nТелефон: ${conv.lead_phone || '—'}\nСессия: ${conv.session_id}\nДата: ${formatDate(conv.last_message_at)}\n====================================\n\n` +
      conv.messages.map(m => `[${m.role === 'user' ? '👤 Клиент' : '🤖 ИИ-Агент Samartsev AI'}] (${formatDate(m.created_at)}):\n${m.message}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setConvCopied(true);
    setTimeout(() => setConvCopied(false), 2000);
  };

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    let result = leads.filter(l => {
      if (l.type !== activeTab) return false;
      if (l.status === "archived" || l.status === "deleted") return false;

      // Search Query (name, website, phone, niche, comment)
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = l.name.toLowerCase().includes(q);
        const matchesWebsite = l.website && l.website.toLowerCase().includes(q);
        const matchesPhone = l.phone && l.phone.toLowerCase().includes(q);
        const matchesNiche = l.niche && l.niche.toLowerCase().includes(q);
        const matchesComment = l.comment && l.comment.toLowerCase().includes(q);
        if (!matchesName && !matchesWebsite && !matchesPhone && !matchesNiche && !matchesComment) {
          return false;
        }
      }

      // Score / Temperature Filter
      if (scoreFilter === "hot" && (l.score === undefined || l.score < 4)) return false;
      if (scoreFilter === "warm" && l.score !== 3) return false;
      if (scoreFilter === "cold" && (l.score === undefined || l.score > 2)) return false;

      // Niche Filter
      if (nicheFilter !== "all" && l.niche !== nicheFilter) return false;

      // Stale Filter (>3 days)
      if (staleOnly && !isLeadStale(l)) return false;

      // Has Script / Comment Filter
      if (hasScriptOnly && (!l.comment || !l.comment.trim())) return false;

      return true;
    });

    // Sorting
    if (sortBy === "score_desc") {
      result.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortBy === "score_asc") {
      result.sort((a, b) => (a.score || 0) - (b.score || 0));
    } else if (sortBy === "date_desc") {
      result.sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
    } else if (sortBy === "date_asc") {
      result.sort((a, b) => new Date(a.updated_at || 0).getTime() - new Date(b.updated_at || 0).getTime());
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }

    return result;
  }, [leads, activeTab, search, scoreFilter, nicheFilter, staleOnly, hasScriptOnly, sortBy]);

  // Statistics for KPI Ribbon
  const stats = useMemo(() => {
    const currentTabLeads = leads.filter(l => l.type === activeTab && l.status !== "archived" && l.status !== "deleted");
    const total = currentTabLeads.length;
    const hotCount = currentTabLeads.filter(l => l.score >= 4).length;
    const inProgressCount = currentTabLeads.filter(l => l.status === "testing" || l.status === "responded" || l.status === "audit" || l.status === "proposal").length;
    const staleCount = currentTabLeads.filter(l => isLeadStale(l)).length;

    return { total, hotCount, inProgressCount, staleCount };
  }, [leads, activeTab]);

  const checkIsDuplicate = (lead: Lead) => {
    if (!lead.website && !lead.phone) return false;
    return archivedLeads.some(a => 
      (a.website && lead.website && a.website.includes(lead.website)) || 
      (a.phone && lead.phone && a.phone === lead.phone)
    );
  };

  const handleCopyPitch = (e: React.MouseEvent, lead: Lead) => {
    e.stopPropagation();
    if (!lead.comment) return;
    navigator.clipboard.writeText(lead.comment);
    setCopiedLeadId(lead.id);
    setTimeout(() => setCopiedLeadId(null), 2000);
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
    const updatedLead = { ...selectedLead, ...editForm, updated_at: updatedDate } as Lead;
    
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

  // Bulk Action Handlers
  const toggleSelectAll = () => {
    if (selectedLeadIds.length === filteredLeads.length) {
      setSelectedLeadIds([]);
    } else {
      setSelectedLeadIds(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id: number) => {
    setSelectedLeadIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkArchive = async () => {
    if (selectedLeadIds.length === 0) return;
    if (!window.confirm(`Отправить в архив ${selectedLeadIds.length} выбранных лидов?`)) return;

    const updatedDate = new Date().toISOString();
    const updatedLeads = leads.map(l => 
      selectedLeadIds.includes(l.id) ? { ...l, status: "archived", updated_at: updatedDate } : l
    );
    setLeads(updatedLeads);
    setSelectedLeadIds([]);

    for (const id of selectedLeadIds) {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "archived", updated_at: updatedDate })
      });
    }
  };

  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedLeadIds.length === 0 || !newStatus) return;
    const updatedDate = new Date().toISOString();
    const updatedLeads = leads.map(l => 
      selectedLeadIds.includes(l.id) ? { ...l, status: newStatus, updated_at: updatedDate } : l
    );
    setLeads(updatedLeads);
    setSelectedLeadIds([]);

    for (const id of selectedLeadIds) {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, updated_at: updatedDate })
      });
    }
  };

  const handleExportCsv = () => {
    const listToExport = selectedLeadIds.length > 0 
      ? leads.filter(l => selectedLeadIds.includes(l.id))
      : filteredLeads;

    if (listToExport.length === 0) {
      alert("Нет лидов для экспорта");
      return;
    }

    const headers = ["ID", "Тип", "Название", "Ниша", "Телефон", "Сайт", "Статус", "Score", "Сценарий / Заметки", "Дата обновления"];
    const rows = listToExport.map(l => [
      l.id,
      l.type,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.niche || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      l.status,
      l.score || 0,
      `"${(l.comment || '').replace(/"/g, '""')}"`,
      l.updated_at || ""
    ]);

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(e => e.join(";"))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `samartsev_leads_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {/* Top Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CRM Лидов</h1>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Samartsev AI
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex bg-gray-200/60 p-1 rounded-xl border border-gray-200 shadow-inner">
              <button 
                onClick={() => { setActiveTab("outreach"); setSelectedLeadIds([]); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "outreach" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                Холодный аутрич
              </button>
              <button 
                onClick={() => { setActiveTab("inbound"); setSelectedLeadIds([]); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "inbound" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                Входящие заявки
              </button>
              <button 
                onClick={() => { setActiveTab("dialogues"); setSelectedLeadIds([]); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "dialogues" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Диалоги чата</span>
                {conversations.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {conversations.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => { setActiveTab("archive"); setSelectedLeadIds([]); }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === "archive" ? "bg-white text-red-600 shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
              >
                Архив ({archivedLeads.length})
              </button>
            </div>

            {/* View Mode Toggle */}
            {activeTab !== "archive" && activeTab !== "dialogues" && (
              <div className="flex bg-gray-200/60 p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "kanban" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                  title="Вид: Канбан-доска"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "table" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}
                  title="Вид: Таблица"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition-colors shadow-sm"
            title="Экспортировать в CSV"
          >
            <Download className="w-4 h-4 text-gray-500" /> Экспорт
          </button>
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
            <Plus className="w-4 h-4" /> Добавить лид
          </button>
        </div>
      </div>

      {/* KPI Summary Ribbon (Only on Active Pipelines) */}
      {activeTab !== "archive" && activeTab !== "dialogues" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">Всего в воронке</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
              <span className="text-xs text-gray-400">лидов</span>
            </div>
          </div>

          <div 
            onClick={() => setScoreFilter(scoreFilter === "hot" ? "all" : "hot")}
            className={`border rounded-xl p-3.5 shadow-sm cursor-pointer transition-all ${
              scoreFilter === "hot" 
                ? "bg-red-50/80 border-red-300 ring-2 ring-red-400/20" 
                : "bg-white border-gray-200/80 hover:border-red-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-red-700 font-medium flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-red-600" /> Горячие цели
              </p>
              {scoreFilter === "hot" && <span className="text-[10px] bg-red-200 text-red-800 px-1.5 rounded">активен</span>}
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-red-600">{stats.hotCount}</span>
              <span className="text-xs text-red-500 font-medium">4–5 ★</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-3.5 shadow-sm">
            <p className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> В активной работе
            </p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-gray-900">{stats.inProgressCount}</span>
              <span className="text-xs text-gray-400">в процессе</span>
            </div>
          </div>

          <div 
            onClick={() => setStaleOnly(!staleOnly)}
            className={`border rounded-xl p-3.5 shadow-sm cursor-pointer transition-all ${
              staleOnly 
                ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20" 
                : "bg-white border-gray-200/80 hover:border-amber-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-amber-700 font-medium flex items-center gap-1">
                <Timer className="w-3.5 h-3.5 text-amber-600" /> Зависшие (&gt;3д)
              </p>
              {staleOnly && <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 rounded">активен</span>}
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-bold text-amber-600">{stats.staleCount}</span>
              <span className="text-xs text-amber-600">ждут касания</span>
            </div>
          </div>
        </div>
      )}

      {/* FILTER & SEARCH TOOLBAR */}
      {activeTab !== "archive" && activeTab !== "dialogues" && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-4 shadow-sm space-y-3">
          {/* Top Row: Search & Dropdowns */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Поиск по названию, сайту, телефону, нише, питчу..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
              />
              {search && (
                <button 
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Niche Dropdown */}
              <div className="relative">
                <select
                  value={nicheFilter}
                  onChange={(e) => setNicheFilter(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">Все ниши ({uniqueNiches.length})</option>
                  {uniqueNiches.map(niche => (
                    <option key={niche} value={niche}>{niche}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Score Dropdown */}
              <div className="relative">
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value as any)}
                  className="appearance-none pl-3 pr-8 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="all">Все оценки</option>
                  <option value="hot">🔥 Горячие (4–5 ★)</option>
                  <option value="warm">⚡ Теплые (3 ★)</option>
                  <option value="cold">💤 Низкие (1–2 ★)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-7 pr-8 py-2 bg-gray-50/70 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                >
                  <option value="default">Сортировка по умолчанию</option>
                  <option value="score_desc">Сначала горячие (Score ↓)</option>
                  <option value="score_asc">Сначала холодные (Score ↑)</option>
                  <option value="date_desc">Сначала свежие (Дата ↓)</option>
                  <option value="date_asc">Сначала старые (Дата ↑)</option>
                  <option value="name_asc">По алфавиту (А–Я)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bottom Row: Quick Filter Preset Chips */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-gray-400 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Быстрые фильтры:
              </span>
              
              <button
                onClick={() => setScoreFilter(scoreFilter === "hot" ? "all" : "hot")}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scoreFilter === "hot" 
                    ? "bg-red-500 text-white shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                🔥 Только горячие
              </button>

              <button
                onClick={() => setScoreFilter(scoreFilter === "warm" ? "all" : "warm")}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  scoreFilter === "warm" 
                    ? "bg-amber-500 text-white shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                ⚡ Теплые
              </button>

              <button
                onClick={() => setHasScriptOnly(!hasScriptOnly)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  hasScriptOnly 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                📝 С готовым питчем
              </button>

              <button
                onClick={() => setStaleOnly(!staleOnly)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  staleOnly 
                    ? "bg-amber-600 text-white shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                ⏳ Зависшие (&gt;3д)
              </button>
            </div>

            {/* Results count and Reset button */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                Найдено: <strong className="text-gray-900">{filteredLeads.length}</strong> из {leads.filter(l => l.type === activeTab && l.status !== "archived").length}
              </span>
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-medium transition-colors"
                  title="Сбросить все фильтры"
                >
                  <RotateCcw className="w-3 h-3" /> Сбросить ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DIALOGUES VIEW */}
      {activeTab === "dialogues" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 mt-4 min-h-[720px]">
          {/* Left List of Dialogues */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col h-[750px]">
            <div className="p-4 border-b border-gray-100 bg-gray-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  Активные диалоги ({filteredConversations.length})
                </h3>
                <button
                  onClick={loadConversations}
                  title="Обновить диалоги"
                  className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск по имени, номеру, тексту..."
                  value={convSearch}
                  onChange={(e) => setConvSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 p-2 space-y-1 custom-scrollbar">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-16 text-gray-400 text-sm">
                  Диалоги не найдены
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isSelected = selectedConversation?.session_id === conv.session_id;
                  const lastMsg = conv.messages && conv.messages.length > 0 
                    ? conv.messages[conv.messages.length - 1] 
                    : null;
                  return (
                    <button
                      key={conv.session_id}
                      onClick={() => setSelectedSessionId(conv.session_id)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all flex flex-col gap-1.5 ${
                        isSelected
                          ? "bg-emerald-50/90 border border-emerald-300 shadow-sm ring-1 ring-emerald-400/30"
                          : "hover:bg-gray-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900 truncate max-w-[200px]">
                          {conv.lead_name || `Посетитель #${conv.lead_id || conv.session_id.slice(0, 6)}`}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {formatDate(conv.last_message_at)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          {conv.lead_niche || "Общая"}
                        </span>
                        {conv.lead_phone && (
                          <span className="text-gray-600 font-medium text-[11px]">
                            {conv.lead_phone}
                          </span>
                        )}
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold ml-auto">
                          💬 {conv.message_count || conv.messages.length}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5">
                        {lastMsg ? `${lastMsg.role === 'user' ? 'Клиент: ' : 'AI: '}${lastMsg.message}` : "Нет сообщений"}
                      </p>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Chat History View */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-[750px] overflow-hidden">
            {selectedConversation ? (
              <>
                {/* Chat Top Header */}
                <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-lg font-bold text-gray-900">
                        {selectedConversation.lead_name || "Посетитель сайта"}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                        {selectedConversation.lead_niche || "Общая"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                      {selectedConversation.lead_phone ? (
                        <a 
                          href={`tel:${selectedConversation.lead_phone}`}
                          className="font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {selectedConversation.lead_phone}
                        </a>
                      ) : (
                        <span className="text-gray-400">Телефон не указан</span>
                      )}
                      <span>• Всего сообщений: {selectedConversation.messages.length}</span>
                      <span>• Сессия: {selectedConversation.session_id.slice(0, 8)}...</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyConversationText(selectedConversation)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-700 flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      {convCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                      {convCopied ? "Скопировано!" : "Скопировать диалог"}
                    </button>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F9FAFB]/60 custom-scrollbar">
                  {selectedConversation.messages.map((msg, idx) => {
                    const isUser = msg.role === "user";
                    return (
                      <div
                        key={msg.id || idx}
                        className={`flex gap-3 items-start ${isUser ? "justify-end" : "justify-start"}`}
                      >
                        {!isUser && (
                          <div className="w-8 h-8 rounded-full bg-[#111827] text-[#00E68A] flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm border border-emerald-500/30">
                            AI
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm text-sm ${
                            isUser
                              ? "bg-emerald-600 text-white rounded-tr-none"
                              : "bg-white text-gray-900 rounded-tl-none border border-gray-200"
                          }`}
                        >
                          <div className={`flex items-center justify-between gap-4 mb-1.5 text-[11px] ${isUser ? "text-emerald-100" : "text-gray-400"}`}>
                            <span className="font-semibold">
                              {isUser ? "Клиент" : "ИИ-Агент Samartsev AI 24/7"}
                            </span>
                            <span>{formatDate(msg.created_at)}</span>
                          </div>
                          <p className="whitespace-pre-wrap leading-relaxed font-sans">
                            {msg.message}
                          </p>
                        </div>

                        {isUser && (
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 border border-emerald-200">
                            👤
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-32">
                <MessageSquare className="w-12 h-12 mb-3 stroke-[1.5] text-gray-300" />
                <p className="font-semibold text-gray-600">Выберите диалог слева для просмотра</p>
              </div>
            )}
          </div>
        </div>
      ) : activeTab === "archive" ? (
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
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">{lead.type}</span>
                    </div>
                    {lead.niche && <p className="text-xs text-emerald-700 font-medium mb-2">{lead.niche}</p>}
                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-1"><Globe className="w-3 h-3"/> {lead.website || "—"}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-3"><Phone className="w-3 h-3"/> {lead.phone || "—"}</p>
                  </div>
                  <button 
                    onClick={() => updateLeadStatus(lead.id, "new")} 
                    className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-gray-200 hover:border-emerald-500 text-sm text-gray-700 hover:text-emerald-600 rounded-lg transition-colors shadow-sm"
                  >
                    <RefreshCcw className="w-4 h-4" /> Восстановить в &quot;Новые&quot;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : viewMode === "kanban" ? (
        /* KANBAN BOARD VIEW */
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
                        onCopyPitch={handleCopyPitch}
                        isCopied={copiedLeadId === lead.id}
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
                <SortableLeadCard 
                  lead={activeLead} 
                  isDuplicate={checkIsDuplicate(activeLead)} 
                  onClick={() => {}} 
                  onCopyPitch={() => {}}
                  isCopied={false}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        /* TABLE / LIST VIEW */
        <div className="bg-white border border-gray-200 rounded-2xl mt-4 shadow-sm overflow-hidden flex flex-col">
          {/* Bulk Operations Toolbar */}
          {selectedLeadIds.length > 0 && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-full">
                  Выбрано: {selectedLeadIds.length}
                </span>
                <span className="text-xs text-emerald-800">лидов для массовых действий</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  onChange={(e) => {
                    if (e.target.value) handleBulkStatusChange(e.target.value);
                  }}
                  defaultValue=""
                  className="text-xs bg-white border border-emerald-300 rounded-lg px-2.5 py-1 text-gray-800 font-medium focus:outline-none"
                >
                  <option value="" disabled>Сменить статус на...</option>
                  {columns.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>

                <button
                  onClick={handleBulkArchive}
                  className="flex items-center gap-1 text-xs bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-lg font-medium transition-colors"
                >
                  <Archive className="w-3 h-3 text-gray-500" /> В архив
                </button>

                <button
                  onClick={handleExportCsv}
                  className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-3 h-3" /> Экспорт выбранных
                </button>

                <button
                  onClick={() => setSelectedLeadIds([])}
                  className="text-xs text-gray-500 hover:text-gray-700 ml-2"
                >
                  Снять выбор
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                  <th className="p-3 w-10 text-center">
                    <button 
                      onClick={toggleSelectAll} 
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      title={selectedLeadIds.length === filteredLeads.length ? "Снять выбор со всех" : "Выбрать все"}
                    >
                      {selectedLeadIds.length > 0 && selectedLeadIds.length === filteredLeads.length ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-3">Компания / Ниша</th>
                  <th className="p-3">Оценка (Score)</th>
                  <th className="p-3">Контакты</th>
                  <th className="p-3">Статус воронки</th>
                  <th className="p-3">Сценарий захода</th>
                  <th className="p-3">Обновлено</th>
                  <th className="p-3 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-10 text-gray-500">
                      Лиды не найдены. Попробуйте изменить параметры поиска или фильтров.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => {
                    const isSelected = selectedLeadIds.includes(lead.id);
                    const isDuplicate = checkIsDuplicate(lead);
                    const isStale = isLeadStale(lead) && lead.status !== "offer_sent" && lead.status !== "success";

                    return (
                      <tr 
                        key={lead.id} 
                        className={`hover:bg-gray-50/80 transition-colors ${isSelected ? "bg-emerald-50/40" : ""}`}
                      >
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => toggleSelectLead(lead.id)}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                        </td>

                        {/* Company & Niche */}
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span 
                              onClick={() => setSelectedLead(lead)} 
                              className="font-bold text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors"
                            >
                              {lead.name}
                            </span>
                            {isDuplicate && (
                              <span className="bg-red-100 text-red-700 text-[9px] font-bold px-1.5 py-0.2 rounded" title="Есть дубликат в архиве">
                                Дубликат
                              </span>
                            )}
                            {isStale && (
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-medium px-1.5 py-0.2 rounded" title="Не обновлялся более 3 дней">
                                3д+
                              </span>
                            )}
                          </div>
                          {lead.niche && (
                            <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
                              {lead.niche}
                            </span>
                          )}
                        </td>

                        {/* Score */}
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <div className="flex text-yellow-400">
                              {lead.score !== undefined && lead.score > 0 && [...Array(lead.score)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            {lead.score >= 4 && (
                              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-1 py-0.5 rounded">
                                🔥 Горячий
                              </span>
                            )}
                            {lead.score === 3 && (
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-1 py-0.5 rounded">
                                ⚡ Теплый
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Contacts */}
                        <td className="p-3">
                          <div className="space-y-0.5">
                            {lead.phone && (
                              <a 
                                href={`tel:${lead.phone.replace(/[^+\d]/g, '')}`} 
                                className="flex items-center gap-1 text-gray-700 hover:text-emerald-600 transition-colors"
                              >
                                <Phone className="w-3 h-3 text-gray-400" /> {lead.phone}
                              </a>
                            )}
                            {lead.website && (
                              <a 
                                href={formatWebsiteUrl(lead.website)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center gap-1 text-emerald-600 hover:underline"
                              >
                                <Globe className="w-3 h-3 text-gray-400" /> {lead.website}
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Status Select */}
                        <td className="p-3">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            {columns.map(col => (
                              <option key={col.id} value={col.id}>{col.title}</option>
                            ))}
                          </select>
                        </td>

                        {/* Script / Pitch */}
                        <td className="p-3 max-w-[220px]">
                          {lead.comment ? (
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-gray-600 truncate text-[11px] italic" title={lead.comment}>
                                {lead.comment.slice(0, 35)}...
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleCopyPitch(e, lead)}
                                className={`p-1 rounded transition-colors ${copiedLeadId === lead.id ? "text-emerald-700 bg-emerald-100" : "text-gray-400 hover:text-emerald-600"}`}
                                title="Скопировать сценарий"
                              >
                                {copiedLeadId === lead.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-300 italic text-[11px]">Нет питча</span>
                          )}
                        </td>

                        {/* Updated at */}
                        <td className="p-3 text-gray-500 text-[11px] whitespace-nowrap">
                          {formatDate(lead.updated_at)}
                        </td>

                        {/* Row Actions */}
                        <td className="p-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                              title="Редактировать лид"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => updateLeadStatus(lead.id, "archived")}
                              className="p-1.5 text-gray-500 hover:text-amber-700 bg-gray-100 hover:bg-amber-50 rounded-lg transition-colors"
                              title="В архив"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
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
                    <div className="flex gap-2 mt-2">
                      {editForm.score !== undefined && editForm.score >= 4 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                          🔥 Горячий лид
                        </span>
                      )}
                      {editForm.score === 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">
                          ⚡ Теплый лид
                        </span>
                      )}
                      {editForm.score !== undefined && editForm.score > 0 && editForm.score <= 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gray-50 text-gray-600 border border-gray-200">
                          💤 Низкий приоритет
                        </span>
                      )}
                    </div>
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
                        list="crm-niche-options"
                        placeholder="Например: Стоматология"
                        className="font-medium text-gray-900 w-full bg-transparent focus:outline-none"
                      />
                      <datalist id="crm-niche-options">
                        <option value="Стоматология" />
                        <option value="Салон красоты" />
                        <option value="Автосервис" />
                        <option value="Детейлинг" />
                        <option value="Медицина" />
                        <option value="Недвижимость" />
                        <option value="E-commerce" />
                        <option value="B2B SaaS" />
                      </datalist>
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

                  {/* AI Checklist */}
                  <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100/70">
                    <p className="text-xs font-semibold text-emerald-800 mb-2.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-current" /> ИИ-Диагностика лида
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      {getChecklistItems(editForm, selectedLead).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 py-0.5">
                          {item.checked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-300 shrink-0" />
                          )}
                          <span className={item.checked ? "text-gray-900 font-medium" : "text-gray-400"}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comment / Notes */}
                  <div>
                    {!isEditingComment ? (
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs text-gray-500 font-medium">Сценарий захода / Заметки</label>
                          <div className="flex gap-2">
                            <button 
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(editForm.comment || "");
                                setModalCopied(true);
                                setTimeout(() => setModalCopied(false), 2000);
                              }}
                              className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                              title="Скопировать сценарий в буфер обмена"
                            >
                              {modalCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              {modalCopied ? "Скопировано!" : "Копировать"}
                            </button>
                            <button 
                              type="button"
                              onClick={() => setIsEditingComment(true)}
                              className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                            >
                              <Edit className="w-3 h-3" /> Редактировать
                            </button>
                          </div>
                        </div>
                        <div className="w-full bg-emerald-50/10 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar shadow-inner">
                          {editForm.comment || <span className="text-gray-400 italic">Сценарий не заполнен. Вы можете добавить его вручную.</span>}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs text-gray-500 font-medium">Редактирование комментария</label>
                          <button 
                            type="button"
                            onClick={() => setIsEditingComment(false)}
                            className="text-[11px] text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                          >
                            Готово (просмотр)
                          </button>
                        </div>
                        <textarea 
                          value={editForm.comment || ""}
                          onChange={e => setEditForm({...editForm, comment: e.target.value})}
                          placeholder="Оставь заметку об этом лиде..."
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[250px] custom-scrollbar shadow-sm leading-relaxed"
                        />
                      </div>
                    )}
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
                <input 
                  name="niche" 
                  type="text" 
                  list="add-crm-niche-options"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
                  placeholder="Например: Стоматология" 
                />
                <datalist id="add-crm-niche-options">
                  <option value="Стоматология" />
                  <option value="Салон красоты" />
                  <option value="Автосервис" />
                  <option value="Детейлинг" />
                  <option value="Медицина" />
                  <option value="Недвижимость" />
                  <option value="E-commerce" />
                  <option value="B2B SaaS" />
                </datalist>
              </div>
              
              <button type="submit" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm">
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
                className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors shadow-sm"
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
