export interface ProjectItem {
  id: number;
  date: string;
  project: string;
  developer: string;
  type: 'ЖК' | 'Бизнес-центр' | 'Музей' | 'Культурный объект' | 'Иное';
  stage: 'Мастерплан' | 'Архитектурная концепция' | 'Эскиз' | 'АГО';
  city: string;
  region: 'Сибирь' | 'Дальний Восток' | 'Поволжье' | 'Юг' | 'Урал' | 'Центр' | 'Северо-Запад';
  area: string;
  floors: string;
  source: string;
  sourceUrl: string;
  status: 'new' | 'updated' | 'blacklist';
  aiComment: string;
  priority?: 'high' | 'medium' | 'low' | 'ignore';
  isEasternZone?: boolean;
}

export interface MonitoringSource {
  name: string;
  category: 'Деловая пресса' | 'Архитектурные порталы' | 'Сайты девелоперов' | 'Госреестры';
  lastChecked: string;
  status: 'active' | 'synced';
}

export const MONITORED_SOURCES: MonitoringSource[] = [
  { name: 'РБК Недвижимость', category: 'Деловая пресса', lastChecked: '10 мин назад', status: 'active' },
  { name: 'Коммерсантъ Строительство', category: 'Деловая пресса', lastChecked: '18 мин назад', status: 'active' },
  { name: 'Ведомости Недвижимость', category: 'Деловая пресса', lastChecked: '25 мин назад', status: 'active' },
  { name: 'ТАСС Недвижимость', category: 'Деловая пресса', lastChecked: '32 мин назад', status: 'active' },
  { name: 'archi.ru (Архи.ру)', category: 'Архитектурные порталы', lastChecked: '5 мин назад', status: 'active' },
  { name: 'Единый реестр застройщиков (ЕРЗ.РФ)', category: 'Госреестры', lastChecked: '40 мин назад', status: 'active' },
  { name: 'Сайт ГК ПИК', category: 'Сайты девелоперов', lastChecked: '1 час назад', status: 'synced' },
  { name: 'Сайт ГК Самолёт', category: 'Сайты девелоперов', lastChecked: '1 час назад', status: 'synced' },
  { name: 'Сайт ГК Брусника', category: 'Сайты девелоперов', lastChecked: '2 часа назад', status: 'synced' },
  { name: 'Сайт Группа ЛСР', category: 'Сайты девелоперов', lastChecked: '2 часа назад', status: 'synced' },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    date: '2026-08-30',
    project: 'ЖК «Речной Парк»',
    developer: 'Группа ЛСР',
    type: 'ЖК',
    stage: 'Архитектурная концепция',
    city: 'Новосибирск',
    region: 'Сибирь',
    area: '85 000 м²',
    floors: '12-25',
    source: 'РБК Недвижимость',
    sourceUrl: 'https://realty.rbc.ru/example1',
    status: 'new',
    aiComment: 'Крупный проект в активно растущем регионе. ЛСР редко работает в Сибири — возможна потребность в местном архбюро.',
    priority: 'high',
    isEasternZone: true,
  },
  {
    id: 2,
    date: '2026-08-29',
    project: 'БЦ «Хаб Владивосток»',
    developer: 'Самолёт',
    type: 'Бизнес-центр',
    stage: 'Мастерплан',
    city: 'Владивосток',
    region: 'Дальний Восток',
    area: '42 000 м²',
    floors: '18',
    source: 'Коммерсантъ',
    sourceUrl: 'https://kommersant.ru/example2',
    status: 'new',
    aiComment: 'Ранняя стадия, высокий приоритет. Дальний Восток — зона активного роста. Рекомендуется оперативный контакт.',
    priority: 'high',
    isEasternZone: true,
  },
  {
    id: 3,
    date: '2026-08-28',
    project: 'Музей современного искусства',
    developer: 'Фонд «Искусство Будущего»',
    type: 'Музей',
    stage: 'Эскиз',
    city: 'Казань',
    region: 'Поволжье',
    area: '15 000 м²',
    floors: '3',
    source: 'archi.ru',
    sourceUrl: 'https://archi.ru/example3',
    status: 'new',
    aiComment: 'Культурный объект, возможен конкурс. Фонд частный — не госзаказ. Рекомендуется подача портфолио.',
    priority: 'high',
    isEasternZone: false,
  },
  {
    id: 4,
    date: '2026-08-27',
    project: 'ЖК «Панорама Сити»',
    developer: 'ПИК',
    type: 'ЖК',
    stage: 'АГО',
    city: 'Краснодар',
    region: 'Юг',
    area: '120 000 м²',
    floors: '16-32',
    source: 'Единый реестр застройщиков',
    sourceUrl: 'https://erzrf.ru/example4',
    status: 'updated',
    aiComment: 'Проект перешёл на стадию АГО. Краснодарский край показывает рост активности +23% к прошлому кварталу.',
    priority: 'medium',
    isEasternZone: false,
  },
  {
    id: 5,
    date: '2026-08-27',
    project: 'ЖК «Восток Премиум»',
    developer: 'Стройинвест',
    type: 'ЖК',
    stage: 'Мастерплан',
    city: 'Хабаровск',
    region: 'Дальний Восток',
    area: '55 000 м²',
    floors: '9-14',
    source: 'ТАСС Недвижимость',
    sourceUrl: 'https://tass.ru/example5',
    status: 'new',
    aiComment: 'Восточная часть РФ, приоритетная зона. Малоизвестный девелопер — высокая вероятность потребности в архитекторе.',
    priority: 'high',
    isEasternZone: true,
  },
  {
    id: 6,
    date: '2026-08-26',
    project: 'МФК «Деловой квартал»',
    developer: 'Брусника',
    type: 'Бизнес-центр',
    stage: 'Архитектурная концепция',
    city: 'Екатеринбург',
    region: 'Урал',
    area: '38 000 м²',
    floors: '22',
    source: 'РБК Недвижимость',
    sourceUrl: 'https://realty.rbc.ru/example6',
    status: 'new',
    aiComment: 'Брусника известна высокими стандартами архитектуры. Этап концепции — идеальный момент для контакта.',
    priority: 'high',
    isEasternZone: false,
  },
  {
    id: 7,
    date: '2026-08-25',
    project: 'ЖК «Сибирские Высоты»',
    developer: 'ГК Негативный Опыт',
    type: 'ЖК',
    stage: 'Мастерплан',
    city: 'Красноярск',
    region: 'Сибирь',
    area: '70 000 м²',
    floors: '10-20',
    source: 'Коммерсантъ',
    sourceUrl: 'https://kommersant.ru/example7',
    status: 'blacklist',
    aiComment: '⚠️ Non-Target. Девелопер в чёрном списке. Данные собраны для аналитики рынка.',
    priority: 'ignore',
    isEasternZone: true,
  },
  {
    id: 8,
    date: '2026-08-25',
    project: 'Культурный центр «Байкал»',
    developer: 'Администрация Иркутской области',
    type: 'Музей',
    stage: 'Эскиз',
    city: 'Иркутск',
    region: 'Сибирь',
    area: '8 000 м²',
    floors: '2',
    source: 'archi.ru',
    sourceUrl: 'https://archi.ru/example8',
    status: 'new',
    aiComment: 'Госзаказ, но культурный объект (музей) — попадает в критерии. Возможен открытый конкурс.',
    priority: 'high',
    isEasternZone: true,
  },
  {
    id: 9,
    date: '2026-08-24',
    project: 'ЖК «Амурские Террасы»',
    developer: 'Девелопмент-Юг',
    type: 'ЖК',
    stage: 'Мастерплан',
    city: 'Благовещенск',
    region: 'Дальний Восток',
    area: '32 000 м²',
    floors: '7-12',
    source: 'ТАСС Недвижимость',
    sourceUrl: 'https://tass.ru/example9',
    status: 'new',
    aiComment: 'Приграничный город, активный рост жилого строительства. Малый девелопер — потенциально нуждается в архитектурном партнёре.',
    priority: 'high',
    isEasternZone: true,
  },
  {
    id: 10,
    date: '2026-08-23',
    project: 'Апарт-отель «Алтай Резиденс»',
    developer: 'Cosmos Hotel Group',
    type: 'Бизнес-центр',
    stage: 'Архитектурная концепция',
    city: 'Горно-Алтайск',
    region: 'Сибирь',
    area: '12 000 м²',
    floors: '5',
    source: 'Ведомости',
    sourceUrl: 'https://vedomosti.ru/example10',
    status: 'new',
    aiComment: 'Туристическая инфраструктура Алтая на подъёме. Нестандартный объект — потенциально интересный проект для портфолио.',
    priority: 'medium',
    isEasternZone: true,
  },
];

