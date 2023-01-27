import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";

export const UseRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<UsersPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </>
        );
    }
    return (
        <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registration" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
