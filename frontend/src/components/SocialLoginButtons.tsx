import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './SocialLoginButtons.css';
import { getSocialLoginHandler } from '../handlers/SocialLoginHandlerFactory';

const SocialLoginButtons: React.FC<{ onLogin: () => void }> = ({ }) => {
    const handleLogin = (provider: string) => {
        console.log(`${provider} login clicked`);
        const handler = getSocialLoginHandler(provider);
        if (handler) {
            handler.loginHandler();
        } else {
            console.error(`Login handler for provider "${provider}" not found.`);
        }
    };

    return (
        <div className="social-login-buttons">
            <button className="social-login-button google" onClick={() => handleLogin('google')}>
                <FontAwesomeIcon icon={faGoogle} /> Login with Google
            </button>
            <button className="social-login-button facebook" onClick={() => handleLogin('facebook')}>
                <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
            </button>
            <button className="social-login-button linkedin" onClick={() => handleLogin('linkedIn')}>
                <FontAwesomeIcon icon={faLinkedin} /> Login with LinkedIn
            </button>
            <button className="social-login-button github" onClick={() => handleLogin('gitHub')}>
                <FontAwesomeIcon icon={faGithub} /> Login with GitHub
            </button>
        </div>
    );
};

export default SocialLoginButtons;
