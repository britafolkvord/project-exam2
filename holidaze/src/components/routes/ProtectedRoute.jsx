import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Routes } from '../../constants/Routes';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? children : <Redirect to={Routes.unauthorized} />;
};

export default ProtectedRoute;
