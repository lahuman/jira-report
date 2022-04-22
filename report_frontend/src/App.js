import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';

import AppHeader from './component/AppHeader'
import AppFooter from './component/AppFooter';
import Loadding from './component/Loadding';
import Login from './component/Login';
import ReportUI from './component/Report';



export default function Report() {
 
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <BrowserRouter>
      <CssBaseline />
      { isLoading && <Loadding />}
      <AppHeader />
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ReportUI isLoading={isLoading} setIsLoading={setIsLoading} />} />
        </Routes>
      </main>
      <AppFooter />
    </BrowserRouter>
  );
}