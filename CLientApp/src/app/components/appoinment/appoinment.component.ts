import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Appoinment } from '../../models/appoinment';
import { Doctors } from '../../models/doctors';
import { AppoinmentService } from '../../services/appoinment.service';
import { DoctorsService } from '../../services/doctors.service';
import { NotifyService } from '../../services/notify.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-appoinment',
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.css']
})
export class AppoinmentComponent implements OnInit {
  appoinment: Appoinment[] = [];
  doctor: Doctors[] = [];
  dataSource: MatTableDataSource<Appoinment> = new MatTableDataSource(this.appoinment);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["appoinmentId","patientName", "age", "phone", "appointDate", "problem", "serialNo","doctorId","actions"];
  constructor(
    private dataSvc: AppoinmentService,
    private docSvc: DoctorsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Appoinment) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteAppoinments(Number(item.appoinmentId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.appoinmentId != x.appoinmentId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getDoctorName(id: number) {
    let z = this.doctor.find(c => c.doctorsId == id);
    return z ? z.doctorName : '';
  }
  ngOnInit(): void {
    this.dataSvc.getAppoinments().
    subscribe(x => {
      this.appoinment = x;
      
      console.log(x);
      this.dataSource.data = this.appoinment;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Failed to load department data", "DISMISS");
    });
    this.docSvc.getDoctors().
      subscribe(x => {
        this.doctor = x;
        console.log(x);
      }, err => { this.notifySvc.fail("Data load failed", "DISMISS") });
  }

}
