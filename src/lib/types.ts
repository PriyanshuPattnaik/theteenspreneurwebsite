// Global Types for TheTeenspreneur
export interface NavigationItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}