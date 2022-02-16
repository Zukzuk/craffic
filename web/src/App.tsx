import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import AppWireframe from './wireframe/AppWireframe';
import MainGrid from './wireframe/MainGrid';

export default function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppWireframe />
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, pr: 4 }}>
        <MainGrid />
      </Box>
    </Box>
  );
}