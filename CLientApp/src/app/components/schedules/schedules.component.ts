import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctors } from '../../models/doctors';
import { Schedule } from '../../models/schedule';
import { DoctorsService } from '../../services/doctors.service';
import { NotifyService } from '../../services/notify.service';
import { ScheduleService } from '../../services/schedule.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
 
  schedule: Schedule[] = [];
  doctors: Doctors[] = [];
  dataSource: MatTableDataSource<Schedule> = new MatTableDataSource(this.schedule);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["scheduleDays", "scheduleTime", "doctorsId", "actions"];

  constructor(
    private dataSvc: ScheduleService,
    private docSvc: DoctorsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Schedule) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteSchedule(Number(item.scheduleId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.scheduleId != x.scheduleId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getDoctorName(id: number) {
    let z = this.doctors.find(c => c.doctorsId == id);
    return z ? z.doctorName : '';
  }
  ngOnInit(): void {
    this.dataSvc.getSchedule().
      subscribe(x => {
        this.schedule = x;
        console.log(x);
        this.dataSource.data = this.schedule;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load character data", "DISMISS");
      });
    this.docSvc.getDoctors().
      subscribe(x => {
        this.doctors = x;
      }, err => {
        this.notifySvc.fail("Failed to load cartoon data", "DISMISS");
      })
  }

}
