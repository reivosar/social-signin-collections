import { SocialLoginHandler } from './SocialLoginHandler';

export class GoogleLoginHandler implements SocialLoginHandler {
    loginHandler() {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
        const scope = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);
        const responseType = import.meta.env.VITE_GOOGLE_RESPONSE_TYPE;
      
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&prompt=consent`;
        window.location.href = authUrl; 
    }
}
