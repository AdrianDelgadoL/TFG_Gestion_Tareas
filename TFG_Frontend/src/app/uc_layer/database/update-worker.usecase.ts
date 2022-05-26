import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class UpdateWorkerUseCase implements UseCaseTemplate<[string, any], Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: [string, {name: string, surname: string, speciality: string, role: string, platforms: string[]}]): Promise<any> {
    await this.db.updateWorker(operator[0], operator[1]);
  }
}
