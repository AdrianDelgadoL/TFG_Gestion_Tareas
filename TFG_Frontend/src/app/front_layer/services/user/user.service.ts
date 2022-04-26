import { Injectable } from '@angular/core';
import {SignOutUseCase} from "../../../uc_layer/auth/signout.usecase";
import {SigninUseCase} from "../../../uc_layer/auth/signin.usecase";
import {GetUserPermitsUseCase} from "../../../uc_layer/database/get-user-permits.usecase";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private signOutUC: SignOutUseCase,
              private signinUC: SigninUseCase,
              private getUserPermitsUC: GetUserPermitsUseCase
  ) { }

  userId: string = "";
  userPermits: string[] = [];

  async signoutUser() {
    await this.signOutUC.execute(null);
    this.userId = "";
  }

  async signinUser(email: string, password: string) {
    const user = await this.signinUC.execute([email, password]);
    this.userPermits = await this.getUserPermitsUC.execute(user.user.uid);
    this.userId = user.user.uid;
    return user.user.uid;
  }
}
