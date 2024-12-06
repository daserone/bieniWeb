import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCovYlpDIykqUTqwBq1RZ6fLkgmIQemRdU",
  authDomain: "bieni-latam.firebaseapp.com",
  projectId: "bieni-latam",
  storageBucket: "bieni-latam.firebasestorage.app",
  messagingSenderId: "212290866460",
  appId: "1:212290866460:web:fee41f7b7a563b17567ed9",
  measurementId: "G-80C9V5WZ3Z",
};

interface IGoogleSignInData {
  email: string;
  avatar: string;
}

export class FirebaseService {
  private static _instance: FirebaseService;
  private auth: Auth;
  private constructor() {
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
  }

  public static get instance(): FirebaseService {
    if (!this._instance) {
      this._instance = new FirebaseService();
    }
    return this._instance;
  }

  public async googleSignIn(): Promise<IGoogleSignInData> {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential ? credential.accessToken : null;
      // The signed-in user info.
      const user = result.user;
      return {
        email: user.email || "",
        avatar: user.photoURL || "",
      };
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      console.log(errorCode, errorMessage, email, credential);

      return {
        email: "",
        avatar: "",
      };
    }
  }

  public async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  }

  public async getFCMToken(): Promise<string | undefined> {
    return undefined;
  }
}
