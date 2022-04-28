import {Spec} from "../../entities/spec";

export class SpecMapper {
  deserialize(id: string) {
    return new Spec(
      id
    )
  }
}
