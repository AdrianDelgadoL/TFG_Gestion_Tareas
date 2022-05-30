import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";

@Injectable({
  providedIn: "root"
})
export class UpdateWorkerUseCase implements UseCaseTemplate<[string, any], Promise<any>> {
  constructor(private db: DatabaseService) {
  }

  async execute(operator: [string, {name: string, surname: string, speciality: string, role: string, platforms: string | []}]): Promise<any> {
    console.log(typeof operator[1].platforms)
    const platforms = typeof operator[1].platforms == "string" ? operator[1].platforms.split(',') : operator[1].platforms
    await this.db.updateWorker(operator[0], {name: operator[1].name, surname: operator[1].surname, speciality: operator[1].speciality, role: operator[1].role, platforms: platforms});
  }
}
