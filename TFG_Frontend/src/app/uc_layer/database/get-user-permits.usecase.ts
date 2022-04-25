import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class GetUserPermitsUseCase implements UseCaseTemplate<string, Promise<any>>{
  constructor(private db: DatabaseService) {
  }
  execute(operator: string): Promise<any> {
    return this.db.getUserPermits(operator);
  }

}
