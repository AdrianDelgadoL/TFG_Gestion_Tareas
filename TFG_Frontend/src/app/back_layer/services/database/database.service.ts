import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query, setDoc,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {Task} from "../../../entities/task";
import {TaskMapper} from "../../mappers/task-mapper";
import {WorkerMapper} from "../../mappers/worker-mapper";
import {Worker} from "../../../entities/worker";
import {SpecMapper} from "../../mappers/spec-mapper";
import {Spec} from "../../../entities/spec";
import {RoleMapper} from "../../mappers/role-mapper";
import {Role} from "../../../entities/role";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: Firestore) { }

  // Task data
  async createTask(docData: {name: string, date: Date, type: string, verified: boolean, assignedWorkers: string[], description: string, extraFields: [] }) {
    await addDoc(collection(this.db, "Tareas"), docData);
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


  async getAllTasks() {
    let taskMapper = new TaskMapper();
    let tasks: Task[] = [];

    const querySnapshot = await getDocs(collection(this.db, "Tareas"));

    querySnapshot.forEach(doc => {
      let workers: Worker[] = []
      doc.data()["assignedWorkers"].forEach((data: string) => {
        this.getWorkerByID(data).then(worker => {
          if(worker) {
            workers.push(worker);
          }
        });
      })
      tasks.push(taskMapper.deserialize(doc.id, doc.data(), workers))
    });
    return tasks
  }

  async getUnverifiedTasks(userid?: string) {
    let taskMapper = new TaskMapper();
    let tasks: Task[] = [];

    const querySnapshot = userid ?
      await getDocs(query(
        collection(this.db, "Tareas"),
        where("assignedWorkers", "array-contains", userid),
        where("verified", "==", false))) :
      await getDocs(query(
        collection(this.db, "Tareas"),
        where("verified", "==", false)));

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
      where("assignedWorkers", "array-contains", userid),
      where("verified", "==", false))
      : query(collection(this.db, "Tareas"),
      where("date", "<=", new Date(date.setDate(date.getDate()))),
      where("date",">=", new Date(date.setDate(date.getDate()-1))),
      where("verified", "==", false),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      tasks.push(doc.data()["name"]);
    });
    return tasks;
  }

  // Workers data
  async createWorker(id: string, data: {email: string, speciality: string, name: string, surname: string, available: boolean, role: string, platforms: string[]}) {
    await setDoc(doc(this.db, "Personal", id), data);
  }

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

  async updateWorker(id: string, data: {name: string, surname: string, speciality: string, role: string, platforms: string[]}) {
    const docRef = doc(this.db, "Personal", id);
    await updateDoc(docRef, data);
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

  async disableWorker(id: string, available: boolean) {
    await updateDoc(doc(this.db, "Personal", id), {
      available: available
    });
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

  // Role data

  async getRoles() {
    let roleMapper = new RoleMapper();
    let roles: Role[] = [];
    const querySnapshot = await getDocs(collection(this.db, "Roles"));
    querySnapshot.forEach(doc => {
      roles.push(roleMapper.deserialize(doc.id, doc.data()));
    });
    return roles;
  }

}
