import { Http } from '../http/http';

import {
  LoginWithPasswordRequest,
  LoginWithPasswordResponse,
} from '../../api/contract';
import { JWT_TOKEN } from '../../constants';

export class Auth {
  constructor(private http: Http) {}

  loginWithPassword(password: string) {
    return new Promise<LoginWithPasswordResponse>((resolve, reject) => {
      this.http
        .post<LoginWithPasswordRequest, LoginWithPasswordResponse>({
          url: '/auth/password',
          body: { password },
        })
        .then((response) => {
          // save to local storage if he is authenticated
          if (response.isAuthenticated && response.token) {
            localStorage.setItem(JWT_TOKEN, response.token);
          }

          resolve(response);
        })
        .catch(reject);
    });
  }

  loginWithToken(token: string) {
    localStorage.setItem(JWT_TOKEN, token);
  }

  isLoggedIn() {
    const jwt = localStorage.getItem(JWT_TOKEN);

    return jwt && jwt.length > 0;
  }

  logout() {
    localStorage.removeItem(JWT_TOKEN);
  }
}
