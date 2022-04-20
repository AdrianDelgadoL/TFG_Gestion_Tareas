import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GetTasksByDateUseCase implements UseCaseTemplate<Date, Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  execute(operator: Date): Promise<any> {
    return this.db.getTaskByDate(operator);
  }
}
