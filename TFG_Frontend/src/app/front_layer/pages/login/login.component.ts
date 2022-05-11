import {Component} from '@angular/core';
import {SigninUseCase} from "../../../uc_layer/auth/signin.usecase";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private signinUC: SigninUseCase,
              private router: Router,
              private userService: UserService,
              ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  error: string | undefined;

  async login() {
    if(this.form.valid) {
      try {
        const user = await this.userService.signinUser(this.form.value.email, this.form.value.password);
        if (user) {
          await this.router.navigateByUrl("/frontPage");
        }
      } catch(e) {
        console.log(e);
        this.error = "Correo o contraseña inválidos";
      }
    }
    else {
      this.error = "Error en el formulario"
    }
  }


}
