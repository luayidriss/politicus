import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
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
    axiosRes.get("dj-rest-auth/user/")
      .then(() => {
        setLoggedIn(true);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
