import { ErrorResponseI } from './errorResponse.interface';

export interface JwtResponseI extends ErrorResponseI {

  content: {
    refreshToken: string;
    accessToken: string;
    expireAt: string;
    id: number;
    username: string;
  }
}
