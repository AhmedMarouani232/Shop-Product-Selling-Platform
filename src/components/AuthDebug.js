import React from 'react';
import { useSelector } from 'react-redux';

const AuthDebug = () => {
  const userState = useSelector((state) => state.user);
  
  return (
    <div >
    </div>
  );
};

export default AuthDebug; 