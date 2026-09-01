import ArchitectureDemoDashboard from '@/components/demo/ArchitectureDemoDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мониторинг девелоперских проектов | Демо для Архитектурного бюро | Samartsev AI',
  description:
    'Интерактивный веб-дашборд ИИ-мониторинга девелоперских строек РФ на ранних стадиях (мастерплан, концепция, эскиз). Автоматический сбор, фильтрация и AI Outreach.',
};

export default function DemoDashboardPage() {
  return <ArchitectureDemoDashboard />;
}
