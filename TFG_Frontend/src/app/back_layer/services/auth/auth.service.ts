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

  async getUser() {
    return this.auth.currentUser;
  }

  signOut(): Promise<any> {
    return signOut(this.auth).then(() => {
      console.log("Signed out");
    })
      .catch(err => {
        console.log("error in sign out " + err);
      })
  }
}
