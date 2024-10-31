import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

// A custom PrivateRoute component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists
  const navigate = useNavigate()

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          navigate('/signin')// Redirect to the login page if not authenticated
        )
      }
    />
  );
};

export default PrivateRoute