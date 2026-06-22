import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';
import CustomCursor from './components/ui/CustomCursor';
import './styles/globals.css';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CustomCursor />
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}
