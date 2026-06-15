export type SectionPacing = 'fast' | 'medium' | 'slow';

export interface BaseSectionProps {
  className?: string;
}

export interface QuoteItem {
  text: string;
  author: string;
  handle?: string;
}

export interface ChartItem {
  label: string;
  value: number;
}

export interface RecordItem {
  rank: number;
  name: string;
  value: string;
  detail?: string;
  highlight?: boolean;
}

export interface StepItem {
  label: string;
  stat?: string;
  description: string;
}
