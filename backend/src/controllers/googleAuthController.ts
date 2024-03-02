import { Request, Response } from 'express';
import axios from 'axios';
import { generateRedirectUrl } from '../utils/redirectWithToken';

export const googleRedirect = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;

    axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((userInfoResponse) => {
      const userPayload = {
        email: userInfoResponse.data.email,
        name: userInfoResponse.data.name,
      };
      const redirectUrl = generateRedirectUrl(userPayload);
      res.redirect(redirectUrl);
    });
  } catch (error) {
    const failedRedirectUrl = process.env.FRONTEND_LOGIN_FAILED_URL;
    if (!failedRedirectUrl) {
      console.error('FRONTEND_LOGIN_FAILED_URL is not defined in the environment variables.');
      return res.status(500).json({ message: 'Internal Server Error due to misconfiguration.' });
    }
    res.redirect(failedRedirectUrl);
  }
};
