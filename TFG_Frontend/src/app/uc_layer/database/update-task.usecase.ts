import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class UpdateTaskUseCase implements UseCaseTemplate<[string, any], Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: [string, {name: string, date: Date, type: string, verified: boolean, assignedWorkers: string[], description: string, extraFields: [] }]): Promise<any> {
    await this.db.updateTask(operator[0], operator[1]);
  }

}
