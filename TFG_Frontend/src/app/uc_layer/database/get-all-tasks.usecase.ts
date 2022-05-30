import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GetAllTasksUseCase implements UseCaseTemplate<null, Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  execute(operator: null): Promise<any> {
    return this.db.getAllTasks();
  }
}
