import { useCallback, useEffect, useState } from "react";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);
        localStorage.setItem(
            storageName,
            JSON.stringify({
                token: jwtToken,
                userId: id,
            })
        );
    }, []);

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId);
        }
        setIsReady(true);
    }, [login]);

    return { login, logout, token, userId, isReady };
};
