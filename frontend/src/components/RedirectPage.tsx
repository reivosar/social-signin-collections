import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import　'./RedirectPage.css';

const RedirectPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [userInfo, setUserInfo] = useState<{ email?: string; name?: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedUserInfo = urlParams.get('userInfo');

    if (encodedUserInfo) {
      try {
        const decodedUserInfo = jwtDecode<{ email: string; name: string }>(encodedUserInfo);
        setUserInfo({
          email: decodedUserInfo.email,
          name: decodedUserInfo.name,
        });
      } catch (error) {
        console.error('Failed to decode JWT:', error);
        setError('Failed to decode user information. Please try to login again.');
      }
    }
  }, []);

  if (error) {
    return (
      <div className="container">
        <h1 className="title">Login Error</h1>
        <p className="errorMessage">{error}</p>
        <button className="logoutButton" onClick={onLogout}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Welcome, {userInfo.name}!</h1>
      <p className="userInfo">Your email: {userInfo.email}</p>
      <button className="logoutButton" onClick={onLogout}>Go Back</button>
    </div>
  );
};

export default RedirectPage;
