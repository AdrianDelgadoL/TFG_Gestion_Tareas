import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";
import {Injectable} from "@angular/core";
import {UserService} from "../../front_layer/services/user/user.service";

@Injectable({
  providedIn: "root"
})
export class GetTasksByDateUseCase implements UseCaseTemplate<Date, Promise<any>> {
  constructor(private db: DatabaseService,
              private userService: UserService) {
  }

  execute(operator: Date): Promise<any> {
    if(this.userService.userPermits.includes('READ')) {
      return this.db.getTaskByDate(operator, this.userService.userId);
    }
    return this.db.getTaskByDate(operator);
  }
}
