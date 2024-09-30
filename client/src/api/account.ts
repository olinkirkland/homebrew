import LoadingModal from '@/components/modals/templates/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useTokenStore } from '@/stores/token-store';
import { server } from './connection';

/**
 * Create a guest account and store the tokens
 * @returns The response data
 */
export async function createGuestAccount() {
  try {
    const response = await server.post('/auth/guest');
    console.log('createGuestAccount response:', response);
    if (response.data.refreshToken) {
      useTokenStore().storeRefreshToken(response.data.refreshToken);
      useTokenStore().accessToken = response.data.accessToken;
      // console.log('@account.ts: fetchMyAccount() because of createGuest');
      // await fetchMyAccount();
    }
    return response.data;
  } catch {
    return null;
  }
}

// export async function registerAccount(username?: string, password?: string) {
//   try {
//     const isGuest = !username || !password;
//     const payload = isGuest ? {} : { username, password };
//     console.log('registerAccount payload:', payload);
//     const response = await server.post('/account/create', payload);
//     console.log('response:', response);
//     if (response.status !== HttpStatusCode.Ok) return response.data;
//     console.log('@account.ts: fetchMyAccount() because of registerAccount');
//     mixpanel.track('Register Account', { username });
//     await fetchMyAccount();
//     return null;
//   } catch (error: any) {
//     return error?.response?.data;
//   }
// }

// export async function login(username: string, password: string) {
//   try {
//     const response = await server.post('/account/login', {
//       username,
//       password
//     });

//     if (response.data.refreshToken) {
//       useTokenStore().storeRefreshToken(response.data.refreshToken);
//       useTokenStore().accessToken = response.data.accessToken;
//       console.log('@account.ts: fetchMyAccount() because of login');
//       mixpanel.track('Login', { username });
//       await fetchMyAccount();
//     }

//     return response.data;
//   } catch (error: any) {
//     return error?.response?.data;
//   }
// }

// export async function fetchMyAccount() {
//   try {
//     const response = await server.get('/account/me');
//     if (!response.data) return null;
//     useUserStore().id = response.data.id;
//     useUserStore().username = response.data.username;
//     useUserStore().isGuest = response.data.isGuest;
//     useUserStore().portrait = response.data.portrait;
//     useUserStore().games = response.data.games;
//     return response.data;
//   } catch {
//     return null;
//   }
// }

export async function logout() {
  // Clear tokens
  // useTokenStore().clear();
  // useUserStore().clear();

  // Clear the current game
  // useGameStore().clear();
  router.push('/');

  // Force createguest account
  ModalController.open(LoadingModal);
  // await createGuestAccount();
  // ModalController.close();
}

// export async function deleteAccount(password: string) {
//   // Delete account logic
//   try {
//     const response = await server.delete('/account/me', {
//       data: {
//         password
//       }
//     });
//     if (response.status !== HttpStatusCode.Ok) return response.data;
//     return null;
//   } catch (error: any) {
//     return error?.response?.data;
//   }
// }