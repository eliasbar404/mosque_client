import { createBrowserRouter} from "react-router-dom";
import Layout from "./pages/Layout";

// Import Pages
import HomePage from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import SubDashboard from "./pages/subAdmin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import SubAdminLogin from "./pages/subAdmin/SubAdminLogin";
import ArticlesPage from "./pages/ArticlesPage";
import EventsPage from "./pages/EventsPage";
import DonsPage from "./pages/DonsPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

// import from admin
import Home from "./pages/admin/Dashboard/Home";
import Profile from "./pages/admin/Dashboard/Profile";
import Admins from "./pages/admin/Dashboard/Admins";
import Users from "./pages/admin/Dashboard/Users";
import Articles from "./pages/admin/Dashboard/Articles";
import Events from "./pages/admin/Dashboard/Events";
import Settings from "./pages/admin/Dashboard/Settings";
import CreateArticles from "./pages/admin/Dashboard/CreateArticles";
import UpdateArticles from "./pages/admin/Dashboard/UpdateArticles";
import CreateEvents from "./pages/admin/Dashboard/CreateEvents";
import UpdateEvents from "./pages/admin/Dashboard/UpdateEvents";
import AdminContact from "./pages/admin/Dashboard/Contact";
import AdminContactPage from "./pages/admin/Dashboard/ContactPage";


// import from subadmin
import SubHome from "./pages/subAdmin/Dashboard/Home";
import SubProfile from "./pages/subAdmin/Dashboard/Profile";
import SubUsers from "./pages/subAdmin/Dashboard/Users";
import SubArticles from "./pages/subAdmin/Dashboard/Articles";
import SubEvents from "./pages/subAdmin/Dashboard/Events";
import SubSettings from "./pages/subAdmin/Dashboard/Settings";
import SubCreateArticles from "./pages/subAdmin/Dashboard/CreateArticles";
import SubUpdateArticles from "./pages/subadmin/Dashboard/UpdateArticles";
import SubCreateEvents from "./pages/subadmin/Dashboard/CreateEvents";
import SubUpdateEvents from "./pages/subadmin/Dashboard/UpdateEvents";
import SubAdminContact from "./pages/subAdmin/Dashboard/Contact";
import SubAdminContactPage from "./pages/subAdmin/Dashboard/ContactPage";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use the Layout component
    children: [
      { index: true, element: <HomePage /> },
      { path: "Articles", element:<ArticlesPage /> },
      { path: "Events", element:<EventsPage /> },
      { path: "Dons", element: <DonsPage /> },
      { path: "Contact", element:<ContactPage /> },
      { path: "Register", element:<RegisterPage /> },
      { path: "Login", element:<LoginPage /> },

      
    ]
  },
  { path: "admin", element: <AdminLogin /> },
  { path: "subadmin", element: <SubAdminLogin />},

  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "admins", element: <Admins /> },
      { path: "members", element: <Users /> },
      { path: "articles", element: <Articles /> },
      { path: "events", element: <Events /> },
      { path: "settings", element: <Settings /> },
      { path:"/dashboard/events/create"     ,element: <CreateEvents/>},
      { path:"/dashboard/articles/:ArticleId/update"   ,element: <UpdateArticles/>},
      { path:"/dashboard/events/:EventId/update"   ,element: <UpdateEvents/>},
      { path: "articles/create", element: <CreateArticles /> },
      { path: "contacts", element: <AdminContact /> },
      { path: "contacts/:ContactId", element: <AdminContactPage /> },
    ]
  },

  {
    path: "subadmin/dashboard",
    element: <SubDashboard />,
    children: [
      { index: true, element: <SubHome /> },
      { path: "profile", element: <SubProfile /> },
      { path: "members", element: <SubUsers /> },
      { path: "articles", element: <SubArticles /> },
      { path: "events", element: <SubEvents /> },
      { path: "settings", element: <SubSettings /> },
      { path: "contacts"   ,element: <SubAdminContact/>},
      { path: "articles/create", element: <SubCreateArticles /> },
      { path:"events/create"     ,element: <SubCreateEvents/>},
      { path:"articles/:ArticleId/update"   ,element: <SubUpdateArticles/>},
      { path:"events/:EventId/update"   ,element: <SubUpdateEvents/>},
      { path: "contacts", element: <SubAdminContact /> },
      { path: "contacts/:ContactId", element: <SubAdminContactPage /> },

    ]
  }
]);

export default router;




