import "./RedirectPage.css";

const RedirectPage: React.FC<{
  onLogout: () => void;
  userInfo: { email?: string; name?: string };
}> = ({ onLogout, userInfo }) => {
  const isUserInfoAvailable = userInfo.email || userInfo.name;

  if (!isUserInfoAvailable) {
    return (
      <div className="container">
        <h1 className="title">Login Error</h1>
        <p className="errorMessage">Login failed. Please try again.</p>
        <button className="logoutButton" onClick={onLogout}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Welcome, {userInfo.name}!</h1>
      <p className="userInfo">Your email: {userInfo.email}</p>
      <button className="logoutButton" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default RedirectPage;
