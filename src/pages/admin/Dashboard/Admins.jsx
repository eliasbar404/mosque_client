import { useSubAdmin } from "../../../hooks/useSubAdmin"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"


const Admins = () => {
  // eslint-disable-next-line no-unused-vars
  const {register,handleSubmit,formState: { errors },} = useForm();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [usersPerPage, setUsersPerPage] = useState(10); // You can change the default value
  // eslint-disable-next-line no-unused-vars
  const {subadmins,error,isLoading,isCreating,addsubAdmin,} = useSubAdmin();
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


  

  // const [newAdmin, setNewAdmin] = useState({ name: '', email: '' ,password:'',password_confirmation:''});

  // const handleAddAdmin = async () => {
  //   try {
  //     await addsubAdmin(newAdmin);
  //     setNewAdmin({ name: '', email: '' ,password:'',password_confirmation:''});
  //   } catch (error) {
  //     console.error('Error creating admin:', error);
  //   }
  // };

  if (isLoading) return <p>Loading admins...</p>;
  if (error) return <p>Error loading admins: {error.message}</p>;

  return (
    <div className="mx-5">
      <h3 className="font-mono font-black text-center mt-5 text-xl">SUB Admins List</h3>
      <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline" className="bg-green-400 text-slate-50 hover:bg-green-600 hover:text-slate-50">Add New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader><DialogTitle className="text-center">Create New SUB Admin</DialogTitle></DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
                  <Input id="name"           placeholder="Name"                  className="" {...register("name", { required: true })}/>
                  <Input id="email"          placeholder="Email"                 className="" {...register("email", { required: true })}/>
                  <Input id="phone_number"   placeholder="Phone Number"          className="" {...register("phone_number", { required: true })}/>
                  <Input id="password"       placeholder="Password"              className="" {...register("password", { required: true })}/>
                  <Input id="password_conf"  placeholder="Password Confirmation" className="" {...register("password_confirmation", { required: true })}/>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Save</Button>
              </form>
          </DialogContent>
      </Dialog>
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
                            <th className="p-4 text-left text-sm font-semibold text-black">Phone number</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Active</th>
                            <th className="p-4 text-left text-sm font-semibold text-black">Action</th>
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
                                        {val.name}
                                    </td>
                                    <td className="p-4">
                                        <label className="relative cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={val.status === "active"} />
                                            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
                                        </label>
                                    </td>
                                    <td className="p-4">
                                        <button title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-red-500 hover:fill-red-700" viewBox="0 0 24 24">
                                                <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                                                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                                            </svg>
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
  );
  }
}

export default Admins