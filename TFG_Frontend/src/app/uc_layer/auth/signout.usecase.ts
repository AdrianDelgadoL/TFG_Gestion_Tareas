import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {AuthService} from "../../back_layer/services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class SignOutUseCase implements UseCaseTemplate<null, Promise<any>> {
  constructor(private auth: AuthService) {
  }

  execute(operator: null): Promise<any> {
    return this.auth.signOut();
  }
}
