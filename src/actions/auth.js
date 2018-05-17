import { firebase, googleAuthProvider, githubAuthProvider } from "../firebase/firebase";
import AuthProvider from './provider.enum';
export const login = (uid) => ({
  type: 'LOGIN',
  uid
})

export const logout = () => ({
  'type': 'LOGOUT'
})

export const startLogin = (authProvider) => {




  return () => {
    let provider = AuthProvider.GOOGLE;
    switch (authProvider) {
      case AuthProvider.GOOGLE:
        provider = googleAuthProvider;
        break;
      case AuthProvider.GITHUB:
        provider = githubAuthProvider;
        break;
      default:
        break;
    }

    return firebase.auth().signInWithPopup(provider);
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}