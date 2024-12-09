
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { msg, redirect } }); // Redirect to '/auth' if no user
    }
  }, [user, navigate]); // Ensure 'navigate' is added to dependency array

  // Render children only if the user exists
  return user ? children : null;
};

export default ProtectedRoute;
