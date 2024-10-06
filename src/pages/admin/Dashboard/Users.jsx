import { useState } from 'react';

import { useMembers } from '../../../hooks/useMembers';
import { Power,PowerOff ,Trash2} from 'lucide-react'

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../../components/ui/hover-card"





const Users = () => {
    const active = "active";
    const unactive = "unactive";
    const {members,isLoading,removeMembers,updateMemberStatus} = useMembers();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [usersPerPage, setUsersPerPage] = useState(10); // You can change the default value

    if(!isLoading){
            // Filter users based on the search query
    const filteredUsers = members.filter(member =>
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the users to display based on pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="mx-10 mt-10 text-lg">
            <h1 className="font-bold text-3xl font-mono text-center">Liste Des Membres</h1>

            {/* Search Input */}
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
                                            <img src={val.profile_picture_url?`http://localhost:8000/${val.profile_picture_url}`:`https://cdn-icons-png.flaticon.com/512/953/953789.png`} className="w-9 h-9 rounded-full shrink-0" />
                                            <div className="ml-4">
                                                <p className="text-sm text-black">
                                                    <HoverCard>
                                                        <HoverCardTrigger asChild>
                                                            <span>{val.last_name} {val.first_name}</span>
                                                        </HoverCardTrigger>
                                                        <HoverCardContent className="w-80 flex flex-col">
                                                            {/* Nom */}
                                                            <label htmlFor="" className='font-black font-mono text-slate-400 text-2xl'>Nom:</label>
                                                            <span className='font-bold text-xl'>{val.last_name} {val.first_name}</span>
                                                            {/* Address */}
                                                            <label htmlFor="" className='font-black font-mono text-slate-400 text-2xl'>Adresse:</label>
                                                            <span className='font-bold text-xl'>{val.address ? val.address : "Null"}</span>
                                                            {/* Phone Number */}
                                                            <label htmlFor="" className='font-black font-mono text-slate-400 text-2xl'>Numéro De Téléphone:</label>
                                                            <span className='font-bold text-xl'>{val.phone_number ? val.phone_number : "Null"}</span>
                                                            {/* City */}
                                                            <label htmlFor="" className='font-black font-mono text-slate-400 text-2xl'>Ville:</label>
                                                            <span className='font-bold text-xl'>{val.city ? val.city : "Null"}</span>
                                                            {/* Code Postal */}
                                                            <label htmlFor="" className='font-black font-mono text-slate-400 text-2xl'>Code Postal:</label>
                                                            <span className='font-bold text-xl'>{val.code_postal ? val.code_postal : "Null"}</span>
                                                            
                                                        </HoverCardContent>
                                                    </HoverCard>
                                                </p>
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
                                            val.status == "unactive"? <button title="active" onClick={()=>updateMemberStatus({memberId:val.id,status:active})}><Power color="green" /></button>:<button title="unactive" onClick={()=>updateMemberStatus({memberId:val.id,status:unactive})}><PowerOff color="blue"/></button>
                                        }
                                        <button title="Delete" onClick={()=>removeMembers(val.id)}>
                                            <Trash2 color="red"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }

                        {currentUsers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-4 text-sm text-center text-gray-500">
                                    No users found.
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

};

export default Users;