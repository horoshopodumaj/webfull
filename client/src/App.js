import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { UseRoutes } from "./routes";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";

function App() {
    const { login, logout, token, userId, isReady } = useAuth();
    const isAuth = !!token;
    const routes = UseRoutes(isAuth);

    return (
        <AuthContext.Provider value={{ login, logout, token, userId, isReady, isAuth }}>
            <BrowserRouter>
                <Header isAuth={isAuth} />
                <div className="container">{routes}</div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
