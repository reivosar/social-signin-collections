import { getSocialLoginHandler } from './SocialLoginHandlerFactory';

export const initiateSocialLogin = (provider: string) => {
    const handler = getSocialLoginHandler(provider);
    if (handler) {
        handler.loginHandler();
    } else {
        console.error("Failed to retrieve the login handler.");
    }
};