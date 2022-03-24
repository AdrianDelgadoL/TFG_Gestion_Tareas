import {Component, Input} from '@angular/core';
import {SigninUseCase} from "../../../uc_layer/auth/signin.usecase";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private signinUC: SigninUseCase) { }

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  @Input() error: string | undefined;

  login() {
    if(this.form.valid) {
      console.log([this.form.value.email, this.form.value.password])
      this.signinUC.execute([this.form.value.email, this.form.value.password]).then(user => {
        if(user)
          console.log("Signed in");
        else
          console.log("Error signin in");
      }).catch(() => {
        this.error = "Email o contraseña inválidos";
    });
    }
  }


}
