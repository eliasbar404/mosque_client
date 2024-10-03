import { useQuery ,useMutation, useQueryClient} from '@tanstack/react-query';
import Swal from 'sweetalert2';

const fetchContacts = async () => {
    const response = await fetch('http://localhost:8000/api/contacts', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) { throw new Error('Failed to fetch Events')}

    return response.json();
};

// Delete admin function
const deleteContact = async (contactId) => {
    Swal.fire({
        title: "Do you want to delete the message?",
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
        const response = await fetch(`http://localhost:8000/api/contacts/${contactId}`, {
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
        return response.json();

    }


};


// The useArticle Hook
export const useContacts = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: contacts, error, isLoading } = useQuery({
        queryKey: ['contacts'],
        queryFn: fetchContacts,
    });

    // Delete admin using useMutation
    const { mutateAsync: removeContact, isLoading: isDeleting } = useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] });
        },
    });




    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {contacts,error,isLoading,removeContact,isDeleting};
};