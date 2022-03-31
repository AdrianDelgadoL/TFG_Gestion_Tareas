import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Spec} from "../../../entities/spec";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {

  constructor(
    private getWorkersUC: GetWorkersUseCase,
    private getSpecsUC: GetSpecsUseCase,
    ) { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    spec: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })
  @Input() error: ValidationErrors | null = null;

  workers: Worker[] = [];
  specs: Spec[] = [];

  // Initialize worker and specialization data for worker and spec selectors
  ngOnInit() {
    this.getWorkersUC.execute(null).then(r => {
      this.workers = r;
    }).catch(err => {
      console.log("Error ocurred retrieving data" + err);
    });
    this.getSpecsUC.execute(null).then(r => {
      this.specs = r;
      console.log(r)
    }).catch(err => {
      console.log("Error ocurred retrieving data" + err);
    });

  }

  createTask() {
    if(this.form.valid){
      console.log("Create task")
    }
    else
      this.error = this.form.errors;
    console.log(this.specs);
    console.log(this.workers);
  }

}
