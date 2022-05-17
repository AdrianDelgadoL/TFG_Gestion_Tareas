import {Worker} from "../../entities/worker";

export class WorkerMapper {
  deserialize(id: string, data: any) {
    return new Worker(
      id,
      data["name"],
      data["surname"],
      data["speciality"],
      data["available"],
      data["role"],
      data["email"],
      data["platforms"],
    )
  }
}
