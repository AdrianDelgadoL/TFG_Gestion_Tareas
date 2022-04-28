import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class VerifyTaskUseCase implements UseCaseTemplate<string, Promise<void>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: string): Promise<void> {
    await this.db.verifyTask(operator);
  }

}
