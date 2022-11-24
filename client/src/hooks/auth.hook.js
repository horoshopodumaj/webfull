import { useCallback, useEffect, useState } from "react";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [id, setUserId] = useState(null);
    const [isLoginRes, setIsLoginRes] = useState(true);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id, isLogin) => {
        setToken(jwtToken);
        setUserId(id);
        setIsLoginRes(isLogin);
        localStorage.setItem(
            storageName,
            JSON.stringify({
                token: jwtToken,
                id,
                isLogin,
            })
        );
    }, []);

    const logout = () => {
        setToken(null);
        setUserId(null);
        setIsLoginRes(false);
        localStorage.removeItem(storageName);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.id, data.isLogin);
        }
        setIsReady(true);
    }, [login, isLoginRes]);

    return { login, logout, token, id, isReady, isLoginRes };
};
