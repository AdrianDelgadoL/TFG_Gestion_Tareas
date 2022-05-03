import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class DeleteWorkerUseCase implements UseCaseTemplate<string, Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: string): Promise<any> {
    await this.db.deleteWorker(operator); //TODO: Deberia eliminarse el usuario por Auth pero se necesita un back o Cloud Functions
  }

}
