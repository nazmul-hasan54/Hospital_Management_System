import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admission } from '../../models/admission';
import { Beds } from '../../models/beds';
import { Doctors } from '../../models/doctors';
import { OutPtPresccripts } from '../../models/out-pt-presccripts';
import { AdmissionService } from '../../services/admission.service';
import { BedsService } from '../../services/beds.service';
import { DoctorsService } from '../../services/doctors.service';
import { NotifyService } from '../../services/notify.service';
import { OutPtPresccriptsService } from '../../services/out-pt-presccripts.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  admission: Admission[] = [];
  doctors: Doctors[] = [];
  beds: Beds[] = [];
  outPtPrescripts: OutPtPresccripts[] = [];
  dataSource: MatTableDataSource<Admission> = new MatTableDataSource(this.admission);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["admissionId","patientName", "age", "phone", "email", "address", "addmissionDate", "problem", "isRelase", "doctorsId", "bedId","outPtPresccriptId","actions"];
  constructor(
    private dataSvc: AdmissionService,
    private docSvc: DoctorsService,
    private bedSvc: BedsService,
    private outPtSvc: OutPtPresccriptsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,

   
    
  ) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getDoctorName(id: number) {
    let z = this.doctors.find(c => c.doctorsId == id);
    return z ? z.doctorName : '';
  }
  getBed(id:number) {
    let z = this.beds.find(b => b.bedId == id)
    return z ? z.bedNo : '';
  }
  getOutPtPrescript(id: number) {
    let z = this.outPtPrescripts.find(p => p.outptPresccriptId == id);
    return z ? z.appoinmentId : '';
  }
  confirmDelete(item: Admission) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteAdmission(Number(item.admissionId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.admissionId != x.admissionId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {
    this.dataSvc.getAdmission().
      subscribe(x => {
        this.admission = x;

        console.log(x);
        this.dataSource.data = this.admission;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load department data", "DISMISS");
      });
    this.docSvc.getDoctors().
      subscribe(x => {
        this.doctors = x;
        console.log(x);
      }, err => { this.notifySvc.fail(" doctor Data load failed", "DISMISS") });

    this.outPtSvc.getOutPtPresccripts()
      .subscribe(x => {
        this.outPtPrescripts = x;
        console.log(x);

      }, err => { this.notifySvc.fail("out patient data load failed", "DISMISS") })
    this.bedSvc.getBeds().
      subscribe(x => {
        this.beds = x;
        console.log();

      }, err => { this.notifySvc.fail("Bed Data Load to fail","DISMISS") })
  }
  
}
