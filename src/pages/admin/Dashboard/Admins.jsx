import { useSubAdmin } from "../../../hooks/useSubAdmin"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import { Power,PowerOff ,Trash2} from 'lucide-react'


const Admins = () => {
    const active = "active";
    const unactive = "unactive";
    // eslint-disable-next-line no-unused-vars
    const {register,handleSubmit,formState: { errors },} = useForm();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [usersPerPage, setUsersPerPage] = useState(10); // You can change the default value
    // eslint-disable-next-line no-unused-vars
    const {subadmins,error,isLoading,isCreating,addsubAdmin,removeSubAdmin,updateSubAdminStatus} = useSubAdmin();
    const onSubmit = (data) => addsubAdmin(data);
    if(!isLoading){
        // Filter users based on the search query
        const filteredUsers = subadmins.filter(user =>
        `${user.name}`.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Calculate the users to display based on pagination
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

        const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

        // Handle page change
        const paginate = (pageNumber) => setCurrentPage(pageNumber);


if (isLoading) return <p>Loading admins...</p>;
if (error) return <p>Error loading admins: {error.message}</p>;

return (
    <div className="mx-5">
        <h3 className="font-mono font-black text-center mt-5 text-xl">Liste Des Administrateurs</h3>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-green-400 text-slate-50 hover:bg-green-600 hover:text-slate-50">Ajouter un nouveau</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader><DialogTitle className="text-center">Ajouter un nouveau Admin</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
                    <Input id="name"           placeholder="Nom"                  className="" {...register("name", { required: true })}/>
                    <Input id="email"          placeholder="E-mail"                 className="" {...register("email", { required: true })}/>
                    <Input id="phone_number"   placeholder="Numéro de téléphone"          className="" {...register("phone_number", { required: true })}/>
                    <Input id="password"       placeholder="Mot de passe"              className="" {...register("password", { required: true })}/>
                    <Input id="password_conf"  placeholder="Confirmation du mot de passe" className="" {...register("password_confirmation", { required: true })}/>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Sauvegarder</Button>
                </form>
            </DialogContent>
        </Dialog>
        <div className="mt-4 mb-6">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    className="border border-gray-400 rounded p-2 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search query
                />
            </div>

            <div className="font-[sans-serif] overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="whitespace-nowrap">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-black">Nom</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Numéro de téléphone</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Active</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Actes</th>
                        </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                        {
                            currentUsers.map((val, index) => (
                                <tr key={index} className="odd:bg-blue-50">
                                    <td className="p-4 text-sm">
                                        <div className="flex items-center cursor-pointer w-max">
                                            <img src={`http://localhost:8000/${val.profile_picture_url}`} className="w-9 h-9 rounded-full shrink-0" />
                                            <div className="ml-4">
                                                <p className="text-sm text-black">{val.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{val.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        {val.phone_number}
                                    </td>
                                    <td className="p-4">
                                        <label className="relative cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={val.status === "active"} />
                                            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                                        </label>
                                    </td>
                                    
                                    <td className="p-4">
                                        {
                                            val.status == "unactive"? <button title="active" onClick={()=>updateSubAdminStatus({subadminId:val.id,status:active})}><Power color="green" /></button>:<button title="unactive" onClick={()=>updateSubAdminStatus({subadminId:val.id,status:unactive})}><PowerOff color="blue"/></button>
                                        }
                                        <button title="Delete" onClick={()=>removeSubAdmin(val.id)}>
                                            <Trash2 color="red"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-sm text-center text-gray-500">
                                Aucun administrateur trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">Affichage {indexOfFirstUser + 1} à {Math.min(indexOfLastUser, filteredUsers.length)} de {filteredUsers.length} entrées</p>
                    
                    <ul className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index + 1}
                                className={`cursor-pointer text-sm px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    </div>
);
}
}

export default Admins