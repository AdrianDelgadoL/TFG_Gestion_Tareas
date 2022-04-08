import {Component, OnInit} from '@angular/core';
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {Spec} from "../../../entities/spec";
import {GetTaskByIdUseCase} from "../../../uc_layer/database/get-task-by-id.usecase";
import {UpdateTaskUseCase} from "../../../uc_layer/database/update-task.usecase";

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
    private router: Router,
  ) { }
  disabled: boolean = true;
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });
  error: string = "";

  workers: Worker[] = [];
  specs: Spec[] = [];
  assignedWorkers: string[] = [];
  sidenavDirty: boolean = false; // Control if the sidenav is dirty in order to display error messages

  // Initialize worker and specialization data for worker and spec selectors

  ngOnInit() {
    this.getTaskUC.execute(this.router.url.split('/')[2]).then(task => {  // split the url by / in order to get the :id part
      if(task) {
        this.form.setValue({
          name: task.name,
          type: task.type,
          date: task.date,
          description: task.description
        });
        this.assignedWorkers = task.assignedWorkers;
      }
      else
        this.router.navigateByUrl("/tasks");  // If for some reason the task doesn't exist, exit to the task list
    });

    this.getWorkersUC.execute(null).then(r => {
      this.workers = r;
    }).catch(err => {
      console.log("Error ocurred retrieving data " + err);
    });
    this.getSpecsUC.execute(null).then(r => {
      this.specs = r;
    }).catch(err => {
      console.log("Error ocurred retrieving data " + err);
    });

  }

  updateTask() {
    this.updateTaskUC.execute([this.router.url.split('/')[2], this.form.value])  //TODO: arreglar tema datos que se envian, faltan workers y se ha de parsear
  }

}
