import {Task} from "../../entities/task";

export class TaskMapper {
  deserialize(id: string, data: any, workers: any) {
    return new Task(
      id,
      data["name"],
      data["date"]?.toDate(),
      data["type"],
      data["verified"],
      workers,
      data["description"],
      data["extraFields"],
    )
  }
}
