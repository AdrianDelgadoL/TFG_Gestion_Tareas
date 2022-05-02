import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class GetRolesUseCase implements UseCaseTemplate<null, Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  execute(operator: null): Promise<any> {
    return this.db.getRoles();
  }
}
