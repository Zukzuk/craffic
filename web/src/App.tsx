import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import AppMenu from './components/AppMenu';
import MainGrid from './components/MainGrid';

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, pr: 4 }}>
        <MainGrid />
      </Box>
    </Box>
  );
}