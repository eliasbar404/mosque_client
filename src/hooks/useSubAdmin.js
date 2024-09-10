import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 

// Fetch admins function
const fetchsubAdmins = async () => {
    const response = await fetch('http://localhost:8000/api/users/subadmins', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch admins');
    }

    return response.json();
};

// Create new admin function
const createsubAdmin = async (newAdmin) => {
    const response = await fetch('http://localhost:8000/api/subadmin/auth/register', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
    });

    if (!response.ok) {
       // throw new Error('Failed to create admin');
        Swal.fire({icon: "error",title: "Oops...",text: "Failed to create a Sub admin!"});
    }

    return response.json();
};

// The useAdmin hook
export const useSubAdmin = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: subadmins, error, isLoading } = useQuery({
        queryKey: ['subadmins'],
        queryFn: fetchsubAdmins,
    });

    // Create admin using useMutation with v5 object signature
    const { mutateAsync: addsubAdmin, isLoading: isCreating } = useMutation({
        mutationFn: createsubAdmin,
        onSuccess: () => {
            // Invalidate the "admins" query to refetch the list of admins
            queryClient.invalidateQueries({ queryKey: ['subadmins'] });
        },
    });

    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {subadmins,error,isLoading,isCreating,addsubAdmin};
};
