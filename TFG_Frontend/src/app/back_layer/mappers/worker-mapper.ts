import {Worker} from "../../entities/worker";

export class WorkerMapper {
  deserialize(id: string, data: any) {
    return new Worker(
      id,
      data["Nombre"],
      data["Apellidos"],
      data["Especialidad"],
      data["Disponibilidad"],
      data["Rol"],
      data["Email"],
    )
  }
}
