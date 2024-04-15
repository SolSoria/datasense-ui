import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

// components
import Login from "../views/auth/Login";
import MainLayout from "../layouts/main/MainLayout";
import Dashboard from "../views/dashboard/Dashboard";
import SecuredRoute from "./SecuredRoute";
import OAuth2 from "../views/oauth2/Oauth2";
import DataTables from "../views/dataTables/DataTables";

function Navigation(props) {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2" element={<OAuth2 />} />
          <Route element={<SecuredRoute />}>
            <Route path="/" element={<Navigate to='/dashboard' replace />} />
          </Route>
          <Route element={<SecuredRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<SecuredRoute />}>
            <Route path="/data-tables" element={<DataTables />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}

export default Navigation;
