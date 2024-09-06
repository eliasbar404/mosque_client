import Sidebar from "./Dashboard/Sidebar"
import { Outlet } from "react-router-dom"

const Dashboard = () => {
    return (
    <div className="bg-slate-100 flex flex-col">
        <Sidebar/>
        <div className="p-2 mt-10">
            <Outlet/>
        </div>
    </div>
)
}

export default Dashboard