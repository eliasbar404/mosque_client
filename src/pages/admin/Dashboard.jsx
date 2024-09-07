import Sidebar from "./Dashboard/Sidebar"
import { Outlet } from "react-router-dom"
import AdminLayout from "../../layouts/AdminLayout"

const Dashboard = () => {
    return (
    <AdminLayout>
            <div className="bg-slate-100 flex flex-col">
        <Sidebar/>
        <div className="p-2 mt-10">
            <Outlet/>
        </div>
    </div>

    </AdminLayout>

)
}

export default Dashboard