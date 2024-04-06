import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appoinment } from '../../models/appoinment';
import { OutPtPresccripts } from '../../models/out-pt-presccripts';
import { AppoinmentService } from '../../services/appoinment.service';
import { NotifyService } from '../../services/notify.service';
import { OutPtPresccriptsService } from '../../services/out-pt-presccripts.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-outptpresccript',
  templateUrl: './outptpresccript.component.html',
  styleUrls: ['./outptpresccript.component.css']
})
export class OutptpresccriptComponent implements OnInit {
  outPtPresccripts: OutPtPresccripts[] = [];
  appointment: Appoinment[] = [];
  dataSource: MatTableDataSource<OutPtPresccripts> = new MatTableDataSource(this.outPtPresccripts);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id","medicineName", "testName", "instruction", "admitStatus", "appoinmentId","actions"];
  constructor(
    private dataSvc: OutPtPresccriptsService,
    private appSvc: AppoinmentService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: OutPtPresccripts) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(s => {
      if (s) this.dataSvc.deleteOutPtPresccript(Number(item.outptPresccriptId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getAppoinment(id: number) {
    let z = this.appointment.find(c => c.appoinmentId == id);
    return z ? z.appoinmentId : '';
  }
  ngOnInit(): void {
    this.dataSvc.getOutPtPresccripts().
      subscribe(s => {
        this.outPtPresccripts = s;
        console.log(s);
        this.dataSource.data = this.outPtPresccripts;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load department data", "DISMISS");
      });
    this.appSvc.getAppoinments().
      subscribe(x => {
        this.appointment = x;
        console.log(x);
      }, err => { this.notifySvc.fail("Data load failed", "DISMISS") });
  }

}
