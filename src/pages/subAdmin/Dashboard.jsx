import Sidebar from "./Dashboard/Sidebar"
import { Outlet } from "react-router-dom"
import SubAdminLayout from "../../layouts/SubAdminLayout"

const Dashboard = () => {
    return (
    <SubAdminLayout>
            <div className="bg-slate-100 flex flex-col">
        <Sidebar/>
        <div className="p-2 mt-10">
            <Outlet/>
        </div>
    </div>

    </SubAdminLayout>

)
}

export default Dashboard