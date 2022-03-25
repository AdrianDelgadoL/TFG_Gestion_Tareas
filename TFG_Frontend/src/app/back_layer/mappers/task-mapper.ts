import {Task} from "../../entities/task";

export class TaskMapper {
  deserialize(id: string, data: any) {
    return new Task(
      id,
      data["Nombre"],
      data["Fecha de entrega"],
      data["Tipo de tarea"],
      data["Verificada"],
      data["Campos extra"]
    )
  }
}
