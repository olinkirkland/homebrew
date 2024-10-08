import { logout } from '@/api/account';
import { router } from '@/router';
import { useTokenStore } from '@/stores/token-store';
import axios, { AxiosError, HttpStatusCode } from 'axios';

export const BASE_URL =
  // false
  location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://homebrew.up.railway.app/api'; // Replace with the production URL

console.log('BASE_URL:', BASE_URL);

export const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Add interceptors to the server instance
 * The interceptors are used to add the access token to the Authorization header
 * and to handle 401 errors by fetching a new access token
 */
export function addInterceptors() {
  // Insert the access token into the Authorization header
  server.interceptors.request.use(async (config) => {
    //@ts-ignore
    if (!config) config = {};
    config!.headers!.Authorization = `Bearer ${useTokenStore().accessToken}`;
    return config;
  });

  // Handle 401 errors by fetching a new access token
  server.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const excludeUrls = [
        '/auth/token',
        '/account/login',
        '/account/register'
      ];
      if (
        error.response?.status === HttpStatusCode.Unauthorized &&
        !excludeUrls.includes(error.config.url)
      ) {
        // If it's a 401 error on a fetchAccessToken request, it means the refresh token is invalid
        // Redirect the user to the login page
        if (error.config.url?.includes('/auth/token')) {
          useTokenStore().clear();
          router.push('/login');
          return Promise.reject('Invalid refresh token');
        }

        if (!useTokenStore().refreshToken)
          return Promise.reject(
            error.response?.data?.message || 'No refresh token found'
          );

        await fetchAccessToken();

        // After fetching the access token, retry the original request
        // This is done by returning the server call with the original config
        // Add the new access token to the Authorization header
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${useTokenStore().accessToken}`;
        return server(config);
      }

      return Promise.reject(error);
    }
  );
}

/**
 * Fetches a new access token using the refresh token
 * @returns {Promise} The response from the server
 * @throws {Promise} If the refresh token is invalid
 */
export async function fetchAccessToken(): Promise<any> {
  let response;
  try {
    console.log(
      '@fetchAccessToken: refreshToken:',
      useTokenStore().refreshToken
    );
    response = await server.put('/auth/token', {
      refreshToken: useTokenStore().refreshToken
    });
    return response;
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK')
      return Promise.reject('Network error');

    logout();
    return Promise.reject('Invalid refresh token');
  }

  useTokenStore().accessToken = response.data.accessToken;
}
