import history from '../../history';
import { JWT_TOKEN } from '../../constants';

export class Http {
  private basePath: string;

  constructor(basePath: string = '/') {
    if (!basePath.endsWith('/')) {
      this.basePath = `${basePath}/`;
    } else {
      this.basePath = basePath;
    }
  }

  private normalizeURL(url: string) {
    if (url.startsWith('/')) {
      return `${this.basePath}${url.substr(1)}`;
    } else {
      return `${this.basePath}${url}`;
    }
  }

  private addBearerToken(headers: Headers) {
    const jwt = localStorage.getItem(JWT_TOKEN);

    if (jwt && jwt.length > 0) {
      headers.append('Authorization', `Bearer ${jwt}`);
    }

    return headers;
  }

  private redirectToLogin() {
    history.push('/login');
  }

  get<TResponse>({
    url,
    auth = false,
  }: {
    url: string;
    auth?: boolean;
  }): Promise<TResponse> {
    const normalizedURL = this.normalizeURL(url);

    return new Promise((resolve, reject) => {
      fetch(normalizedURL, {
        method: 'GET',
        headers: auth ? this.addBearerToken(new Headers()) : {},
      })
        .then((response) => {
          if (auth && response.status === 401) this.redirectToLogin();

          return response.json();
        })
        .then(resolve)
        .catch(reject);
    });
  }

  post<TRequestBody, TResponse>({
    url,
    body,
    auth = false,
  }: {
    url: string;
    body: TRequestBody;
    auth?: boolean;
  }): Promise<TResponse> {
    const normalizedURL = this.normalizeURL(url);
    let headers = new Headers({ 'content-type': 'application/json' });

    return new Promise((resolve, reject) => {
      fetch(normalizedURL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: auth ? this.addBearerToken(headers) : headers,
      })
        .then((response) => {
          if (auth && response.status === 401) this.redirectToLogin();

          return response.json();
        })
        .then(resolve)
        .catch(reject);
    });
  }
}
