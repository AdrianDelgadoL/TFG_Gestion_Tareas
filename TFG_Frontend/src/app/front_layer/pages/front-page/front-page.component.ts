import {Component, OnInit} from '@angular/core';
import {GetTasksByDateUseCase} from "../../../uc_layer/database/get-tasks-by-date.usecase";

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent implements OnInit{

  constructor(private getTasksByDateUC: GetTasksByDateUseCase) { }
  displayedColumns: string[] = ["today", "tomorrow", "afterTomorrow"];
  futureTasks: string[] = [];
  pastTasks: string[] = [];
  dataSource: any[] = [1]; //Force the mat table to show only 1 row.

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
    console.log(this.pastTasks);
  }
}
