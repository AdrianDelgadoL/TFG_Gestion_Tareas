import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class UpdateTaskUseCase implements UseCaseTemplate<[string, any], void> {
  constructor(private db: DatabaseService) {
  }

  execute(operator: [string, any]): void {
    this.db.updateTask(operator[0], operator[1]).catch(err => {console.log("Error updating task " + err)});
  }

}
