import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SignOutUseCase} from "../../uc_layer/auth/signout.usecase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public signoutUC: SignOutUseCase,
              private router: Router
              ) {}

  signOut() {
    this.signoutUC.execute().then(() => {
      this.router.navigateByUrl("/login")
    })
  }
}
