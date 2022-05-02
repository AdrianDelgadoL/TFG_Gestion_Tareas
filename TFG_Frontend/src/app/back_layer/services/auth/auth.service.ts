import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUser() {
    return this.auth.currentUser;
  }

  async signOut() {
    await signOut(this.auth)
  }

  async recoverPassword(email: string) {
    await sendPasswordResetEmail(this.auth, email);
  }

  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
