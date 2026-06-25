import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import './styles/globals.css';

export default function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AppRoutes theme="light" setTheme={() => {}} />
      </ToastProvider>
    </BrowserRouter>
  );
}
