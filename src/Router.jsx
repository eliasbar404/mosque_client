import { createBrowserRouter} from "react-router-dom";

// Import Pages
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
]);

export default router;




