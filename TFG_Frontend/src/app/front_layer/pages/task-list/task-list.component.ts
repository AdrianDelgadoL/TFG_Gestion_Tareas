import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTasksUseCase} from "../../../uc_layer/database/get-tasks.usecase";
import {Task} from "../../../entities/task";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  constructor(private getTasks: GetTasksUseCase) { }

  taskList: MatTableDataSource<Task> = new MatTableDataSource();
  displayedColumns = ["name", "date", "assignee"];  // Columns displayed in the task list
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTasks.execute(null).then(r => {
      this.taskList = new MatTableDataSource(r)
      this.taskList.sort = this.sort
    });
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.taskList.filter = filterValue.trim().toLowerCase();
  }

}
