import React, { useEffect } from "react";
import styles from "./css/Auth.module.css";
import ButtonField from "../components/Button";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSucceed, updateIsAuthenticated, addLoggedUser } from "../actions/userAction";
import { mockUserData, simulateApiDelay } from "../app/mockData";

function Auth(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    useEffect(() => {
        // Apply body styles when component mounts
        document.body.classList.add(styles.authBody);
    
        // Cleanup on unmount
        return () => {
          document.body.classList.remove(styles.authBody);
        };
    }, []);

    const onsubmit = async () => {
        console.log('Mock: Starting authentication process...');
        
        // Mock authentication process
        try {
            // Simulate API delay
            await simulateApiDelay(500);
            
            // Mock successful authentication
            const userData = {
                ...mockUserData,
                token: 'mock-token-' + Date.now()
            };
            
            // Dispatch actions
            dispatch(loginSucceed(userData.token));
            dispatch(updateIsAuthenticated(true));
            dispatch(addLoggedUser(userData));
            
            console.log('Mock: Authentication successful, navigating to magasin...');
            navigate("/magasin");
        } catch (error) {
            console.error('Mock: Authentication failed:', error);
        }
    }
    
    return(
        <div className={styles.auth__page}>
            <div className={styles.auth__icons}>
                <img className={styles.auth__fnac} src="images/Darty.svg" alt="icon"></img>
            </div>
            <ButtonField onClick={onsubmit} type="submit" variant="primary">Connexion   </ButtonField>
        </div>
    )
}

export default Auth;
