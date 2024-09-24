import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure you're using the correct backend URL
        const res = await axios.get('http://localhost:8080/admins/dashboard', { withCredentials: true });

        if (res.data) {
          setUser(res.data); // Set the user data from the API response
          console.log(res.data);
          
        } 
        else {
          console.error('User not authenticated or not found');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchUser();
  }, []);

  return { user, loading }; // Return both user and loading state
};

export default useAuth;
