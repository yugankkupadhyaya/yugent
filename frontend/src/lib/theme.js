export const THEME_STORAGE_KEY = 'theme';

export function getStoredTheme() {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return localStorage.getItem(THEME_STORAGE_KEY) || 'dark';
}

export function applyTheme(theme) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