export function generateOutreachLetter(project: ProjectItem): { subject: string; body: string } {
  const isMuseum = project.type === 'Музей' || project.type === 'Культурный объект';
  const stageAction = 
    project.stage === 'Мастерплан' ? 'разработке архитектурного мастерплана и объемно-пространственной концепции' :
    project.stage === 'Архитектурная концепция' ? 'создании яркой архитектурной концепции и фасадных решений' :
    project.stage === 'Эскиз' ? 'эскизном проектировании и детальной проработке планировок' :
    'подготовке альбома АГО и согласовании архитектурно-градостроительного облика';

  const subject = `Сотрудничество по проекту ${project.project} (${project.city}) | Архитектурное бюро`;

  const body = `Здравствуйте, команда «${project.developer}»!

Мы с интересом следим за развитием девелоперского рынка в регионе ${project.region} и обратили внимание на ваш новый проект — ${project.project} в г. ${project.city} (${project.area}, этап: ${project.stage}).

Наше архитектурное бюро специализируется на проектировании ${isMuseum ? 'знаковых культурных и общественных пространств' : 'современных жилых комплексов и коммерческой недвижимости'}. Мы помогаем девелоперам создавать авторскую архитектуру с высокой капитализацией квадратного метра и безупречной эргономикой.

Поскольку проект сейчас находится на этапе ${project.stage}, мы были бы рады предложить свою экспертизу в ${stageAction}.

Что мы подготовили для первого знакомства:
1. Релевантное портфолио реализованных проектов в аналогичном масштабе (${project.area}).
2. Экспресс-анализ архитектурного потенциала участка в г. ${project.city}.
3. Варианты фасадных и планировочных решений, повышающих маржинальность проекта.

Будем рады провести 15-минутный онлайн-звонок или встречу с вашей службой развития проектов, чтобы обсудить возможные форматы сотрудничества.

Ссылка на презентацию и портфолио: https://architecture-bureau.ru/portfolio

С уважением,
Служба развития архитектурного бюро
Телефон: +7 (999) 000-00-00
Email: partner@architecture-bureau.ru`;

  return { subject, body };
}

