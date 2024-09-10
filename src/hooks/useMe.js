import { useState, useEffect } from "react";


export const useMe = (userType) => {
    const token = localStorage.getItem('token');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

        try {
            const response = await fetch(`http://localhost:8000/api/${userType}/auth/me`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token is invalid, trigger logout
                    // logout();
                }
                throw new Error("Failed to fetch user data.");
            }

        const data = await response.json();
        setUser(data); // Set the user data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token,userType]);

  return { user, loading, error };
};
