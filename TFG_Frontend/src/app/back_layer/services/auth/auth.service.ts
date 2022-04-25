import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async login(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUser() {
    return this.auth.currentUser;
  }

  async signOut(): Promise<any> {
    return signOut(this.auth)
  }
}