export function exportProjectsToCSV(projects: ProjectItem[]): void {
  const headers = [
    'ID',
    'Дата',
    'Проект',
    'Девелопер',
    'Тип объекта',
    'Стадия',
    'Город',
    'Регион',
    'Площадь',
    'Этажность',
    'Источник',
    'Ссылка',
    'Статус',
    'AI Комментарий',
  ];

  const escapeCSV = (str: string | number) => {
    const val = String(str ?? '').replace(/"/g, '""');
    return `"${val}"`;
  };

  const rows = projects.map(p => [
    escapeCSV(p.id),
    escapeCSV(p.date),
    escapeCSV(p.project),
    escapeCSV(p.developer),
    escapeCSV(p.type),
    escapeCSV(p.stage),
    escapeCSV(p.city),
    escapeCSV(p.region),
    escapeCSV(p.area),
    escapeCSV(p.floors),
    escapeCSV(p.source),
    escapeCSV(p.sourceUrl),
    escapeCSV(p.status === 'blacklist' ? 'Non-Target (Чёрный список)' : p.status === 'updated' ? 'Обновлён' : 'Новый'),
    escapeCSV(p.aiComment),
  ]);

  const csvContent = '\uFEFF' + [headers.map(escapeCSV).join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `monitoring_projects_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
