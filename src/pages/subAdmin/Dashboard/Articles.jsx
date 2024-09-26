import { useState } from 'react';
import { Link } from "react-router-dom"
import {FilePlus ,BookPlus ,FilePenLine,Trash2} from "lucide-react"
import { useArticles } from '../../../hooks/useArticles';


const Articles = () => {
    const {articles,isLoading,publisharticle,removeArticle} = useArticles();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [articlesPerPage, setArticlesPerPage] = useState(10); // You can change the default value

if(!isLoading){
        // Filter users based on the search query
        const filteredUsers = articles.filter(article =>
            `${article.title}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        // Calculate the users to display based on pagination
        const indexOfLastUser = currentPage * articlesPerPage;
        const indexOfFirstUser = indexOfLastUser - articlesPerPage;
        const currentArticles = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    
        const totalPages = Math.ceil(filteredUsers.length / articlesPerPage);
    
        // Handle page change
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        return (
        <div className="mx-10 mt-10 text-lg flex flex-col gap-5">
            
            <h1 className="text-3xl font-mono font-black text-center">Articles List</h1>
    
            <Link className="inline-flex self-start gap-2 px-3 py-2 font-mono rounded-md font-bold text-slate-50 bg-green-500 hover:bg-green-800" to={"/subadmin/dashboard/articles/create"}><FilePlus />Create a new Article</Link>
    
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
                    <th className="p-4 text-left text-sm font-semibold text-black">Title</th>
                    {/* <th className="p-4 text-left text-sm font-semibold text-black">Published At</th> */}
                    <th className="p-4 text-left text-sm font-semibold text-black">View</th>
                    <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
                </tr>
            </thead>
    
            <tbody className="whitespace-nowrap">
                {
                    currentArticles.map((val, index) => (
                        <tr key={index} className="odd:bg-blue-50">
                            <td className="p-4 text-sm">
                                <div className="flex items-center cursor-pointer w-max">
                                    <img src={`http://localhost:8000/${val.image}`} className="w-20 h-16 rounded-full shrink-0" />
                                    <div className="ml-4">
                                        <p className="text-base text-black">{val.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">Published At: {val.published_at}</p>
                                    </div>
                                </div>
                            </td>
                            {/* <td className="p-4 text-sm text-black">
                                {val.phoneNumber}
                            </td> */}
                            <td className="p-4">
                                {val.view_count}
                                {/* <label className="relative cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={val.status === "active"} />
                                    <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                                </label> */}
                            </td>
                            <td className="p-4 flex gap-1 mt-4">
                                {/* publish */}
                                {
                                    val.published_at === null?<button type="button" title='Publish'><BookPlus onClick={()=>publisharticle(val.id)} color='green' size={30}/></button>:null
                                }
                                
                                {/* Edit */}
                                <Link to={`/subadmin/dashboard/articles/${val.id}/update`} title='Edit' className="inline">
                                    <FilePenLine color='blue' size={30}/>
                                </Link>
                                <button title="Delete" onClick={()=>removeArticle(val.id)}>
                                    <Trash2 color='red' size={30}/>
                                </button>
    
    
                            </td>
                        </tr>
                    ))
                }
    
                {currentArticles.length === 0 && (
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
            <p className="text-sm text-gray-500">Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries</p>
            
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

export default Articles