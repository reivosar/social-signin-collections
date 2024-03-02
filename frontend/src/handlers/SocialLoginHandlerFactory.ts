import { SocialLoginHandler } from './SocialLoginHandler';
import { GoogleLoginHandler } from './GoogleLoginHandler';

const socialLoginHandlersMap: Map<string, SocialLoginHandler> = new Map([
    ["google", new GoogleLoginHandler()],
]);

export const getSocialLoginHandler = (provider: string): SocialLoginHandler | null => {
    const handler = socialLoginHandlersMap.get(provider);
    if (!handler) {
        console.error("Unsupported provider: ", provider);
        return null;
    }
    return handler;
};