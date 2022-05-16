import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class DisableWorkerUseCase implements UseCaseTemplate<[string, boolean], Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: [string, boolean]): Promise<any> {
    await this.db.disableWorker(operator[0], operator[1]);
  }

}
