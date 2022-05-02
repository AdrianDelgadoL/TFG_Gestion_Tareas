import {Role} from "../../entities/role";

export class RoleMapper {
  deserialize(id: string, data: any) {
    return new Role(
      id,
      data["permits"],
    )
  }
}
