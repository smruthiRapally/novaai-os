import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';

export default function AppRoutes({ theme, setTheme }) {
  return (
    <Routes>
      <Route path="/" element={<Landing theme={theme} setTheme={setTheme} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
