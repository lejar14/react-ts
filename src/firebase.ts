import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyCiNYHoBXC4FFdL-BjGwhycIFVejeEQjC0",
        authDomain: "login-tsx.firebaseapp.com",
        projectId: "login-tsx",
        storageBucket: "login-tsx.appspot.com",
        messagingSenderId: "167374943964",
        appId: "1:167374943964:web:b7d2060f137e0e717ce619"
};

firebase.initializeApp(firebaseConfig);
type UserCredential = firebase.auth.UserCredential;
const Persistence = firebase.auth.Auth.Persistence;
export interface User extends firebase.User {};

export const createUserWithEmailAndPassword = async (email: string, password: string, callback: (response?: UserCredential, err?: Error) => void): Promise<void> => {
        try {
          const res: UserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
          callback(res);
        } catch (e) {
          callback(undefined, e);
        }
      };

export const signInWithEmailAndPassword =  async (email: string, password: string, rememberMe: boolean, callback: (response?: UserCredential, err?: Error) => void): Promise<void> => {
const persistence = rememberMe ? Persistence.LOCAL : Persistence.SESSION;
        try {
          await firebase.auth().setPersistence(persistence);
          const res: UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
          callback(res);
        } catch (e) {
          callback(undefined, e);
        }
      };


      export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('');

export const signInWithGoogle = async (callback: (err?: Error) => void): Promise<void> => {
  try {
    await firebase.auth().signInWithRedirect(provider);
    callback();
  } catch (e) {
    callback(e);
  }
};

