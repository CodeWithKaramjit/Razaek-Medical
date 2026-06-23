import { TextStyle } from 'react-native';

export const colors = {
  background: '#f7fafc',
  surface: '#ffffff',
  primary: '#002045',
  primaryMuted: '#1a365d',
  textPrimary: '#181c1e',
  textSecondary: '#43474e',
  border: '#ebeef0',
  success: '#13696a',
  danger: '#ba1a1a',
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
  sm: 4,   // 0.25rem = 4px
  md: 8,   // 0.50rem = 8px
  lg: 16,  // 1.00rem = 16px
  xl: 24,  // 1.50rem = 24px
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
    fontFamily: 'Source Serif 4',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    color: colors.textPrimary,
  },
  title: {
    fontFamily: 'Source Serif 4',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    color: colors.textSecondary,
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: colors.textSecondary,
  },
  metricValue: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    color: colors.textPrimary,
  },
  metricLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 14,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
};
