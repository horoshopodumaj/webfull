import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { UseRoutes } from "./routes";

function App() {
    const routes = UseRoutes(true);
    return (
        <BrowserRouter>
            <div className="container">
                <h1>HI!</h1>
                {routes}
            </div>
        </BrowserRouter>
    );
}

export default App;
