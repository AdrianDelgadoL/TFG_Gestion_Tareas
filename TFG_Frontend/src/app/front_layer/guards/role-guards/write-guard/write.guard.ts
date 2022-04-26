import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {UserService} from "../../../services/user/user.service";

@Injectable({
  providedIn: 'root'
})
export class WriteGuard implements CanActivate {
  constructor(private userService: UserService) {
  }
  canActivate() {
    return this.userService.userPermits.includes("WRITE"); // Lets the user create new tasks or users
  }

}
