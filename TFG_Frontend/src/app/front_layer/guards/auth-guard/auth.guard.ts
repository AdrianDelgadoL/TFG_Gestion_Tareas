import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {GetUserUseCase} from "../../../uc_layer/auth/get-user.usescase";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private getUserUC: GetUserUseCase, private router: Router) {
  }

  async canActivate() {
    const user = await this.getUserUC.execute(null);
    if(!user) {
      await this.router.navigateByUrl("/login");
      return false;
    }
    else
      return true;
  }

}
