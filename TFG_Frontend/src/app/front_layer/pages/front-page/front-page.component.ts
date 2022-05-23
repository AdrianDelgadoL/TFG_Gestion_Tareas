import {Component, OnInit} from '@angular/core';
import {GetTasksByDateUseCase} from "../../../uc_layer/database/get-tasks-by-date.usecase";
import {Task} from "../../../entities/task";
import {GetTasksUseCase} from "../../../uc_layer/database/get-tasks.usecase";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit{

  constructor(private getTasksByDateUC: GetTasksByDateUseCase,
              private getTasksUC: GetTasksUseCase) { }
  displayedColumns: string[] = ["firstColumn", "secondColumn", "thirdColumn"];
  futureTasks: string[] = [];
  pastTasks: string[] = [];
  dataSource: any[] = [1]; //Force the mat table to show only 1 row.
  tasks: MatTableDataSource<Task> = new MatTableDataSource();

  async ngOnInit() {
    let today = new Date();
    this.futureTasks.push(await this.getTasksByDateUC.execute(today)); //today's tasks
    // Adding 2 instead of 1 is needed because the execution of the usecase substracts 1 day to "today" the first time
    this.futureTasks.push(await this.getTasksByDateUC.execute(new Date(today.setDate(today.getDate()+2)))); //tomorrow's tasks
    this.futureTasks.push(await this.getTasksByDateUC.execute(new Date(today.setDate(today.getDate()+1)))); //after tomorrow's tasks

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    this.pastTasks.push(await this.getTasksByDateUC.execute(yesterday));
    this.pastTasks.push(await this.getTasksByDateUC.execute(yesterday));
    this.pastTasks.push(await this.getTasksByDateUC.execute(yesterday));

    this.tasks = new MatTableDataSource(await this.getTasksUC.execute(null));
    this.tasks.filterPredicate = (data: Task, filter: string) => {
      let workers = data.assignedWorkers.map(worker => worker.name + ' ' + worker.surname)
      return data.type.toLowerCase().includes(filter) || workers.map(worker => worker.toLowerCase().includes(filter)).includes(true);
    };
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.tasks.filter = filterValue.trim().toLowerCase()
  }
}
