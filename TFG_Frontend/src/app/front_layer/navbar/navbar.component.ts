import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router,
              public userService: UserService,
              ) {}

  signOut() {
    this.userService.signoutUser().then(()=> {
      console.log("loging out");
      this.router.navigateByUrl("/login").catch(err => {
        console.log("Error navigating " + err);
      });
    });
  }
}
