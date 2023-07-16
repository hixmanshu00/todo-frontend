import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";
import {BrowserRouter as Router} from 'react-router-dom'


export const server = "https://todo-backend-w3tu.onrender.com/api/v1";

export const context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const [refresh, setRefresh] = useState(false)
  return (
    <context.Provider value={{isAuthenticated, setIsAuthenticated, loading, setLoading, user , setUser, refresh, setRefresh}}>
      <App />
    </context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  
    <AppWrapper />
  </React.StrictMode>
);
