import { useState } from 'react';

const users = [
    {firstName: "John",lastName: "Doe",email: "john.doe@example.com",phoneNumber: "+1234567890",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"},
    {firstName: "Jane",lastName: "Smith",email: "jane.smith@example.com",phoneNumber: "+0987654321",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName: "Michael",lastName: "Johnson",email: "michael.johnson@example.com",phoneNumber: "+1122334455",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName: "Emily", lastName: "Brown",email: "emily.brown@example.com",phoneNumber: "+9988776655",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"},
    {firstName: "John",lastName: "Doe",email: "john.doe@example.com",phoneNumber: "+1234567890",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"},
    {firstName: "Jane",lastName: "Smith",email: "jane.smith@example.com",phoneNumber: "+0987654321",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName: "Michael",lastName: "Johnson",email: "michael.johnson@example.com",phoneNumber: "+1122334455",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName: "Emily",lastName: "Brown",email: "emily.brown@example.com",phoneNumber: "+9988776655",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"},
    {firstName: "John",lastName: "Doe",email: "john.doe@example.com",phoneNumber: "+1234567890",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"},
    {firstName: "Jane",lastName: "Smith",email: "jane.smith@example.com",phoneNumber: "+0987654321",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName: "Michael",lastName: "Johnson",email: "michael.johnson@example.com",phoneNumber: "+1122334455",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName: "Emily",lastName: "Brown",email: "emily.brown@example.com",phoneNumber: "+9988776655",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"},
    {firstName: "John",lastName: "Doe",email: "john.doe@example.com",phoneNumber: "+1234567890",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"},
    {firstName: "Jane",lastName: "Smith",email: "jane.smith@example.com",phoneNumber: "+0987654321",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName: "Michael",lastName: "Johnson",email: "michael.johnson@example.com",phoneNumber: "+1122334455",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName: "Emily",lastName: "Brown",email: "emily.brown@example.com",phoneNumber: "+9988776655",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"},
    {firstName: "John",lastName: "Doe",email: "john.doe@example.com",phoneNumber: "+1234567890",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"},
    {firstName: "Jane",lastName: "Smith",email: "jane.smith@example.com",phoneNumber: "+0987654321",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"},
    {firstName: "Michael",lastName: "Johnson",email: "michael.johnson@example.com",phoneNumber: "+1122334455",status: "active",profileImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"},
    {firstName: "Emily",lastName: "Brown",email: "emily.brown@example.com",phoneNumber: "+9988776655",status: "notactive",profileImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  // Add more users if needed
];

const Users = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [usersPerPage, setUsersPerPage] = useState(10); // You can change the default value

    // Filter users based on the search query
    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="font-bold text-3xl font-mono text-center">Users List</h1>

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
                                            <img src={val.profileImageUrl} className="w-9 h-9 rounded-full shrink-0" />
                                            <div className="ml-4">
                                                <p className="text-sm text-black">{val.lastName} {val.firstName}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">{val.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-black">
                                        {val.phoneNumber}
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
};

export default Users;