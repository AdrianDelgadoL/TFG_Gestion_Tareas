import {Component, Input} from '@angular/core';
import {SigninUseCase} from "../../../uc_layer/auth/signin.usecase";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private signinUC: SigninUseCase,
              private router: Router,
              ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  @Input() error: string | undefined;

  login() {
    if(this.form.valid) {
      this.signinUC.execute([this.form.value.email, this.form.value.password]).then(user => {
        if(user) {
          this.router.navigateByUrl("/tasks")
            .catch(err => {
              console.log("Error navigating" + err);
              this.router.navigateByUrl("/login")
            });
        }
      }).catch(() => {
        this.error = "Email o contraseña inválidos";
    });
    }
  }


}
