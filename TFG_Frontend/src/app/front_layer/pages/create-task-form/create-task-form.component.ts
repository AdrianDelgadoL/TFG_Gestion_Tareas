import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Worker} from "../../../entities/worker";
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {GetSpecsUseCase} from "../../../uc_layer/database/get-specs.usecase";
import {Spec} from "../../../entities/spec";
import {CreateTaskUseCase} from "../../../uc_layer/database/create-task-usecase";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-create-task-form',
  templateUrl: './create-task-form.component.html',
  styleUrls: ['./create-task-form.component.scss']
})
export class CreateTaskFormComponent implements OnInit {

  constructor(
    public userService: UserService,
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
    extraFields: this.fb.array([])
  });

  error: string = "";

  workers: Worker[] = []; //Source worker data array, used to filter
  filteredWorkers: Worker[] = []; //Shown workers in the UI, takes source data and filters it.
  specs: Spec[] = [];
  assignedWorkers: Worker[] = []; //assigned workers to the task
  selectedSpec: string = "";
  color: string = ""; // color for workers button

  // Initialize worker and specialization data for worker and spec selectors

  async ngOnInit() {
    this.workers = await this.getWorkersUC.execute(null);
    this.filteredWorkers = this.workers = this.workers.filter(worker => worker.available)
    this.specs = await this.getSpecsUC.execute(null);
  }

  async createTask() {
    if(this.form.valid && this.assignedWorkers.length > 0){
      await this.createTaskUC.execute({
        name: this.form.value.name,
        date: this.form.value.date,
        type: this.form.value.type,
        verified: false,
        description: this.form.value.description,
        assignedWorkers: this.assignedWorkers.map(worker => worker.id),
        extraFields: this.form.value.extraFields,
      });
      this.router.navigateByUrl("tasks").catch(err => "Error in navigation " + err);
    }
    else {
      this.error = "Completa los campos marcados";
      this.form.markAllAsTouched();
      if(this.assignedWorkers.length < 1) {
        this.color = "warn"
      }
    }
  }

  get extraFields(): FormArray {
    return <FormArray> this.form.get("extraFields");
  }

  addField() {
    this.extraFields.push(this.createField('', ''));
  }

  private createField(name: string, value: string) {
    return this.fb.group({
      fieldName: [name],
      fieldValue: [value]
    })
  }

  removeField(i: number) {
    this.extraFields.removeAt(i);
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.filteredWorkers = this.workers.filter(worker => worker.spec.includes(filterValue));
  }

  onTypeChange($event: any) {
    if($event.isUserInput) {
      if(this.selectedSpec) {
        for (let i in this.specs.filter(spec => spec.id == this.selectedSpec)[0]["fields"]) {
          this.removeField(0);
        }
      }
      this.selectedSpec = $event.source.value;
      const fields = this.specs.filter(spec => spec.id == this.selectedSpec)[0]["fields"]; //Get the mandatory fields from the selected task type
      for (let field of fields) {
        this.extraFields.insert(0, this.createField(field, ''))
      }
    }
  }
}
