import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./SocialLoginButtons.css";
import { getSocialLoginHandler } from "../handlers/SocialLoginHandlerFactory";

const SocialLoginButtons: React.FC<{ onLogin: () => void }> = ({}) => {
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
      <button
        className="social-login-button google"
        onClick={() => handleLogin("google")}
      >
        <FontAwesomeIcon icon={faGoogle} /> Login with Google
      </button>
      <button
        className="social-login-button github"
        onClick={() => handleLogin("github")}
      >
        <FontAwesomeIcon icon={faGithub} /> Login with GitHub
      </button>
      <p className="social-login-message">
        While I understood how to implement Yahoo, LinkedIn, Facebook, and
        Twitter logins, the pre-registration process was too cumbersome, so I
        decided to forgo it.
      </p>
    </div>
  );
};

export default SocialLoginButtons;
