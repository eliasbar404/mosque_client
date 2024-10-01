import { useContacts } from "../../../hooks/useContacts";
import { useState } from "react";
import { Link } from "react-router-dom";
import {FilePenLine,Trash2} from "lucide-react"


const Contact = () => {
    const {contacts,isLoading,removeContact} = useContacts();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [contactsPerPage, setContactsPerPage] = useState(10); // You can change the default value

    if(!isLoading){
                // Filter users based on the search query
                const filteredContacts = contacts.filter(contact =>
                    `${contact.first_name}`.toLowerCase().includes(searchTerm.toLowerCase())
                );
            
                // Calculate the users to display based on pagination
                const indexOfLastContat = currentPage * contactsPerPage;
                const indexOfFirstContact = indexOfLastContat - contactsPerPage;
                const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContat);
            
                const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
            
                // Handle page change
                const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div className="mx-10 mt-10 text-lg flex flex-col gap-5">
            
            <h1 className="text-3xl font-mono font-black text-center">Contat Messages List</h1>
    
            {/* <Link className="inline-flex self-start gap-2 px-3 py-2 font-mono rounded-md font-bold text-slate-50 bg-green-500 hover:bg-green-800" to={"/dashboard/articles/create"}><FilePlus />Create a new Article</Link> */}
    
    {/* Search Input */}
    <div className="mt-4 mb-6">
        <input
            type="text"
            placeholder="Search by name..."
            className="border border-gray-400 rounded p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search query
        />
    </div>
    
    <div className="font-[sans-serif] overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead className="whitespace-nowrap">
                <tr>
                    <th className="p-4 text-left text-sm font-semibold text-black">Name</th>
                    {/* <th className="p-4 text-left text-sm font-semibold text-black">Published At</th> */}
                    <th className="p-4 text-left text-sm font-semibold text-black">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-black">Phone Number</th>
                </tr>
            </thead>
    
            <tbody className="whitespace-nowrap">
                {
                    currentContacts.map((val, index) => (
                        <tr key={index} className="odd:bg-blue-50">
                            <td className="p-4 text-sm">
                                <div className="flex items-center cursor-pointer w-max">
                                        {val.first_name} {val.last_name}
                                </div>
                            </td>
                            <td className="p-4">
                                {val.email}
                            </td>
                            <td className="p-4 text-sm text-black">
                                {val.phone_number}
                            </td>

                            <td className="p-4 flex gap-1 mt-4">
                                
                                {/* Edit */}
                                <Link to={`/subadmin/dashboard/contacts/${val.id}`} title='Edit' className="inline">
                                    <FilePenLine color='blue' size={30}/>
                                </Link>
                                <button title="Delete" onClick={()=>removeContact(val.id)}>
                                    <Trash2 color='red' size={30}/>
                                </button>
    
    
                            </td>
                        </tr>
                    ))
                }
    
                {currentContacts.length === 0 && (
                    <tr>
                        <td colSpan="4" className="p-4 text-sm text-center text-gray-500">
                            No articles found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Showing {indexOfFirstContact + 1} to {Math.min(indexOfLastContat, filteredContacts.length)} of {filteredContacts.length} entries</p>
            
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
        )
    }
}

export default Contact