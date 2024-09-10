import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const useAdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Perform the login API call
    const login = async (email, password) => {
        setLoading(true);
        setError(null);

    try {
      
      const response = await fetch(`http://localhost:8000/api/member/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // throw new Error("Login failed, please check your credentials.");
        // Swal.fire("Login failed, please check your credentials!");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed, please check your credentials!",
        });
      }

      const data = await response.json();
      
      // Store the JWT in localStorage or sessionStorage

      localStorage.setItem("token", data.access_token);
      

      // Set logged-in state
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
      
    }

    navigate('/');
  };

  // Function to logout and clear the JWT
  const logout = async() => {
  
            const token =  localStorage.getItem("token");
            const response = await fetch(`http://localhost:8000/api/member/auth/logout`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response) {
                if (response.status === 200) {
                  // Token is invalid, trigger logout
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    navigate('/');

                }
                throw new Error("Failed to fetch user data.");
            }
            


        

        //   if (!response.ok) {
        //     if (response.status === 401) {
        //       // Token is invalid, trigger logout
        //       logout();
        //     }
        //     throw new Error("Failed to fetch user data.");
        //   }
        


  };

  // Function to check if the user is already logged in
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return { login, logout, checkAuth, isLoggedIn, loading, error };
};