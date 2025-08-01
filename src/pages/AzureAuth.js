// src/AuthCallback.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginSucceed, updateIsAuthenticated, addLoggedUser, renewToken } from "../actions/userAction";
import { useDispatch } from 'react-redux';
import { getStores } from "../app/services/MagasinServices";
import { mockUserData, simulateApiDelay } from "../app/mockData";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    // Mock authentication - simulate the auth process
    const mockAuth = async () => {
      try {
        // Simulate API delay
        await simulateApiDelay(1000);
        
        // Mock successful authentication
        console.info('Mock: Authentication successful with token: ' + (token || 'mock-token'));
        
        // Use mock user data
        const userData = {
          ...mockUserData,
          token: token || 'mock-token-' + Date.now()
        };
        
        dispatch(loginSucceed(userData.token));
        dispatch(updateIsAuthenticated(true));
        dispatch(addLoggedUser(userData));
        dispatch(renewToken(false));
        dispatch(getStores());

        navigate("/magasin");
      } catch (error) {
        console.error('Mock: Error during authentication', error);
        // Redirect to login page on error
        navigate("/");
      }
    };

    // Always proceed with mock authentication
    mockAuth();
  }, [location, navigate, dispatch]);

  return <div> Authentifié avec succès... </div>;
};

export default AuthCallback;
