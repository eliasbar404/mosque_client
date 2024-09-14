import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 

const fetchEvents = async () => {
    const response = await fetch('http://localhost:8000/api/events', {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) { throw new Error('Failed to fetch Events')}

    return response.json();
};


// Delete admin function
const deleteEvent = async (eventId) => {
    Swal.fire({
        title: "Do you want to delete the event?",
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
        const response = await fetch(`http://localhost:8000/api/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                },
        });

        if (!response.ok) {
                throw new Error('Failed to delete event');
        }
        
        Swal.fire("Saved!", "", "success");
        return response.json();

    }


};

// Change admin status function
const publishEvent = async (eventId) => {

        const response = await  fetch(`http://localhost:8000/api/events/${eventId}/publish`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });
            
        if (!response.ok) {
            throw new Error('Failed to change event status');
        }

        return response.json();
};



// The useArticle Hook
export const useEvents = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: events, error, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });


    // Delete admin using useMutation
    const { mutateAsync: removeEvent, isLoading: isDeleting } = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    // Change admin status using useMutation
    const { mutateAsync: publishevent, isLoading: isUpdatingStatus } = useMutation({
        mutationFn: publishEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });

    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {events,error,isLoading,removeEvent,isDeleting,publishevent,isUpdatingStatus};
};