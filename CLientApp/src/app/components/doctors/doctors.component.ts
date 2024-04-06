import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Departments } from '../../models/departments';
import { Designations } from '../../models/designations';
import { Doctors } from '../../models/doctors';
import { DepartmentsService } from '../../services/departments.service';
import { DesignationsService } from '../../services/designations.service';
import { DoctorsService } from '../../services/doctors.service';
import { NotifyService } from '../../services/notify.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctors[] = [];
  departments: Departments[] = [];
  designations: Designations[] = [];
  dataSource: MatTableDataSource<Doctors> = new MatTableDataSource(this.doctors);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["doctorsId","doctorName", "departmentId", "designationId", "visitFee","actions"];
  constructor(
    private dataSvc: DoctorsService,
    private depSvc: DepartmentsService,
    private desiSvc: DesignationsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  getDepartmentName(id: number) {
    let z = this.departments.find(c => c.departmentId == id)
    return z ? z.departmentName : '';
  }
  getDesignationName(id: number) {
    let z = this.designations.find(d => d.designationId == id)
    return z ? z.desigRank : '';
  }
  confirmDelete(item: Doctors) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteDoctor(Number(item.doctorsId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.doctorsId != x.doctorsId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {

    this.dataSvc.getDoctors().
      subscribe(x => {
        this.doctors = x;
        console.log(x);
        this.dataSource.data = this.doctors;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load department data", "DISMISS");
      });
    this.depSvc.getDepartment().
      subscribe(x => {
        this.departments = x;
        console.log(x);
      }, err => { this.notifySvc.fail(" doctor Data load failed", "DISMISS") });
    this.desiSvc.getDesignationList()
      .subscribe(x => {
        this.designations = x;
        console.log(x);

      }, err => { this.notifySvc.fail("out patient data load failed", "DISMISS") })
  }

}
