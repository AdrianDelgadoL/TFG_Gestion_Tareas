import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
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
  async createTask(docData: {name: string, date: Date, type: string, verified: boolean, assignedWorkers: string[], description: string, extraFields: [] }) {
    const docRef = await addDoc(collection(this.db, "Tareas"), docData);
    console.log("Doc created" + docRef.id);
  }

  async getTaskByID(id: string) {
    let taskMapper = new TaskMapper()
    const docRef = doc(this.db, "Tareas", id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      return taskMapper.deserialize(docSnap.id, docSnap.data(), docSnap.data()["assignedWorkers"]);
    }
    else {
      return null;
    }
  }

  async updateTask(id: string, data: any) {
    const docRef = doc(this.db, "Tareas", id);
    await updateDoc(docRef, data);
  }

  async getTasks(userid?: string) {
    let taskMapper = new TaskMapper();
    let tasks: Task[] = [];

    const querySnapshot = userid ? await getDocs(query(collection(this.db, "Tareas"), where("assignedWorkers", "array-contains", userid))) : await getDocs(collection(this.db, "Tareas"));
    querySnapshot.forEach(doc => {
      let workers: Worker[] = []
      doc.data()["assignedWorkers"].forEach((data: string) => {
        this.getWorkerByID(data).then(worker => {
          if(worker) {
            workers.push(worker);
          }
        });
      })
        tasks.push(taskMapper.deserialize(doc.id, doc.data(), workers));
    });
    return tasks;
  }

  async deleteTask(id: string) {
    return await deleteDoc(doc(this.db, "Tareas", id));
  }

  async verifyTask(id: string) {
    const docRef = doc(this.db, "Tareas", id);
    await updateDoc(docRef, {verified: true});
  }

  async getTaskByDate(date: Date, userid?: string) {
    let tasks: string[] = [];
    // If userid is passed means the user has no permission to see all tasks, so take only the user's tasks.
    const q = userid? query(collection(this.db, "Tareas"),
      where("date", "<=", new Date(date.setDate(date.getDate()))), //Since Firestore saves dates at 00:00
      where("date",">=", new Date(date.setDate(date.getDate()-1))), //To get today's tasks get tasks between yesterday and today
      where("assignedWorker", "array-contains", userid))
      : query(collection(this.db, "Tareas"),
      where("date", "<=", new Date(date.setDate(date.getDate()))),
      where("date",">=", new Date(date.setDate(date.getDate()-1))),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      tasks.push(doc.data()["name"]);
    });
    return tasks;
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

  async getUserPermits(userid: string) {
    let docRef = await doc(this.db, "Personal", userid);

    let docSnap = await getDoc(docRef);
    let role = "";
    if(docSnap.exists()) {
      role = docSnap.data()["role"];
      docRef = await doc(this.db, "Roles", role);
      docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        return docSnap.data()["permits"];
      }
    }
    return null;
  }

  //Spec/Task type data

  async getSpecs() {
    let specMapper = new SpecMapper();
    let specs: Spec[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Especialidades"));
    querySnapshot.forEach(doc => {
      specs.push(specMapper.deserialize(doc.id));
    })
    return specs;
  }

}
