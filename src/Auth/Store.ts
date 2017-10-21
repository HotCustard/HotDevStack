import { observable, action, computed } from 'mobx';
import { getStoredAuthState, setStoredAuthState } from './Utils';

class AuthStore {

  @observable idToken?: string;

  @computed get isAuthenticated() {
    return this.idToken !== undefined && this.idToken !== '';
  }

  @action authenticated = (idToken: string): void => {
    this.idToken = idToken;
    setStoredAuthState(idToken);
  }

}

const authStore = new AuthStore();
authStore.idToken = getStoredAuthState();

export default authStore;
