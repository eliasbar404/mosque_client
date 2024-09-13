import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 

// Fetch admins function
const fetchMembers = async () => {
    const response = await fetch('http://localhost:8000/api/users/members', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch members');
    }

    return response.json();
};

// Create new admin function
// const createsubAdmin = async (newAdmin) => {
//     const response = await fetch('http://localhost:8000/api/subadmin/auth/register', {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAdmin),
//     });

//     if (!response.ok) {
//        // throw new Error('Failed to create admin');
//         Swal.fire({icon: "error",title: "Oops...",text: "Failed to create a Sub admin!"});
//     }

//     return response.json();
// };
// Delete admin function
const deleteMembers = async (memberId) => {
    Swal.fire({
        title: "Do you want to delete the member?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {


            Fdelete()
            
            
        } else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        }
    });


    const Fdelete = async()=>{
        const response = await fetch(`http://localhost:8000/api/users/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                },
        });

        if (!response.ok) {
                throw new Error('Failed to delete member');
        }
        Swal.fire("Saved!", "", "success");
    }


};

// Change admin status function
const changeMamberStatus = async ({memberId,status}) => {

    // Swal.fire({
    //     title: "Do you want to change the status of  the member?",
    //     showDenyButton: true,
    //     confirmButtonText: "Yes",
    //     denyButtonText: `No`
    // }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {


            const response = await  fetch(`http://localhost:8000/api/users/members/${memberId}/${status}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to change member status');
            }
            
            return response.json();
            
            
    //     } else if (result.isDenied) {
    //     //   Swal.fire("Changes are not saved", "", "info");
    //     }
    // });

    // const FmemberStatus = async()=>{
    //     const response = await fetch(`http://localhost:8000/api/users/members/${memberId}/${status}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json',
    //         },
    //     });
        
    //     if (!response.ok) {
    //         throw new Error('Failed to change member status');
    //     }
        
    //     return response.json();
    // }

};

// The useAdmin hook
export const useMembers = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: members, error, isLoading } = useQuery({
        queryKey: ['members'],
        queryFn: fetchMembers,
    });

    // Create admin using useMutation with v5 object signature
    // const { mutateAsync: addsubAdmin, isLoading: isCreating } = useMutation({
    //     mutationFn: createsubAdmin,
    //     onSuccess: () => {
    //         // Invalidate the "admins" query to refetch the list of admins
    //         queryClient.invalidateQueries({ queryKey: ['subadmins'] });
    //     },
    // });

      // Delete admin using useMutation
  const { mutateAsync: removeMembers, isLoading: isDeleting } = useMutation({
    mutationFn: deleteMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },
  });

    // Change admin status using useMutation
    const { mutateAsync: updateMemberStatus, isLoading: isUpdatingStatus } = useMutation({
        mutationFn: changeMamberStatus,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['members'] });
        },
      });

    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {members,error,isLoading,removeMembers,isDeleting,updateMemberStatus,isUpdatingStatus};
};