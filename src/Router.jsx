import { createBrowserRouter} from "react-router-dom";

// Import Pages
import HomePage from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";

//
import Home from "./pages/admin/Dashboard/Home";
import Profile from "./pages/admin/Dashboard/Profile";
import Users from "./pages/admin/Dashboard/Users";
import Articles from "./pages/admin/Dashboard/Articles";
import Events from "./pages/admin/Dashboard/Events";
import Settings from "./pages/admin/Dashboard/Settings";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/admin",
    element: <AdminLogin/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children:[
      { path: "/dashboard"           ,element: <Home/>},
      { path:"/dashboard/profile"    ,element: <Profile/>},
      { path:"/dashboard/users"      ,element: <Users/>},
      { path:"/dashboard/articles"   ,element: <Articles/>},
      { path:"/dashboard/events"     ,element: <Events/>},
      { path:"/dashboard/settings"   ,element: <Settings/>}

    ]
  },
]);

export default router;




