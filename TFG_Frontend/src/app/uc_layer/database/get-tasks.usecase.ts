import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";
import {Injectable} from "@angular/core";
import {UserService} from "../../front_layer/services/user/user.service";

@Injectable({
  providedIn: "root"
})
export class GetTasksUseCase implements UseCaseTemplate<null, Promise<any>> {
  constructor(private db: DatabaseService,
              private userService: UserService) {
  }
  execute(operator: null): Promise<any> {
    if(this.userService.userPermits.includes("READ")) {
      return this.db.getTasks(this.userService.userId);
    }
    return this.db.getTasks();
  }
}
