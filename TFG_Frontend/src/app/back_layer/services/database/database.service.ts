import {Injectable} from '@angular/core';
import {collection, Firestore, getDocs} from "@angular/fire/firestore";
import {Task} from "../../../entities/task";
import {TaskMapper} from "../../mappers/task-mapper";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: Firestore) { }
  mapper = new TaskMapper();
  tasks: Task[] = [];
  async getTasks() {
    const querySnapshot = await getDocs(collection(this.db, "Tareas"));
    querySnapshot.forEach(doc => {
      console.log(doc.data())
      this.tasks.push(this.mapper.deserialize(doc.id, doc.data()))
    })
    return this.tasks
  }

}
