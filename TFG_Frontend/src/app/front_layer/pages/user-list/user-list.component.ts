import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Worker} from "../../../entities/worker";
import {GetWorkersUseCase} from "../../../uc_layer/database/get-workers.usecase";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private getWorkersUC: GetWorkersUseCase,
              public userService: UserService) { }

  userList: MatTableDataSource<Worker> = new MatTableDataSource()
  displayedColumns: string[] = ["name", "surname", "available", "spec", "contact"];
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

}
