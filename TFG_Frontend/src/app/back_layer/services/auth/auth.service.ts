import {Injectable} from '@angular/core';
import {Auth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
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
}
