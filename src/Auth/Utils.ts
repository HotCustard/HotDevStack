import Auth0Lock from 'auth0-lock';
import authStore from './Store';

const AUTH = 'AUTH'; // Local storage key

export const login = (): void => {

    const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID as string, process.env.AUTH0_DOMAIN as string, { auth: { redirect: false } });

    const showLock = () =>
        new Promise<string>((resolve, reject) => {

            lock.on('hide', () => reject('Lock closed'));

            lock.on('authenticated', (authResult: auth0.Auth0DecodedHash) => {
                lock.getUserInfo(authResult.accessToken as string, (error: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => {
                    if (!error) {
                        lock.hide();
                        resolve(authResult.idToken as string);
                    }
                });
            });

            lock.on('unrecoverable_error', (error) => {
                lock.hide();
                reject(error);
                lock.show();
            });

            lock.show();
        });

    showLock().then(authStore.authenticated);

};

export const getStoredAuthState = (): string => {
    try {
      return localStorage.getItem(AUTH) || '';
    } catch (err) {
      removeStoredAuthState();
      return '';
    }
};

export const setStoredAuthState = (idToken: string): void => {
  localStorage.setItem(AUTH, idToken);
};

export const removeStoredAuthState = (): void => {
  localStorage.removeItem(AUTH);
};
