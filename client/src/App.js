import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import axios from "axios";
import { UseRoutes } from "./routes";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { useEffect, useState } from "react";
import { useMessage } from "../src/hooks/message.hook";

function App() {
    const message = useMessage();
    const { login, logout, token, id, isReady } = useAuth();
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
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, [id, isLogin, login, message]);

    const isAuth = isLogin && !!token;
    const routes = UseRoutes(isAuth);

    return (
        <AuthContext.Provider value={{ login, logout, token, id, isReady, isAuth }}>
            <BrowserRouter>
                <Header />
                <div className="container">{routes}</div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
