import { useEffect, useState } from 'react';
import './App.css';
import SocialLoginButtons from './components/SocialLoginButtons';
import RedirectPage from './components/RedirectPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('userInfo')) { 
            setIsLoggedIn(true); 
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Social Login</h1>
                {isLoggedIn ? (
                    <RedirectPage onLogout={() => setIsLoggedIn(false)} />
                ) : (
                    <SocialLoginButtons onLogin={() => setIsLoggedIn(true)} />
                )}
            </header>
        </div>
    );
}
export default App;
