import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIsAuthenticated } from '../actions/userAction';
import { useNavigate } from 'react-router-dom';
import { tokenIsExpired } from "../utils";

const verifyAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
      console.log('VerifyAuth: Checking authentication state:', { isAuthenticated, token });
      
      if (!isAuthenticated) {
        console.log('VerifyAuth: Not authenticated, redirecting to login...');
        // Mock: Redirect to login page instead of external URL
        navigate("/");
        return;
      }
      
      // Only check token expiration if we have a token
      if (token) {
        const isTokenExpired = tokenIsExpired(token);
        console.log('VerifyAuth: Token expired check:', isTokenExpired);
        
        if (isTokenExpired) {
          console.log('VerifyAuth: Token expired, logging out...');
          dispatch(updateIsAuthenticated(false));
          navigate("/");
          return;
        }
      }
      
      console.log('VerifyAuth: Authentication valid, rendering component...');
    }, [isAuthenticated, token, navigate, dispatch]);

    // Update isAuthenticated state after successful login (if needed)
    const handleLoginSuccess = () => {
      dispatch(updateIsAuthenticated(true));
    };

    if (!isAuthenticated) {
      // If not authenticated, don't render the wrapped component
      return null;
    }

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} onLoginSuccess={handleLoginSuccess} />;
  };

  return Auth;
};

export default verifyAuth;