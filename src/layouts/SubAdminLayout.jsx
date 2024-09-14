import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { useSubAdminLogin } from '../hooks/useSubAdminLogin'; // Adjust the import path if necessary

// eslint-disable-next-line react/prop-types
const SubAdminLayout = ({ children }) => {
    const { isLoggedIn, loading } = useSubAdminLogin();
    const [authenticated, setAuthenticated] = useState(isLoggedIn);
    const [authLoading, setAuthLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Check if user is authenticated using the token
                const response = await fetch('http://localhost:8000/api/subadmin/auth/me', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                     // If response is OK, user is authenticated
                        setAuthenticated(true);
                } else {
                    // If response is not OK, user is not authenticated
                        setAuthenticated(false);
                        navigate('/subadmin'); // Redirect to login page
                }} 
            catch (error) {
                console.error('Error verifying user:', error);
                setAuthenticated(false);
                navigate('/subadmin'); // Redirect to login page
            } 
            finally {
                    setAuthLoading(false);
            }
        };

        verifyUser();

        }, [navigate]);

    if (authLoading || loading) return <svg xmlns="http://www.w3.org/2000/svg" className="w-[300px] flex justify-center align-middle animate-spin fill-blue-600 mx-auto"
    viewBox="0 0 24 24">
    <path
        d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
        data-original="#000000" />
    </svg>;

return (
    <div>
        {authenticated ? (
            <div>
              {/* Render protected content */}
                {children}
            </div>
        ) : (
            <p>Redirecting to login...</p> // Optional message while redirecting
        )}
    </div>
);
};

export default SubAdminLayout;