import {Component, OnInit} from '@angular/core';
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {Task} from "../../../entities/task";
import {Spec} from "../../../entities/spec";
import {GetTaskByIdUseCase} from "../../../uc_layer/database/get-task-by-id.usecase";
import {UpdateTaskUseCase} from "../../../uc_layer/database/update-task.usecase";
import {DeleteTaskUseCase} from "../../../uc_layer/database/delete-task.usecase";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  constructor(
    private getWorkersUC: GetWorkersUseCase,
    private getSpecsUC: GetSpecsUseCase,
    private getTaskUC: GetTaskByIdUseCase,
    private updateTaskUC: UpdateTaskUseCase,
    private deleteTaskUC: DeleteTaskUseCase,
    private router: Router,
  ) { }
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('')
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
      this.form.setValue({
        name: this.task.name,
        type: this.task.type,
        date: this.task.date,
        description: this.task.description
      });
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
          extraFields: [], //TODO: Extra fields must be implemented
        }
      ]);
    await this.router.navigateByUrl("/tasks");
  }

  deleteTask() {
    this.deleteTaskUC.execute(this.router.url.split('/')[2]).catch(err => console.log("Error deleting task " + err));
    this.router.navigateByUrl("/tasks");
  }
}
