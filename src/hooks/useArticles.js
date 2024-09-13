import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2'; 
// import { useParams } from "react-router-dom"
// // Fetch Articles Function
// let { ArticleId } = useParams();
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
const deleteArticle = async (articleId) => {
    Swal.fire({
        title: "Do you want to delete the article?",
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

    // console.log(articleId)


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
            // console.log(response.json())
            return response.json();
            
            

};


// Get One Article By ID

const fetchArticle = async () => {

    // console.log(articleId)
    


            const response = await  fetch(`http://localhost:8000/api/articles/${ArticleId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to change member status');
            }
            // console.log(response.json())
            return response.json();
            
            

};

// The useAdmin hook
export const useArticles = () => {
    const queryClient = useQueryClient();

    // Fetch admins using useQuery in v5 object signature format
    const { data: articles, error, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
    });

    const { data: article, article_error, article_isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticle,
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
    return {articles,error,isLoading,removeArticle,isDeleting,publisharticle,isUpdatingStatus,article,article_error,article_isLoading};
};