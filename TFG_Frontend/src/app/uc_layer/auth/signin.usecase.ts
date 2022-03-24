import {UseCaseTemplate} from "../use-case.template";
import {AuthService} from "../../back_layer/services/auth/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SigninUseCase implements UseCaseTemplate<[string, string], Promise<any>> {
  constructor(private auth: AuthService) {
  }

  execute(operator: [string, string]): Promise<any> {
    return this.auth.login(operator[0], operator[1]);
  }
}
