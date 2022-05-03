import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {DatabaseService} from "../../back_layer/services/database/database.service";
import {AuthService} from "../../back_layer/services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class CreateUserUseCase implements UseCaseTemplate<{ email: string, password: string, spec: string, name: string, surname: string, role: string }, Promise<any>> {
  constructor(private db: DatabaseService,
              private auth: AuthService) {
  }

  async execute(operator: { email: string; password: string; spec: string; name: string; surname: string, role: string }): Promise<any> {
    const user = await this.auth.registerUser(operator.email, operator.password);
    await this.db.createWorker(user.user.uid, {email: operator.email, speciality: operator.spec, name: operator.name, surname: operator.surname, available: true, role: operator.role});
  }

}
