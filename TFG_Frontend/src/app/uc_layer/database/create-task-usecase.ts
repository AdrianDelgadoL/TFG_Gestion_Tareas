import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class CreateTaskUseCase implements UseCaseTemplate< {name: string, date: Date, type: string, verified: boolean, assignedWorkers: string[], description: string, extraFields: [] }, void>{
  constructor(private db: DatabaseService) {
  }

  execute(operator: {name: string, date: Date, type: string, verified: boolean, assignedWorkers: string[], description: string, extraFields: [] }): void {
    this.db.createTask(operator).catch(err => console.log("Error creating task " + err));
  }
}
