import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {GetRolesUseCase} from "../../../uc_layer/database/get-roles.usecase";
import {Spec} from "../../../entities/spec";
import {Role} from "../../../entities/role";
import {CreateUserUseCase} from "../../../uc_layer/auth/create-user.usecase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private getRolesUC: GetRolesUseCase,
              private getSpecsUC: GetSpecsUseCase,
              private createUserUC: CreateUserUseCase,
              private router: Router) { }

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    spec: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  specs: Spec[] = [];
  roles: Role[] = []

  error?: string;

  async createUser() {
    if(this.form.valid) {
      try {
        await this.createUserUC.execute(this.form.value);
        await this.router.navigateByUrl("/users");
      } catch (e) {
        console.log(e);
        this.error = "Ha ocurrido un error. Comprueba si el correo ya está en uso"
      }
    }
    else {
      this.form.markAllAsTouched();
      this.error = "Rellena los campos marcados";
    }
  }

  async ngOnInit() {
    this.specs = await this.getSpecsUC.execute(null);
    this.roles = await this.getRolesUC.execute(null);
  }
}
