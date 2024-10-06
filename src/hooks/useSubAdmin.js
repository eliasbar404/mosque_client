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
        Swal.fire({icon: "error",title: "Oops...",text: "Échec de la création d'un administrateur!"});
    }

    return response.json();
};
// Delete admin function
const deleteSubAdmin = async (subadminId) => {
    const response = await fetch(`http://localhost:8000/api/users/subadmins/${subadminId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete admin');
    }
  
    return response.json();
};

// Change admin status function
const changeSubAdminStatus = async ({subadminId,status}) => {
    const response = await fetch(`http://localhost:8000/api/users/subadmins/${subadminId}/${status}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to change sub admin status');
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

      // Delete admin using useMutation
  const { mutateAsync: removeSubAdmin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteSubAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subadmins'] });
    },
  });

    // Change admin status using useMutation
    const { mutateAsync: updateSubAdminStatus, isLoading: isUpdatingStatus } = useMutation({
        mutationFn: changeSubAdminStatus,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['subadmins'] });
        },
      });

    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {subadmins,error,isLoading,isCreating,addsubAdmin,removeSubAdmin,isDeleting,updateSubAdminStatus,isUpdatingStatus};
};
