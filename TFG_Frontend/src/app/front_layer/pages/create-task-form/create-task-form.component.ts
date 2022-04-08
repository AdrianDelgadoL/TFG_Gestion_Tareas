import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Spec} from "../../../entities/spec";
import {CreateTaskUseCase} from "../../../uc_layer/database/create-task-usecase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {

  constructor(
    private getWorkersUC: GetWorkersUseCase,
    private getSpecsUC: GetSpecsUseCase,
    private createTaskUC: CreateTaskUseCase,
    private router: Router,
    ) { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })
  error: string = "";

  workers: Worker[] = [];
  specs: Spec[] = [];
  assignedWorkers: string[] = [];
  sidenavDirty: boolean = false; // Control if the sidenav is dirty in order to display error messages
  colour: string | null = null;
  // Initialize worker and specialization data for worker and spec selectors
  ngOnInit() {
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

  createTask() {
    if(this.form.valid && this.assignedWorkers.length > 0){
      console.log("Create task")
      this.createTaskUC.execute({
        name: this.form.value.name,
        date: this.form.value.date,
        type: this.form.value.type,
        verified: false,
        description: this.form.value.description,
        assignedWorkers: this.assignedWorkers,
        extraFields: [], //TODO: Extra fields must be implemented
      });
      this.router.navigateByUrl("tasks").catch(err => "Error in navigation " + err);
    }
    else {
      this.error = "Completa los campos marcados";
      this.form.markAllAsTouched();
      this.sidenavDirty = true;
      this.colour = "warn";
    }
  }

}
