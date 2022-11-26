import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import axios from "axios";
import { UseRoutes } from "./routes";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { useEffect, useState } from "react";
import { useMessage } from "../src/hooks/message.hook";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
    const message = useMessage();
    const { login, logout, token, id } = useAuth();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.put(
                    `/api/auth/islogin/${id}`,
                    { id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setIsLogin(res.data.isLogin);
                message(res.data.message);
                console.log(res);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [id, isLogin, login, message]);

    const updateIsLogin = (isLoginUserPage) => {
        setIsLogin(isLoginUserPage);
    };

    const isAuth = isLogin && !!token;
    const routes = UseRoutes(isAuth, updateIsLogin);

    return (
        <AuthContext.Provider value={{ login, logout, token, id, isAuth, updateIsLogin }}>
            <BrowserRouter>
                <Header />
                <div className="container">{routes}</div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
