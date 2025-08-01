import { jwtDecode } from "jwt-decode";
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');


export const saveToLocalStorage = (state) => {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  // load string (most often JSON stringified object) from localStorage and convert into an Object
  // invalid output must be undefined
export const loadFromLocalStorage = () => {
  try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
  } catch (e) {
      console.warn(e);
      return undefined;
  }
}
  
export const getToken = () => {
  
  return loadFromLocalStorage()?.user?.token || null;
  
}
  
export const logout = () => {
    // logout clears localStorage and got back to /login
    localStorage.clear();
    window.location.href = "/";
}

export const convertTimeRange = (startTime, endTime) => {
    const startDateTime = moment(startTime, 'YYYY-MM-DD HH:mm');
    const endDateTime = moment(endTime, 'YYYY-MM-DD HH:mm');
    

    const formattedStartTime = startDateTime.format('dddd DD MMMM YYYY HH:mm');
    const formattedEndTime = endDateTime.format('HH:mm');

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  export const tokenIsExpired = (token) => {
    let isTokenExpired = false;
    
    // Handle mock tokens (they never expire)
    if (token && token.startsWith('mock-token-')) {
      console.log('Mock: Token is a mock token, never expires');
      return false;
    }
    
    try {
      const decodedToken = jwtDecode(token);
      const expTimestamp = decodedToken.exp;
      const expDateTime = new Date(expTimestamp * 1000);
      const now = new Date();
      if (now > expDateTime) {
          isTokenExpired = true;
      }
      
    } catch (error) {
        isTokenExpired = true;
        console.error('Error decoding token:', error);
    }
    return isTokenExpired
  }
