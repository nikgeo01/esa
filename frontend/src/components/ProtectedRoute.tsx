import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute = ({
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  if (!authenticated) {
    // Redirect to login page but save the current location they were trying to go to
    return <Navigate to="/login" state={{
      from: location.pathname
    }} replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;