import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../../back_layer/services/database/database.service";
import {GetTasksUseCase} from "../../../uc_layer/database/get-tasks.usecase";
import {Task} from "../../../entities/task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  constructor(private getTasks: GetTasksUseCase) { }

  taskList: Array<Task> = [];

  ngOnInit(): void {
    this.getTasks.execute(null).then(r => this.taskList = r);
  }

}
