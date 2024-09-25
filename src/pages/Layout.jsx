import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders child routes */}
    </>
  );
};

export default Layout;
