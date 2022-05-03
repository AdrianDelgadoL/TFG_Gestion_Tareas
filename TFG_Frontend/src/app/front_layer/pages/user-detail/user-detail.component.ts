import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GetWorkerByIdUseCase} from "../../../uc_layer/database/get-worker-by-id.usecase";
import {Worker} from "../../../entities/worker";
import {Spec} from "../../../entities/spec";
import {Role} from "../../../entities/role";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {GetRolesUseCase} from "../../../uc_layer/database/get-roles.usecase";
import {UserService} from "../../services/user/user.service";
import {DeleteWorkerUseCase} from "../../../uc_layer/database/delete-worker.usecase";
import {UpdateWorkerUseCase} from "../../../uc_layer/database/update-worker.usecase";
import {DialogComponent} from "../../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../create-user-form/create-user-form.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private router: Router,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private getWorkerUC: GetWorkerByIdUseCase,
              private getSpecsUC: GetSpecsUseCase,
              private getRolesUC: GetRolesUseCase,
              private deleteWorkerUC: DeleteWorkerUseCase,
              private updateWorkerUC: UpdateWorkerUseCase,
              public userService: UserService) { }

  worker?: Worker;
  id: string = ""
  error?: string;

  specs: Spec[] = [];
  roles: Role[] = [];

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    spec: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  async ngOnInit() {
    this.id = this.router.url.split('/')[2];
    this.worker = await this.getWorkerUC.execute(this.id);
    if(this.worker) {
      this.specs = await this.getSpecsUC.execute(null);
      this.roles = await this.getRolesUC.execute(null);
      this.form.patchValue({
        name: this.worker.name,
        surname: this.worker.surname,
        spec: this.worker.spec,
        role: this.worker.role,
        email: this.worker.email,
      });
    }
    else {
      await this.router.navigateByUrl("/users");
    }
  }

  async updateUser() {
    await this.updateWorkerUC.execute([this.id,
      {
        name: this.form.value.name,
        surname: this.form.value.surname,
        speciality: this.form.value.spec,
        role: this.form.value.role,
        email: this.form.value.email,

      }]);
    await this.router.navigateByUrl("/users");
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "400px",
      data: {
        title: "Eliminar tarea",
        message: "¿Seguro que quieres eliminar este usuario?",
        confirmText: "Sí",
        cancelText: "No"
      }
    }).afterClosed().subscribe(async result => {
      if (result) {
        await this.deleteWorkerUC.execute(this.id);
        await this.router.navigateByUrl("/users");
      }
    });
  }

}
