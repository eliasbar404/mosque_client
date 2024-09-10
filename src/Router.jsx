import { createBrowserRouter} from "react-router-dom";

// Import Pages
import HomePage from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import SubDashboard from "./pages/subAdmin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import SubAdminLogin from "./pages/subAdmin/SubAdminLogin";

// import from admin
import Home from "./pages/admin/Dashboard/Home";
import Profile from "./pages/admin/Dashboard/Profile";
import Admins from "./pages/admin/Dashboard/Admins";
import Users from "./pages/admin/Dashboard/Users";
import Articles from "./pages/admin/Dashboard/Articles";
import Events from "./pages/admin/Dashboard/Events";
import Settings from "./pages/admin/Dashboard/Settings";
import CreateArticles from "./pages/admin/Dashboard/CreateArticles";

// import from subadmin
import SubHome from "./pages/subAdmin/Dashboard/Home";
import SubProfile from "./pages/subAdmin/Dashboard/Profile";
import SubUsers from "./pages/subAdmin/Dashboard/Users";
import SubArticles from "./pages/subAdmin/Dashboard/Articles";
import SubEvents from "./pages/subAdmin/Dashboard/Events";
import SubSettings from "./pages/subAdmin/Dashboard/Settings";
import SubCreateArticles from "./pages/subAdmin/Dashboard/CreateArticles";


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
    path: "/subadmin",
    element: <SubAdminLogin/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children:[
      { path: "/dashboard"           ,element: <Home/>},
      { path:"/dashboard/profile"    ,element: <Profile/>},
      { path:"/dashboard/admins"      ,element: <Admins/>},
      { path:"/dashboard/members"      ,element: <Users/>},
      { path:"/dashboard/articles"   ,element: <Articles/>},
      { path:"/dashboard/events"     ,element: <Events/>},
      { path:"/dashboard/settings"   ,element: <Settings/>},

      { path:"/dashboard/articles/create"   ,element: <CreateArticles/>}

    ]
  },
  {
    path: "/subadmin/dashboard",
    element: <SubDashboard/>,
    children:[
      { path: "/subadmin/dashboard"           ,element: <SubHome/>},
      { path:"/subadmin/dashboard/profile"    ,element: <SubProfile/>},
      { path:"/subadmin/dashboard/users"      ,element: <SubUsers/>},
      { path:"/subadmin/dashboard/articles"   ,element: <SubArticles/>},
      { path:"/subadmin/dashboard/events"     ,element: <SubEvents/>},
      { path:"/subadmin/dashboard/settings"   ,element: <SubSettings/>},

      { path:"/subadmin/dashboard/articles/create"   ,element: <SubCreateArticles/>}

    ]
  },
]);

export default router;




