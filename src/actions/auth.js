import database, { firebase, googleAuthProvider, githubAuthProvider } from "../firebase/firebase";
import AuthProvider from './provider.enum';
export const login = (userData) => ({
  type: 'LOGIN',
  userData: {
    accessToken: userData.accessToken,
    displayName: userData.displayName,
    photoURL: userData.photoURL,
    username: userData.username,
    uid: userData.uid
  }
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

    return firebase.auth().signInWithPopup(provider).then((response) => {
      console.log(JSON.stringify(response, null, 4));
      const { user, credential, additionalUserInfo } = response;
      // console.log(response)
      database.ref(`/users/${user.uid}`).update({
        displayName: user.displayName,
        photoURL: user.providerData[0].photoURL,
        accessToken: credential.accessToken,
        username: additionalUserInfo.username
      })
    });
  }
}

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}