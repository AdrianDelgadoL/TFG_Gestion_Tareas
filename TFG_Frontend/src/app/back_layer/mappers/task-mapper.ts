import {Task} from "../../entities/task";

export class TaskMapper {
  deserialize(id: string, data: any, workers: any) {
    return new Task(
      id,
      data["Nombre"],
      data["Fecha de entrega"]?.toDate(),
      data["Tipo de tarea"],
      data["Verificada"],
      workers,
      data["Campos extra"],
    )
  }
}
