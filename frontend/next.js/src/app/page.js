"use client"

import { useContext, useState, useEffect } from 'react';
import AuthContext from './authstuff/authcontext';
import ProtectedRoute from './route/protectedroute';
import axios from 'axios';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="container">
        <h1>Welcome!</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Home;