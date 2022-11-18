import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { UseRoutes } from "./routes";
import Header from "./components/Header";

function App() {
    const routes = UseRoutes(false);
    return (
        <BrowserRouter>
            <Header />
            <div className="container">{routes}</div>
        </BrowserRouter>
    );
}

export default App;
