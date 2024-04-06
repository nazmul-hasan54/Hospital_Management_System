import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beds } from '../../models/beds';
import { Rooms } from '../../models/rooms';
import { BedsService } from '../../services/beds.service';
import { NotifyService } from '../../services/notify.service';
import { RoomsService } from '../../services/rooms.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.css']
})
export class BedsComponent implements OnInit {
  bed: Beds[] = [];
  room: Rooms[] = [];
  dataSource: MatTableDataSource<Beds> = new MatTableDataSource(this.bed);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["bedNo", "bedType", "bedCharge", "roomId", "action"];
  constructor(
    private bedSvc: BedsService,
    private roomSvc: RoomsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Beds) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.bedSvc.deleteBed(Number(item.bedId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.bedId != x.bedId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getRoomNumber(id: number) {
    let z = this.room.find(c => c.roomId == id);
    return z ? z.roomNo : '';
  }

  ngOnInit(): void {
    this.bedSvc.getBeds().subscribe(x => {
      this.bed = x;
      console.log(x);
      this.dataSource.data = this.bed;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dissmiss");
    });
    this.roomSvc.getRooms().subscribe(x => {
      this.room = x;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dismiss");
    });
  }

}
