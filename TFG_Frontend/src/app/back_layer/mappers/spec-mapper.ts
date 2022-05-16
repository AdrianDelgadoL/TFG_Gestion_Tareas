import {Spec} from "../../entities/spec";

export class SpecMapper {
  deserialize(id: string, data: any) {
    return new Spec(
      id,
      data["mandatoryFields"]
    )
  }
}
