import {Injectable} from '@angular/core';
import {collection, doc, Firestore, getDoc, getDocs} from "@angular/fire/firestore";
import {Task} from "../../../entities/task";
import {TaskMapper} from "../../mappers/task-mapper";
import {WorkerMapper} from "../../mappers/worker-mapper";
import {Worker} from "../../../entities/worker";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: Firestore) { }

  async getTasks() {
    let taskMapper = new TaskMapper();
    let tasks: Task[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Tareas"));
    querySnapshot.forEach(doc => {
      let workers: Worker[] = []
      console.log(doc.data()["Asignacion"])
      if(doc.data()["Asignacion"]){
        doc.data()["Asignacion"].forEach((data: string) => {
          this.getWorkerByID(data).then(r => {
            if (r != null) workers.push(r)
          })
        })

      }
      tasks.push(taskMapper.deserialize(doc.id, doc.data(), workers))
    })
    return tasks
  }

  async getWorkers() {}

  async getWorkerByID(id: string) {
    let workerMapper = new WorkerMapper()
    const docRef = doc(this.db, "Personal", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return workerMapper.deserialize(docSnap.id, docSnap.data())
    }
    else {
      return null;
    }
  }

}
