'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Sparkles,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Send,
  Copy,
  ExternalLink,
  Eye,
  RefreshCw,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  X,
  ShieldAlert,
  Globe,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ProjectItem,
  INITIAL_PROJECTS,
  MONITORED_SOURCES,
  generateOutreachLetter,
  exportProjectsToCSV,
} from '@/data/architectureDemoData';

export default function ArchitectureDemoDashboard() {
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyEasternZone, setOnlyEasternZone] = useState<boolean>(false);
  const [onlyHighPriority, setOnlyHighPriority] = useState<boolean>(false);

  // Expanded comments state
  const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);
  const [allCommentsExpanded, setAllCommentsExpanded] = useState<boolean>(false);

  // Modals state
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ProjectItem | null>(null);
  const [selectedProjectForOutreach, setSelectedProjectForOutreach] = useState<ProjectItem | null>(null);
  const [outreachSubject, setOutreachSubject] = useState('');
  const [outreachBody, setOutreachBody] = useState('');
  const [copiedOutreach, setCopiedOutreach] = useState(false);

  // Scanning simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [lastScanTime, setLastScanTime] = useState('Сегодня, 13:00');

  // Contacted projects IDs
  const [contactedIds, setContactedIds] = useState<number[]>([]);

  // Toggle individual comment expansion
  const toggleExpandComment = (id: number) => {
    setExpandedCommentIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all comments expansion
  const toggleAllComments = () => {
    if (allCommentsExpanded || expandedCommentIds.length === projects.length) {
      setExpandedCommentIds([]);
      setAllCommentsExpanded(false);
    } else {
      setExpandedCommentIds(projects.map((p) => p.id));
      setAllCommentsExpanded(true);
    }
  };

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.project.toLowerCase().includes(q);
        const matchesDev = p.developer.toLowerCase().includes(q);
        const matchesCity = p.city.toLowerCase().includes(q);
        const matchesAi = p.aiComment.toLowerCase().includes(q);
        if (!matchesName && !matchesDev && !matchesCity && !matchesAi) return false;
      }

      // Type
      if (selectedType !== 'all' && p.type !== selectedType) return false;

      // Stage
      if (selectedStage !== 'all' && p.stage !== selectedStage) return false;

      // Region
      if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;

      // Status
      if (selectedStatus === 'target' && p.status === 'blacklist') return false;
      if (selectedStatus === 'blacklist' && p.status !== 'blacklist') return false;
      if (selectedStatus === 'new' && p.status !== 'new') return false;
      if (selectedStatus === 'updated' && p.status !== 'updated') return false;

      // Eastern Zone toggle
      if (onlyEasternZone && !p.isEasternZone) return false;

      // High priority toggle
      if (onlyHighPriority && p.priority !== 'high') return false;

      return true;
    });
  }, [projects, searchQuery, selectedType, selectedStage, selectedRegion, selectedStatus, onlyEasternZone, onlyHighPriority]);

  // Statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const highPriorityCount = projects.filter((p) => p.priority === 'high' && p.status !== 'blacklist').length;
    const easternCount = projects.filter((p) => p.isEasternZone).length;
    const blacklistCount = projects.filter((p) => p.status === 'blacklist').length;
    const newCount = projects.filter((p) => p.status === 'new').length;

    // Regions distribution
    const regionCounts: Record<string, number> = {};
    projects.forEach((p) => {
      regionCounts[p.region] = (regionCounts[p.region] || 0) + 1;
    });

    return { total, highPriorityCount, easternCount, blacklistCount, newCount, regionCounts };
  }, [projects]);

  // Handle open outreach modal
  const handleOpenOutreach = (project: ProjectItem) => {
    const letter = generateOutreachLetter(project);
    setSelectedProjectForOutreach(project);
    setOutreachSubject(letter.subject);
    setOutreachBody(letter.body);
    setCopiedOutreach(false);
  };

  // Copy outreach
  const handleCopyOutreach = () => {
    navigator.clipboard.writeText(`Тема: ${outreachSubject}\n\n${outreachBody}`);
    setCopiedOutreach(true);
    setTimeout(() => setCopiedOutreach(false), 2500);
  };

  // Mark as outreach sent
  const handleMarkContacted = (id: number) => {
    if (!contactedIds.includes(id)) {
      setContactedIds([...contactedIds, id]);
    }
    setSelectedProjectForOutreach(null);
  };

  // Trigger manual scan simulation
  const handleTriggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanMessage('Сбор данных: подключение к РБК, Коммерсантъ, archi.ru, сайтам девелоперов...');
    
    setTimeout(() => {
      setScanMessage('Нейросетевая фильтрация: отсечение госзакупок, проверка чёрного списка, скоринг...');
    }, 1200);

    setTimeout(() => {
      setIsScanning(false);
      setScanMessage('✅ Сканирование завершено: 10 источников обновлены. Новых изменений: 0.');
      const now = new Date();
      setLastScanTime(`Сегодня, ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
      setTimeout(() => setScanMessage(null), 4000);
    }, 2500);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStage('all');
    setSelectedRegion('all');
    setSelectedStatus('all');
    setOnlyEasternZone(false);
    setOnlyHighPriority(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 selection:bg-[#00E68A] selection:text-black">
      {/* Top Banner: Context & Telegram link */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border-b border-emerald-500/20 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#00E68A] animate-pulse"></span>
            <span className="font-semibold text-[#00E68A]">Демо-версия</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">ИИ-мониторинг девелоперских проектов для Архитектурного бюро</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/alex_samartsev"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00E68A] hover:bg-emerald-400 text-slate-950 font-bold transition shadow-xs text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Обсудить проект
            </a>
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs"
            >
              На главную <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#00E68A]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Мониторинг девелоперских проектов РФ
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Автоматический сбор строек на ранних стадиях • AI-оценка потенциала • Готовые Outreach-письма
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleTriggerScan}
              disabled={isScanning}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-[#00E68A] shadow-xs transition disabled:opacity-50 cursor-pointer"
              title="Запустить внеочередной парсинг 10 изданий и сайтов"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-[#00E68A]' : ''}`} />
              <span>{isScanning ? 'Сканирование...' : 'Собрать свежие данные'}</span>
            </button>

            <button
              onClick={() => exportProjectsToCSV(filteredProjects)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#111111] dark:bg-[#00E68A] hover:bg-slate-800 dark:hover:bg-emerald-400 text-white dark:text-slate-950 shadow-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Экспорт в Excel / CSV</span>
            </button>
          </div>
        </div>

        {/* Live scanning banner notification if active */}
        {scanMessage && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00E68A] animate-bounce" />
              <span>{scanMessage}</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">10 источников</span>
          </div>
        )}

        {/* Quick KPI Stats Cards - Compact Width & Height */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
          <div className="bg-white dark:bg-slate-900/80 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Всего проектов</span>
              <Layers className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {stats.total}
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-600 dark:text-[#00E68A] flex items-center gap-1 font-medium">
              <span>+{stats.newCount} новых за 72ч</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/80 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Высокий приоритет</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-[#00E68A]">
              {stats.highPriorityCount}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Ранняя стадия (вход до тендера)
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/80 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Восток РФ</span>
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.easternCount}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Сибирь + Дальний Восток
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900/80 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Non-Target</span>
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
              {stats.blacklistCount}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Чёрный список застройщиков
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/40 dark:to-slate-900 rounded-xl p-3.5 sm:p-4 border border-emerald-500/20 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Экономия времени</span>
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              2 ч<span className="text-xs font-normal text-slate-500 dark:text-slate-400"> / день</span>
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              40+ ч рутины в месяц
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
          <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск по названию ЖК, девелоперу (ПИК, ЛСР, Самолёт), городу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00E68A] focus:border-transparent transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <button
                onClick={() => setOnlyHighPriority(!onlyHighPriority)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border cursor-pointer ${
                  onlyHighPriority
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-[#00E68A]'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Высокий приоритет ({stats.highPriorityCount})
              </button>

              <button
                onClick={() => setOnlyEasternZone(!onlyEasternZone)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 border cursor-pointer ${
                  onlyEasternZone
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <MapPin className="w-3 h-3" />
                Восток РФ ({stats.easternCount})
              </button>

              {(searchQuery || selectedType !== 'all' || selectedStage !== 'all' || selectedRegion !== 'all' || selectedStatus !== 'all' || onlyEasternZone || onlyHighPriority) && (
                <button
                  onClick={handleResetFilters}
                  className="px-2.5 py-1.5 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 whitespace-nowrap transition cursor-pointer"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>

          {/* Detailed Select Filters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {/* Type */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                Тип объекта:
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#00E68A] focus:outline-none"
              >
                <option value="all">Все типы (10)</option>
                <option value="ЖК">Жилые комплексы (ЖК)</option>
                <option value="Бизнес-центр">Бизнес-центры / МФК</option>
                <option value="Музей">Музеи и культура</option>
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                Стадия проекта:
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#00E68A] focus:outline-none"
              >
                <option value="all">Все стадии</option>
                <option value="Мастерплан">Мастерплан (ранний вход)</option>
                <option value="Архитектурная концепция">Архитектурная концепция</option>
                <option value="Эскиз">Эскиз</option>
                <option value="АГО">АГО</option>
              </select>
            </div>

            {/* Region */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                Регион РФ:
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#00E68A] focus:outline-none"
              >
                <option value="all">Все регионы (РФ)</option>
                <option value="Дальний Восток">Дальний Восток</option>
                <option value="Сибирь">Сибирь</option>
                <option value="Урал">Урал</option>
                <option value="Поволжье">Поволжье</option>
                <option value="Юг">Юг</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                Статус целесообразности:
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-[#00E68A] focus:outline-none"
              >
                <option value="all">Все статусы</option>
                <option value="target">Только целевые</option>
                <option value="new">Новые (New)</option>
                <option value="updated">Обновлённые (Updated)</option>
                <option value="blacklist">⚠️ Non-Target (Чёрный список)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Expand All Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div>
              Найдено проектов: <span className="font-semibold text-slate-900 dark:text-white">{filteredProjects.length}</span> из {projects.length}
            </div>
            <button
              onClick={toggleAllComments}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-[#00E68A] shadow-xs transition cursor-pointer"
            >
              {allCommentsExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Свернуть все AI-оценки</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Развернуть все AI-оценки</span>
                </>
              )}
            </button>
          </div>
          <div className="text-xs text-slate-400">
            Последняя синхронизация: {lastScanTime}
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800 text-xs">
                <tr>
                  <th className="py-3 px-3.5">Дата</th>
                  <th className="py-3 px-3.5 min-w-[180px]">Проект и Девелопер</th>
                  <th className="py-3 px-3.5">Тип</th>
                  <th className="py-3 px-3.5">Стадия</th>
                  <th className="py-3 px-3.5">Город / Регион</th>
                  <th className="py-3 px-3.5">Параметры</th>
                  <th className="py-3 px-3.5 min-w-[300px]">
                    <div className="flex items-center justify-between">
                      <span>AI-Оценка и Рекомендация</span>
                      <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">(нажмите для раскрытия)</span>
                    </div>
                  </th>
                  <th className="py-3 px-3.5 text-right">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-slate-400">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p>Проекты по заданным фильтрам не найдены</p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-2 text-xs text-emerald-600 dark:text-[#00E68A] hover:underline cursor-pointer"
                      >
                        Сбросить фильтры
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => {
                    const isContacted = contactedIds.includes(p.id);
                    const isBlacklist = p.status === 'blacklist';
                    const isExpanded = expandedCommentIds.includes(p.id) || allCommentsExpanded;

                    return (
                      <tr
                        key={p.id}
                        className={`transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40 ${
                          isBlacklist
                            ? 'bg-amber-500/5 dark:bg-amber-500/5'
                            : p.priority === 'high'
                            ? 'bg-emerald-500/[0.02] dark:bg-emerald-500/[0.02]'
                            : ''
                        }`}
                      >
                        {/* Date */}
                        <td className="py-3 px-3.5 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {p.date.split('-').reverse().slice(0, 2).join('.')}
                        </td>

                        {/* Project & Developer */}
                        <td className="py-3 px-3.5">
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{p.project}</span>
                            {p.status === 'new' && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-[#00E68A] border border-emerald-500/20">
                                NEW
                              </span>
                            )}
                            {p.status === 'updated' && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                                UPD
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{p.developer}</span>
                            {isBlacklist && (
                              <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5 text-[11px]">
                                <AlertTriangle className="w-3 h-3" /> Non-Target
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Type */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            p.type === 'ЖК'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : p.type === 'Бизнес-центр'
                              ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          }`}>
                            {p.type}
                          </span>
                        </td>

                        {/* Stage */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-slate-200 text-xs">
                            {p.stage}
                          </div>
                          {p.stage === 'Мастерплан' && (
                            <span className="text-[10px] text-emerald-600 dark:text-[#00E68A] font-medium">
                              ★ Ранний вход
                            </span>
                          )}
                          {p.stage === 'Архитектурная концепция' && (
                            <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                              ★ Формирование ТЗ
                            </span>
                          )}
                        </td>

                        {/* Location */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="font-medium text-slate-800 dark:text-slate-200 text-xs flex items-center gap-1">
                            <span>{p.city}</span>
                            {p.isEasternZone && (
                              <span title="Приоритетная восточная зона РФ" className="text-indigo-500">🧭</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {p.region}
                          </div>
                        </td>

                        {/* Specs */}
                        <td className="py-3 px-3.5 whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">
                          <div>{p.area}</div>
                          <div className="text-[11px] text-slate-400">{p.floors} эт.</div>
                        </td>

                        {/* AI Comment (Expandable) */}
                        <td className="py-3 px-3.5">
                          <div
                            onClick={() => toggleExpandComment(p.id)}
                            className={`text-xs rounded-xl p-2.5 border cursor-pointer transition-all duration-200 select-text ${
                              isExpanded
                                ? 'shadow-xs ring-1 ring-emerald-500/30 dark:ring-emerald-500/40'
                                : 'hover:border-emerald-500/40 dark:hover:border-emerald-500/40'
                            } ${
                              isBlacklist
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200'
                                : p.priority === 'high'
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-800 dark:text-slate-200'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <Sparkles className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                isBlacklist ? 'text-amber-500' : 'text-[#00E68A]'
                              }`} />
                              <div className="flex-1">
                                <p className={`leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                  {p.aiComment}
                                </p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpandComment(p.id);
                                  }}
                                  className="mt-1 text-[11px] font-semibold text-emerald-600 dark:text-[#00E68A] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  {isExpanded ? (
                                    <>
                                      <span>Свернуть</span>
                                      <ChevronUp className="w-3 h-3" />
                                    </>
                                  ) : (
                                    <>
                                      <span>Читать полностью</span>
                                      <ChevronDown className="w-3 h-3" />
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                              <span>Источник: {p.source}</span>
                              <a
                                href={p.sourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-emerald-600 dark:text-[#00E68A] hover:underline flex items-center gap-0.5"
                              >
                                Ссылка <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {!isBlacklist && (
                              <button
                                onClick={() => handleOpenOutreach(p)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 border cursor-pointer ${
                                  isContacted
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-[#00E68A]'
                                    : 'bg-[#111111] dark:bg-[#00E68A] hover:bg-slate-800 dark:hover:bg-emerald-400 text-white dark:text-slate-950 border-transparent shadow-xs'
                                }`}
                                title="Сгенерировать персонализированное письмо для девелопера"
                              >
                                {isContacted ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>КП отправлено</span>
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-3 h-3" />
                                    <span>Outreach</span>
                                  </>
                                )}
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedProjectForDetail(p)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                              title="Подробная карточка"
                            >
                              <Eye className="w-4 h-4" />
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

        {/* Analytics & Monitored Sources Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Regional Activity Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs lg:col-span-2 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Активность девелоперов по регионам
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">Безопасная зона: Восток РФ</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { name: 'Дальний Восток', count: 3, percentage: 30, color: 'bg-emerald-500', isEast: true },
                { name: 'Сибирь', count: 3, percentage: 30, color: 'bg-teal-500', isEast: true },
                { name: 'Юг', count: 1, percentage: 10, color: 'bg-blue-500', isEast: false },
                { name: 'Урал', count: 1, percentage: 10, color: 'bg-purple-500', isEast: false },
                { name: 'Поволжье', count: 1, percentage: 10, color: 'bg-amber-500', isEast: false },
              ].map((reg) => (
                <div key={reg.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      {reg.name}
                      {reg.isEast && <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-500 font-semibold">Приоритет</span>}
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {reg.count} {reg.count === 1 ? 'проект' : 'проекта'} ({reg.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${reg.color} rounded-full transition-all duration-500`}
                      style={{ width: `${reg.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 border border-slate-200/60 dark:border-slate-800">
              <Info className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                <strong>Инсайт нейросети:</strong> Дальний Восток и Сибирь генерируют 60% ранних запросов на проектирование. В этих регионах федеральные девелоперы чаще привлекают независимые архитектурные бюро.
              </span>
            </div>
          </div>

          {/* Monitored Sources list */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" />
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Источники (10+)
                </h2>
              </div>
              <span className="text-xs text-emerald-600 dark:text-[#00E68A] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E68A] animate-pulse"></span>
                Синхронизированы
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[220px] overflow-y-auto pr-1">
              {MONITORED_SOURCES.map((src, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{src.name}</div>
                    <div className="text-[10px] text-slate-400">{src.category}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-[#00E68A]">
                      {src.lastChecked}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-400 text-center pt-1">
              Частота сканирования: 1 раз в сутки (в 07:00 МСК)
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: AI Outreach Letter Generator */}
      {selectedProjectForOutreach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-[#00E68A] flex items-center justify-center">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    AI Outreach: Генератор предложения
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Персонализированное письмо для {selectedProjectForOutreach.developer}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProjectForOutreach(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm flex-1">
              {/* Project summary card */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-xs flex flex-wrap gap-x-4 gap-y-1">
                <div><span className="text-slate-400">Проект:</span> <strong className="text-slate-800 dark:text-slate-200">{selectedProjectForOutreach.project}</strong></div>
                <div><span className="text-slate-400">Девелопер:</span> <strong className="text-slate-800 dark:text-slate-200">{selectedProjectForOutreach.developer}</strong></div>
                <div><span className="text-slate-400">Стадия:</span> <strong className="text-emerald-600 dark:text-[#00E68A]">{selectedProjectForOutreach.stage}</strong></div>
                <div><span className="text-slate-400">Локация:</span> <strong className="text-slate-800 dark:text-slate-200">{selectedProjectForOutreach.city}</strong></div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Тема письма:
                </label>
                <input
                  type="text"
                  value={outreachSubject}
                  onChange={(e) => setOutreachSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-[#00E68A] focus:outline-none"
                />
              </div>

              {/* Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Текст письма (сгенерирован под стадию «{selectedProjectForOutreach.stage}»):
                  </label>
                  <span className="text-[11px] text-emerald-600 dark:text-[#00E68A] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> GPT-4o Adapted
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={outreachBody}
                  onChange={(e) => setOutreachBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-[#00E68A] focus:outline-none font-sans leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="text-xs text-slate-500">
                Сотрудник проверяет текст → копирует или отправляет в 1 клик
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCopyOutreach}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedOutreach ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-[#00E68A]">Скопировано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Скопировать</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleMarkContacted(selectedProjectForOutreach.id)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#00E68A] hover:bg-emerald-400 text-slate-950 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Отметить как отправленное</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Project Detailed Card */}
      {selectedProjectForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {selectedProjectForDetail.project}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProjectForDetail(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs sm:text-sm overflow-y-auto">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400">Девелопер</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {selectedProjectForDetail.developer}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400">Стадия проекта</div>
                  <div className="font-semibold text-emerald-600 dark:text-[#00E68A] mt-0.5">
                    {selectedProjectForDetail.stage}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400">Локация</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    г. {selectedProjectForDetail.city} ({selectedProjectForDetail.region})
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className="text-[11px] text-slate-400">Площадь и Этажность</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {selectedProjectForDetail.area} • {selectedProjectForDetail.floors} эт.
                  </div>
                </div>
              </div>

              {/* AI Verdict */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-slate-800 dark:text-slate-200 space-y-1">
                <div className="text-xs font-bold text-emerald-700 dark:text-[#00E68A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Вердикт нейросети:
                </div>
                <p className="text-xs leading-relaxed">
                  {selectedProjectForDetail.aiComment}
                </p>
              </div>

              {/* Source link */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                <span>Первоисточник: {selectedProjectForDetail.source}</span>
                <a
                  href={selectedProjectForDetail.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 dark:text-[#00E68A] hover:underline flex items-center gap-1 font-medium"
                >
                  Перейти к статье <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2 bg-slate-50/50 dark:bg-slate-800/50">
              <button
                onClick={() => setSelectedProjectForDetail(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Закрыть
              </button>
              {selectedProjectForDetail.status !== 'blacklist' && (
                <button
                  onClick={() => {
                    const p = selectedProjectForDetail;
                    setSelectedProjectForDetail(null);
                    handleOpenOutreach(p);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#00E68A] hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                  <span>Составить Outreach письмо</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
