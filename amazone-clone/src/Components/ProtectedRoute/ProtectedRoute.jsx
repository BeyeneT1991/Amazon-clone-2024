import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect = "/auth" }) => {
  const navigate = useNavigate();
  const [{ user, dispatch }] = useContext(DataContext); 
  useEffect(() => {
    if (!user) {
      navigate("auth", { state: { msg } }); 
    }
  }, [user, navigate, redirect, msg]); 

  // Payment -----> /auth (/)
  return user ? children : null;
};

export default ProtectedRoute;