import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './SocialLoginButtons.css';

const SocialLoginButtons: React.FC = () => {
    const handleLogin = (provider: string) => {
        console.log(`${provider} login clicked`);
    };

    return (
        <div className="social-login-buttons">
            <button className="social-login-button twitter" onClick={() => handleLogin('Twitter')}>
                <FontAwesomeIcon icon={faTwitter} /> Login with Twitter
            </button>
            <button className="social-login-button google" onClick={() => handleLogin('Google')}>
                <FontAwesomeIcon icon={faGoogle} /> Login with Google
            </button>
            <button className="social-login-button facebook" onClick={() => handleLogin('Facebook')}>
                <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
            </button>
            <button className="social-login-button linkedin" onClick={() => handleLogin('LinkedIn')}>
                <FontAwesomeIcon icon={faLinkedin} /> Login with LinkedIn
            </button>
            <button className="social-login-button github" onClick={() => handleLogin('GitHub')}>
                <FontAwesomeIcon icon={faGithub} /> Login with GitHub
            </button>
        </div>
    );
};

export default SocialLoginButtons;
