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

  serialize(data: Task): { id: string; name: string; date: string; assignedWorkers: string[]; description: string | undefined; extraFields: {name: string, value: string}[] | undefined; type: string; verified: boolean } {
    return {
      id: data.id,
      name: data.name,
      date: data.date.toISOString(),
      assignedWorkers: data.assignedWorkers,
      description: data.description,
      extraFields: data.extraFields,
      type: data.type,
      verified: data.verified
    }
  }
}
