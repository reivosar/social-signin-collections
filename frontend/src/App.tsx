import "./App.css";
import SocialLoginButtons from "./components/SocialLoginButtons";
import RedirectPage from "./components/RedirectPage";
import useAuthenticateUser from "./hooks/useAuthenticateUser";

function App() {
  const { userInfo, isLoggedIn, logout } = useAuthenticateUser();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Social Login</h1>
        {isLoggedIn ? (
          <RedirectPage onLogout={logout} userInfo={userInfo} />
        ) : (
          <SocialLoginButtons onLogin={() => {}} />
        )}
      </header>
    </div>
  );
}

export default App;
