import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useAuthenticate = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    email: undefined,
    name: undefined,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.pathname === "/login-success") {
      const apiUrl = import.meta.env.VITE_USERINFO_API_URL;
      fetch(apiUrl, {
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Unauthorized");
        })
        .then((data) => {
          setUserInfo({
            email: data.email,
            name: data.name,
          });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoggedIn(false);
        });
    }
  }, [location, isLoggedIn]);

  const logout = () => {
    const logoutUrl = import.meta.env.VITE_LOGOUT_API_URL;
    fetch(logoutUrl, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setIsLoggedIn(false);
          setUserInfo({ email: undefined, name: undefined });
        }
      })
      .catch((error) => console.error("Logout failed", error));
  };

  return { userInfo, isLoggedIn, setUserInfo, setIsLoggedIn, logout };
};

export default useAuthenticate;
