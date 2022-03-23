import { Component } from '@angular/core';
import {AuthService} from "../../../back_layer/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  user = {
    email: '',
    password: ''
  };

  login() {
    this.auth.login(this.user.email, this.user.password)
  }


}
