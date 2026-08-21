export const nightPalette = {
  skyTop: '#1a0a2e',
  skyMid: '#2d1b4e',
  skyBottom: '#c2724a',
  accent: '#c2724a',
  surface: '#1c1216',
  surfaceAlt: '#2a1a1e',
  chrome: '#3d2a2a',
  text: '#f5e6c8',
  textMuted: '#a08070',
  sand: '#8b5e3c',
  sandLight: '#a0714f',
  pyramid: '#6b4226',
  pyramidShadow: '#5a3720',
  cactus: '#2d4a2d',
  moon: '#f5e6c8',
} as const;

export const dayPalette = {
  skyTop: '#1e6091',
  skyMid: '#74b9e0',
  skyBottom: '#f5d4a0',
  accent: '#c2724a',
  surface: '#faf5ed',
  surfaceAlt: '#efe6d6',
  chrome: '#efe6d6',
  text: '#3a2a1a',
  textMuted: '#8a7a6a',
  sand: '#d4a56a',
  sandLight: '#e8be82',
  pyramid: '#c49a6c',
  pyramidShadow: '#a07d55',
  pyramidHighlight: '#d4ac7a',
  cactus: '#4a7a3a',
  sun: '#f5d060',
} as const;

export type ThemeMode = 'night' | 'day';
