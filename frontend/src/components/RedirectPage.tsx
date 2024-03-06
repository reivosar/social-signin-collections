import "./RedirectPage.css";

const RedirectPage: React.FC<{
  onLogout: () => void;
  userInfo: { email?: string; name?: string };
}> = ({ onLogout, userInfo }) => {
  if (!userInfo) {
    return (
      <div className="container">
        <h1 className="title">Login Error</h1>
        <p className="errorMessage">Login failed.</p>
        <button className="logoutButton" onClick={onLogout}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Welcome, {userInfo.name}!</h1>
      <p className="userInfo">Your email: {userInfo.email}</p>
      <button className="logoutButton" onClick={onLogout}>
        Go Back
      </button>
    </div>
  );
};

export default RedirectPage;
