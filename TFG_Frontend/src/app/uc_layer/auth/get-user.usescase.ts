import {Injectable} from "@angular/core";
import {UseCaseTemplate} from "../use-case.template";
import {AuthService} from "../../back_layer/services/auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class GetUserUseCase implements UseCaseTemplate<null, any>{
  constructor(private auth: AuthService) {
  }
  async execute(operator: null): Promise<any> {
    return await this.auth.getUser();
  }
}
