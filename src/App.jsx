import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import './styles/globals.css';

const THEME_STORAGE_KEY = 'theme-mode';
const resolveTheme = (mode) => {
  if (mode === 'system') {
    const darkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return darkMode ? 'dark' : 'light';
  }
  return mode === 'dark' ? 'dark' : 'light';
};

const applyTheme = (mode) => {
  const resolved = resolveTheme(mode);
  document.documentElement.setAttribute('data-theme', resolved);
};

export default function App() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system');
  }, []);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (theme === 'system') applyTheme('system');
    };
    if (media.addEventListener) media.addEventListener('change', onChange);
    else media.addListener(onChange);
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', onChange);
      else media.removeListener(onChange);
    };
  }, [theme]);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes theme={theme} setTheme={setTheme} />
      </ToastProvider>
    </BrowserRouter>
  );
}
