import { TextStyle } from 'react-native';

export const colors = {
  background: '#F2F5FB',
  surface: '#FFFFFF',
  primary: '#3B82F6',
  primaryMuted: '#DAE9FF',
  textPrimary: '#171D2B',
  textSecondary: '#6F7891',
  border: '#E6EAF2',
  success: '#35C26B',
  danger: '#FF6E66',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  pill: 999,
} as const;

type TypographyScale = {
  readonly screenTitle: TextStyle;
  readonly title: TextStyle;
  readonly subtitle: TextStyle;
  readonly body: TextStyle;
  readonly label: TextStyle;
  readonly metricValue: TextStyle;
  readonly metricLabel: TextStyle;
};

export const typography: TypographyScale = {
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.textPrimary,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: colors.textSecondary,
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
};
