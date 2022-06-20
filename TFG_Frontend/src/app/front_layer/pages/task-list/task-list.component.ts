import {Component, OnInit, ViewChild} from '@angular/core';
import {GetUnverifiedTasksUseCase} from "../../../uc_layer/database/get-verified-tasks.usecase";
import {Task} from "../../../entities/task";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {DeleteTaskUseCase} from "../../../uc_layer/database/delete-task.usecase";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../dialog/dialog.component";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {VerifyTaskUseCase} from "../../../uc_layer/database/verify-task.usecase";
import {DataExportService} from "../../services/data-export/data-export.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  constructor(
    private getTasksUC: GetUnverifiedTasksUseCase,
    private deleteTaskUC: DeleteTaskUseCase,
    private verifyTaskUC: VerifyTaskUseCase,
    private dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    private dataExport: DataExportService,
  ) { }

  taskList: MatTableDataSource<Task> = new MatTableDataSource();
  displayedColumns = ["name", "date", "assignee", "verify", "edit", "delete"];  // Columns displayed in the task list
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  async ngOnInit() {
    this.taskList = new MatTableDataSource(await this.getTasksUC.execute(null))
    this.taskList.sort = this.sort
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.taskList.filter = filterValue.trim().toLowerCase();
  }

  openDialog(id: number) {
    this.dialog.open(DialogComponent, {
      width: "400px",
      data: {
        title: "Eliminar tarea",
        message: "¿Seguro que quieres eliminar esta tarea?",
        confirmText: "Sí",
        cancelText: "No"
        }
    }).afterClosed().subscribe(async result => {
      if (result) {
        await this.deleteTaskUC.execute(this.taskList.data[id]["id"]);
        this.taskList.data.splice(id, 1);
        this.taskList._updateChangeSubscription(); //Refresh datasource
      }
    });
  }

  async navigateToDetail(id: number) {
    await this.router.navigateByUrl("/tasks/" + this.taskList.data[id]["id"]);
  }

  async markAsVerified(i: number) {
    await this.verifyTaskUC.execute(this.taskList.data[i]["id"]);
    this.taskList.data.splice(i, 1); // Hide verified tasks
    this.taskList._updateChangeSubscription(); //Refresh datasource
  }

  exportData() {
    this.dataExport.exportCsv(this.taskList.data);
  }
}
