import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {GetUserUseCase} from "../../../uc_layer/auth/get-user.usescase";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private getUserUseCase: GetUserUseCase, private router: Router) {
  }

  async canActivate() {
    const user = await this.getUserUseCase.execute();
    if(!user) {
      return true;
    }
    else
      await this.router.navigateByUrl("/tasks")
      return true;
  }

}
