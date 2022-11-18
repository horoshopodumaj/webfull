import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import UsersPage from "./pages/UsersPage";

export const UseRoutes = (isAuth) => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/users" element={isAuth ? <UsersPage /> : <Navigate to="/" replace />} />
            <Route
                path="*"
                element={isAuth ? <Navigate to="/users" /> : <Navigate to="/" replace />}
            />
        </Routes>
    );
};
