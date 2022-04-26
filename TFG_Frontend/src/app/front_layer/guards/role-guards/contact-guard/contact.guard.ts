import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ContactGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {}
  async canActivate() {
    if(!this.userService.userPermits.includes("CONTACT")) {
      await this.router.navigateByUrl("/tasks");
      return false;
    } //Lets the user enter the workerList page and contact any of them
    return true;
  }

}
