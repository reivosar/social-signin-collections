import { useEffect, useState } from "react";
import "./App.css";
import SocialLoginButtons from "./components/SocialLoginButtons";
import RedirectPage from "./components/RedirectPage";

function App() {
  const [userInfo, setUserInfo] = useState<{ email?: string; name?: string }>(
    {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
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
        console.log(data);
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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Social Login</h1>
        {isLoggedIn ? (
          <RedirectPage
            onLogout={() => setIsLoggedIn(false)}
            userInfo={userInfo}
          />
        ) : (
          <SocialLoginButtons onLogin={() => setIsLoggedIn(true)} />
        )}
      </header>
    </div>
  );
}
export default App;
