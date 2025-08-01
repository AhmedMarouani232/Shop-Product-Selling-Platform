
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../utils";
import styled from "styled-components";
import { logoutAction } from "../actions/userAction";
import ButtonField from '../components/Button';


const Div = styled.div`
    display : flex;
`;

const Logout = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const onsubmitLogout = () => {
        
        if (isAuthenticated) {
            dispatch(logoutAction);
            logout();
            window.location.href = `${process.env.REACT_APP_API_URL}/api/users/logout`;
        } else {
            navigate("/magasin");
        }
    }

    return (
        <Div>
             <ButtonField onClick={onsubmitLogout} variant="logout" height="35px">Déconnexion</ButtonField>
        </Div>
    );
}

export default Logout;

