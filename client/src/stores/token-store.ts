import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('auth', () => {
  const refreshToken = ref();
  const accessToken = ref();

  // Retrieve refresh token from localStorage if it exists
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (storedRefreshToken) refreshToken.value = storedRefreshToken;

  // Watch for changes in refreshToken and store it in localStorage
  const storeRefreshToken = (newToken: string | null) => {
    refreshToken.value = newToken;
    if (!newToken) localStorage.removeItem('refreshToken');
    else localStorage.setItem('refreshToken', newToken);
  };

  // Clear the refresh token from the store and localStorage
  const clear = () => {
    console.warn('Clearing tokens');
    storeRefreshToken(null);
    accessToken.value = null;
  };

  return {
    accessToken,
    refreshToken,
    storeRefreshToken,
    clear
  };
});
