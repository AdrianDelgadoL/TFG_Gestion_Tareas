import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTasksUseCase} from "../../../uc_layer/database/get-tasks.usecase";
import {Task} from "../../../entities/task";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {DeleteTaskUseCase} from "../../../uc_layer/database/delete-task.usecase";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  constructor(private getTasksUC: GetTasksUseCase, private deleteTaskUC: DeleteTaskUseCase) { }

  taskList: MatTableDataSource<Task> = new MatTableDataSource();
  displayedColumns = ["name", "date", "assignee", "delete"];  // Columns displayed in the task list
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getTasksUC.execute(null).then(r => {
      this.taskList = new MatTableDataSource(r)
      this.taskList.sort = this.sort
    });
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.taskList.filter = filterValue.trim().toLowerCase();
  }

  deleteTask(id: number) {
    this.deleteTaskUC.execute(this.taskList.data[id]["id"]);
    this.taskList.data.splice(id, 1);
    this.taskList._updateChangeSubscription(); //Refresh datasource
  }

}
