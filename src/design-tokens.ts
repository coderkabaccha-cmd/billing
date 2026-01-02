// Google Admin Console Design Tokens
// Extracted from screenshots - pixel-perfect values

export const colors = {
  // Backgrounds
  pageBg: '#f8f9fa',
  sidebarBg: '#f8f9fa',
  contentBg: '#ffffff',
  cardBg: '#ffffff',

  // Primary (Google Blue)
  primary: '#1a73e8',
  primaryHover: '#1765cc',
  primaryLight: '#e8f0fe',

  // Text
  textPrimary: '#202124',
  textSecondary: '#5f6368',
  textMuted: '#80868b',
  textLink: '#1a73e8',

  // Status Colors
  successGreen: '#137333',
  successGreenBg: '#e6f4ea',
  activeGreen: '#34a853',

  errorRed: '#d93025',
  warningOrange: '#f9ab00',

  // Borders & Dividers
  border: '#dadce0',
  divider: '#e8eaed',

  // Special
  strikethrough: '#5f6368',
  discountGreen: '#137333',

  // Shadows (as rgba)
  shadowLight: 'rgba(60, 64, 67, 0.15)',
  shadowMedium: 'rgba(60, 64, 67, 0.3)',
} as const;

export const shadows = {
  card: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
  dropdown: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 2px 6px 2px rgba(60, 64, 67, 0.15)',
  elevated: '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  pill: '20px',
  full: '9999px',
  searchBar: '24px',
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
} as const;

export const typography = {
  fontFamily: {
    primary: "'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Roboto Mono', 'Consolas', monospace",
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    '2xl': '24px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

export const layout = {
  headerHeight: '64px',
  sidebarWidth: '260px',
  sidebarCollapsedWidth: '72px',
  contentMaxWidth: '1200px',
  tableRowHeight: '52px',
  navItemHeight: '40px',
} as const;

// Component-specific tokens
export const components = {
  button: {
    primary: {
      bg: colors.primary,
      bgHover: colors.primaryHover,
      text: '#ffffff',
      borderRadius: borderRadius.pill,
      padding: '8px 24px',
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
    text: {
      bg: 'transparent',
      bgHover: colors.primaryLight,
      text: colors.primary,
      borderRadius: borderRadius.sm,
      padding: '8px 16px',
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
  },
  badge: {
    success: {
      bg: colors.successGreenBg,
      text: colors.successGreen,
    },
    info: {
      bg: colors.primaryLight,
      text: colors.primary,
    },
  },
  card: {
    bg: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    shadow: shadows.card,
    padding: spacing[6],
  },
  table: {
    headerBg: 'transparent',
    headerText: colors.textSecondary,
    headerFontSize: typography.fontSize.xs,
    headerFontWeight: typography.fontWeight.medium,
    rowBorder: `1px solid ${colors.divider}`,
    rowHoverBg: colors.pageBg,
    cellPadding: spacing[4],
  },
  nav: {
    itemPadding: '12px 24px',
    itemHeight: '40px',
    activeIndicatorWidth: '4px',
    activeIndicatorColor: colors.primary,
    activeBg: colors.primaryLight,
    hoverBg: '#e8eaed',
  },
} as const;
