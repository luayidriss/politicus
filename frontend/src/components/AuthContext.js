import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleTokenRefresh = async () => {
    try {
      await axios.post("/dj-rest-auth/token/refresh/");
    } catch (err) {
      setLoggedIn(false);
      history.push("/signin");
    }
  };

  axiosReq.interceptors.request.use(async (config) => {
    await handleTokenRefresh();
    return config;
  });

  axiosRes.interceptors.response.use(
    (response) => response,
    async (err) => {
      if (err.response?.status === 401) {
        await handleTokenRefresh();
        return axios(err.config);
      }
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await axios.get("dj-rest-auth/user/");
        setCurrentUser(userData.data);
        setLoggedIn(true);
      } catch (error) {
        setLoggedIn(false);
        setCurrentUser(null);
      }
    };

    fetchUserData();
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
