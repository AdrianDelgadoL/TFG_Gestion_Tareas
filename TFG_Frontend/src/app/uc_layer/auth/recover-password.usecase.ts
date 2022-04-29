import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {AuthService} from "../../back_layer/services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class RecoverPasswordUseCase implements UseCaseTemplate<string, Promise<any>> {
  constructor(private auth: AuthService) {
  }

  async execute(operator: string): Promise<any> {
    await this.auth.recoverPassword(operator);
  }


}
