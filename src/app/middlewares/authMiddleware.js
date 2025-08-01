import { tokenIsExpired } from "../../utils";

const authMiddleware = ({ getState, dispatch }) => (next) => (action) => {
    const currentState = getState().user;
    const token = currentState.token;
    const renewToken = currentState.renewToken;
    
    if (action.type === "UPDATE_TOKEN" || action.type === "LOGIN_SUCCEED") return next(action);

    const isTokenExpired = tokenIsExpired(token);

    if (isTokenExpired && !renewToken) {
        const updatedState = {
            ...currentState,
            renewToken: true,
            isAuthenticated: false
        };
        
        // Dispatch an action to update the state
        dispatch({
            type: 'UPDATE_TOKEN',
            payload: updatedState 
        });
        
        // Mock: Redirect to login page instead of external URL
        window.location.href = "/";
        return;
    }

    return next(action);
};

export default authMiddleware;