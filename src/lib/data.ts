import type { NavigationItem, FeatureItem, StatItem } from './types';

export const navigation: NavigationItem[] = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about' },
  { label: 'faq', href: '/faq' },
  { label: 'apply now', href: '/apply', isButton: true }
];

export const features: FeatureItem[] = [
  {
    title: 'teenspreneur 101',
    description: "from 'what's an entrepreneur?' to pitching investors in 8 weeks"
  },
  {
    title: 'real mentorship',
    description: 'connect with founders who actually built stuff, not just talk about it'
  },
  {
    title: 'actual funding',
    description: 'we help you get real money for real ideas when you\'re ready'
  },
  {
    title: 'global community',
    description: 'thousands of teen builders from 50+ countries'
  }
];

export const stats: StatItem[] = [
  { label: 'teen founders', value: '500+' },
  { label: 'countries', value: '50+' },
  { label: 'raised by alumni', value: '$2M+' },
  { label: 'real businesses launched', value: '100+' }
];