import {Injectable} from '@angular/core';
import {collection, deleteDoc, doc, Firestore, getDoc, getDocs} from "@angular/fire/firestore";
import {Task} from "../../../entities/task";
import {TaskMapper} from "../../mappers/task-mapper";
import {WorkerMapper} from "../../mappers/worker-mapper";
import {Worker} from "../../../entities/worker";
import {SpecMapper} from "../../mappers/spec-mapper";
import {Spec} from "../../../entities/spec";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: Firestore) { }

  // Task data
  async getTasks() {
    let taskMapper = new TaskMapper();
    let tasks: Task[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Tareas"));
    querySnapshot.forEach(doc => {
      let workers: Worker[] = []
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

  async deleteTask(id: string) {
    return await deleteDoc(doc(this.db, "Tareas", id));
  }

  // Workers data
  async getWorkers() {
    let workerMapper = new WorkerMapper();
    let workers: Worker[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Personal"));
    querySnapshot.forEach(doc => {
      workers.push(workerMapper.deserialize(doc.id, doc.data()));
    });
    return workers;
  }

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

  //Spec/Task type data

  async getSpecs() {
    let specMapper = new SpecMapper();
    let specs: Spec[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Especialidades"));
    querySnapshot.forEach(doc => {
      specs.push(specMapper.deserialize(doc.id, doc.data()));
    })
    return specs;
  }

}
