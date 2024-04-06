import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Departments } from '../../models/departments';
import { Rooms } from '../../models/rooms';
import { DepartmentsService } from '../../services/departments.service';
import { NotifyService } from '../../services/notify.service';
import { RoomsService } from '../../services/rooms.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  room: Rooms[] = [];
  department: Departments[] = [];
  dataSource: MatTableDataSource<Rooms> = new MatTableDataSource(this.room);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["roomId", "roomNo", "roomType", "departmentId", "action"];
  constructor(
    private dataSvc: RoomsService,
    private depSvc:DepartmentsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Rooms) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteRoom(Number(item.roomId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.roomId != x.roomId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  getDepartmentName(id: number) {
    let z = this.department.find(c => c.departmentId == id);
    return z ? z.departmentName : '';
  }

  ngOnInit(): void {

    this.dataSvc.getRooms().subscribe(x => {
      this.room = x;
      console.log(x);
      this.dataSource.data = this.room;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dissmiss");
    });
    this.depSvc.getDepartment().subscribe(x => {
      this.department = x;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dismiss");
    });
  }

}
