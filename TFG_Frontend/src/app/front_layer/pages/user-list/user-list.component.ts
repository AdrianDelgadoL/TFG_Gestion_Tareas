import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Worker} from "../../../entities/worker";
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {DisableWorkerUseCase} from "../../../uc_layer/database/disable-worker.usecase";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private getWorkersUC: GetWorkersUseCase,
              private disableWorkerUC: DisableWorkerUseCase,
              public userService: UserService,
              private dialog: MatDialog,
              private router: Router) { }

  userList: MatTableDataSource<Worker> = new MatTableDataSource()
  displayedColumns: string[] = ["name", "surname", "available", "spec", "edit", "contact", "delete"];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.getWorkersUC.execute(null).then(r => {
      this.userList = new MatTableDataSource(r);
      this.userList.sort = this.sort;
    }).catch(error => console.log(error));
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.userList.filter = filterValue.trim().toLowerCase();
  }

  async navigateToDetail(j: number) {
    try {
      await this.router.navigateByUrl("/users/" + this.userList.data[j].id);
    } catch(e) {
      console.log(e);
    }
  }

  async disableWorker(j: number) {
    try {
      await this.disableWorkerUC.execute([this.userList.data[j].id, !this.userList.data[j].available]);
      this.userList.data[j].available = !this.userList.data[j].available
    } catch (e) {
      console.log(e)
    }
  }
}
