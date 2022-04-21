import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
    private fb: FormBuilder,
    ) { }

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    date: ['', Validators.required],
    description: [''],
    extraFields: this.fb.array([], Validators.required)
  });

  error: string = "";

  workers: Worker[] = [];
  specs: Spec[] = [];
  assignedWorkers: string[] = [];
  sidenavDirty: boolean = false; // Control if the sidenav is dirty in order to display error messages

  // Initialize worker and specialization data for worker and spec selectors
  async ngOnInit() {
    this.workers = await this.getWorkersUC.execute(null);
    this.specs = await this.getSpecsUC.execute(null);
  }

  createTask() {
    if(this.form.valid && this.assignedWorkers.length > 0){
      this.createTaskUC.execute({
        name: this.form.value.name,
        date: this.form.value.date,
        type: this.form.value.type,
        verified: false,
        description: this.form.value.description,
        assignedWorkers: this.assignedWorkers,
        extraFields: this.form.value.extraFields,
      });
      this.router.navigateByUrl("tasks").catch(err => "Error in navigation " + err);
    }
    else {
      this.error = "Completa los campos marcados";
      this.form.markAllAsTouched();
      this.sidenavDirty = true;
    }
  }

  get extraFields(): FormArray {
    return <FormArray> this.form.get("extraFields");
  }

  addField() {
    this.extraFields.push(this.createField());
  }

  private createField() {
    return this.fb.group({
      fieldName: [''],
      fieldValue: ['']
    })
  }
}
