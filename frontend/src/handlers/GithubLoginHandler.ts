import { SocialLoginHandler } from "./SocialLoginHandler";

export class GithubLoginHandler implements SocialLoginHandler {
  loginHandler() {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const scope = encodeURIComponent(import.meta.env.VITE_GITHUB_SCOPE);

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}`;
    window.location.href = authUrl;
  }
}
