import {Component, OnInit} from '@angular/core';
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {Task} from "../../../entities/task";
import {Spec} from "../../../entities/spec";
import {GetTaskByIdUseCase} from "../../../uc_layer/database/get-task-by-id.usecase";
import {UpdateTaskUseCase} from "../../../uc_layer/database/update-task.usecase";
import {DeleteTaskUseCase} from "../../../uc_layer/database/delete-task.usecase";
import {UserService} from "../../services/user/user.service";
import {DialogComponent} from "../../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['../create-task-form/create-task-form.component.scss'] // use the same scss since its almost identical page
})
export class TaskDetailComponent implements OnInit {

  constructor(
    public userService: UserService,
    private getWorkersUC: GetWorkersUseCase,
    private getSpecsUC: GetSpecsUseCase,
    private getTaskUC: GetTaskByIdUseCase,
    private updateTaskUC: UpdateTaskUseCase,
    private deleteTaskUC: DeleteTaskUseCase,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    description: [''],
    extraFields: this.fb.array([], Validators.required),
  });
  error: string = "";

  workers: Worker[] = [];
  task: Task | undefined;
  verified: boolean = false;
  specs: Spec[] = [];
  assignedWorkers: string[] = [];
  sidenavDirty: boolean = false; // Control if the sidenav is dirty in order to display error messages

  // Initialize worker and specialization data for worker and spec selectors

  async ngOnInit() {
    this.task = await this.getTaskUC.execute(this.router.url.split('/')[2])
    // split the url by / in order to get the :id part
    if (this.task) {
      this.verified = this.task.verified;
      this.form.patchValue({
        name: this.task.name,
        type: this.task.type,
        date: this.task.date,
        description: this.task.description,
      });
      this.task.extraFields?.forEach(item => this.extraFields.push(this.createFieldWithData(item)));
      this.assignedWorkers = this.task.assignedWorkers;
    }
    else
      await this.router.navigateByUrl("/tasks");  // If for some reason the task doesn't exist, exit to the task list

    this.workers = await this.getWorkersUC.execute(null);
    this.specs = await this.getSpecsUC.execute(null);
  }


  async updateTask() {
    await this.updateTaskUC.execute([this.router.url.split('/')[2],
      {
        name: this.form.value.name,
        date: this.form.value.date,
        type: this.form.value.type,
        verified: this.verified,
        description: this.form.value.description,
        assignedWorkers: this.assignedWorkers,
        extraFields: this.form.value.extraFields
      }
    ]);
    await this.router.navigateByUrl("/tasks");
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "400px",
      data: {
        title: "Eliminar tarea",
        message: "¿Seguro que quieres eliminar esta tarea?",
        confirmText: "Sí",
        cancelText: "No"
      }
    }).afterClosed().subscribe(async (result: any) => {
      if (result) {
        await this.deleteTaskUC.execute(this.router.url.split('/')[2]);
        await this.router.navigateByUrl("/tasks");
      }
    });
  }

  get extraFields(): FormArray {
    return <FormArray> this.form.get("extraFields");
  }

  addField() {
    this.extraFields.push(this.createField());
  }

  private createField() {
    return this.fb.group({ //TODO: mirar si han de ser required
      fieldName: [''],
      fieldValue: ['']
    });
  }

  private createFieldWithData(data: {name: string, value: string}) {
    return this.fb.group(data);
  }

  removeField(i: number) {
    this.extraFields.removeAt(i);
  }
}
