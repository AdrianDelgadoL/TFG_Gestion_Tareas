import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecoverPasswordUseCase} from "../../../uc_layer/auth/recover-password.usecase";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RestorePasswordComponent {

  constructor(private fb: FormBuilder,
              private recoverPasswordUC: RecoverPasswordUseCase) { }

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });
  error?: string

  async sendRecoverEmail() {
    if(this.form.valid) {
      try {
        await this.recoverPasswordUC.execute(this.form.get("email")?.value);
      } catch(e) {
        this.error = "Correo no válido"
      }
    }
    else {
      this.error = "Correo no válido"
    }
  }

}
