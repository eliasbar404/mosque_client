import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 

const fetchArticles = async () => {
    const response = await fetch('http://localhost:8000/api/articles', {
        method: 'GET',
        headers: {
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) { throw new Error('Failed to fetch Artilces')}

    return response.json();
};


// Delete admin function
const deleteArticle = async (articleId) => {
    Swal.fire({
        title: "Voulez-vous supprimer l'article?",
        showDenyButton: true,
        confirmButtonText: "Oui",
        denyButtonText: `No`
    }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const response = await fetch(`http://localhost:8000/api/articles/${articleId}`, {
                method: 'DELETE',
                headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                },
        });

        if (!response.ok) {
                throw new Error('Failed to delete member');
        }
        
        Swal.fire("Supprimé!", "", "success");
        return response.json();
        } else if (result.isDenied) {
        //   Swal.fire("Changes are not saved", "", "info");
        }
    });


    const Fdelete = async()=>{
        const response = await fetch(`http://localhost:8000/api/articles/${articleId}`, {
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

// Change admin status function
const publishArticle = async (articleId) => {

        const response = await  fetch(`http://localhost:8000/api/articles/${articleId}/publish`, {
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
};



// The useArticle Hook
export const useArticles = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: articles, error, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    });


    // Delete admin using useMutation
    const { mutateAsync: removeArticle, isLoading: isDeleting } = useMutation({
        mutationFn: deleteArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });

    // Change admin status using useMutation
    const { mutateAsync: publisharticle, isLoading: isUpdatingStatus } = useMutation({
        mutationFn: publishArticle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
    });

    // Return the list of admins, error, loading states, and mutation function for creating an admin
    return {articles,error,isLoading,removeArticle,isDeleting,publisharticle,isUpdatingStatus};
};