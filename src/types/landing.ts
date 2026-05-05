export interface HeroContent {
  badge: string;
  headline: string;
  abTestActive: boolean;
  headlineB: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface CalculatorContent {
  title: string;
  leadsLabel: string;
  checkLabel: string;
  lossLabel: string;
  resultLabel: string;
  resultSub: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TechStackItem {
  name: string;
  desc: string;
  logo: string;
}

export interface TechStackContent {
  label: string;
  title: string;
  items: TechStackItem[];
}

export interface SolutionFeature {
  icon: string;
  bold: string;
  text: string;
}

export interface SolutionItem {
  icon: string;
  title: string;
  features: SolutionFeature[];
}

export interface SolutionsContent {
  title: string;
  description: string;
  items: SolutionItem[];
}

export interface ProcessStep {
  n: string;
  title: string;
  desc: string;
}

export interface ProcessContent {
  title: string;
  description: string;
  steps: ProcessStep[];
}

export interface ChatFAQButton {
  emoji: string;
  label: string;
  answer: string;
  followUp: string;
  keywords: string;
}

export interface ChatWidgetContent {
  greeting: string;
  subtitle: string;
  faqButtons: ChatFAQButton[];
}

export interface LandingContent {
  hero: HeroContent;
  calculator: CalculatorContent;
  faq: FAQItem[];
  techStack: TechStackContent;
  solutions: SolutionsContent;
  process: ProcessContent;
  chatWidget: ChatWidgetContent;
}
