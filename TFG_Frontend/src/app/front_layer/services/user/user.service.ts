import { Injectable } from '@angular/core';
import {SignOutUseCase} from "../../../uc_layer/auth/signout.usecase";
import {SigninUseCase} from "../../../uc_layer/auth/signin.usecase";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private signOutUC: SignOutUseCase,
              private signinUC: SigninUseCase
  ) { }

  userId: string = "";

  async signoutUser() {
    await this.signOutUC.execute(null);
    this.userId = "";
  }

  async signinUser(email: string, password: string) {
    const user = await this.signinUC.execute([email, password]);
    this.userId = user;
    return user;
  }
}
