import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Inptprescriptions } from '../../models/inptprescriptions';
import { Patientlist } from '../../models/patientlist';
import { TestList } from '../../models/test-list';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { InptprescriptionsService } from 'src/app/services/inptprescriptions.service';
import { AdmissionService } from 'src/app/services/admission.service';
import { Admission } from 'src/app/models/admission';
import { NotifyService } from 'src/app/services/notify.service';
import { Pntmedicines } from 'src/app/models/pntmedicines';
import { PntmedicinesService } from 'src/app/services/pntmedicines.service';
import { MedicinelistsService } from 'src/app/services/medicinelists.service';
import { Medicinelists } from 'src/app/models/medicinelists';
import { Patienttests } from 'src/app/models/patienttests';
import { PatienttestsService } from 'src/app/services/patienttests.service';
import { TestListService } from 'src/app/services/test-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inptprescriptions',
  templateUrl: './inptprescriptions.component.html',
  styleUrls: ['./inptprescriptions.component.css']
})
export class InptprescriptionsComponent implements OnInit {

  inPtPrescriptionList: Inptprescriptions[]=[];
  admissionList: Admission[]=[];
  pntMedicineList: Pntmedicines[]=[];
  pntTestList: Patienttests[]=[];
  medicineList: Medicinelists[]=[];
  testList: TestList[]=[];

  dataSource: MatTableDataSource<Inptprescriptions> = new MatTableDataSource(this.inPtPrescriptionList);
  dataSourcePnt: MatTableDataSource<Pntmedicines> = new MatTableDataSource(this.pntMedicineList);
  dataSourcePntTest: MatTableDataSource<Patienttests> = new MatTableDataSource(this.pntTestList);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["inPtPrescriptionId","addmisonId","prescriptionDate","instruction","isReleased","actions"];
  columnListPnt: string[] = ["pntMedicineId","inPtPrescriptionId","medicineListId","quantity","doges"];
  columnListPntTest: string[] = ["patientTestId","inPtPrescriptionId","testlistId","result"];
  constructor(
    private _inPtPrescriptSvc: InptprescriptionsService,
    private _admissionSvc: AdmissionService,
    private _notifySvc: NotifyService,
    private _pntMedicineSvc: PntmedicinesService,
    private _medicineSvc: MedicinelistsService,
    private _pntTestSvc: PatienttestsService,
    private _testListSvc: TestListService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getInPtPrescriptionList();

      // Admission Data List
      this._admissionSvc.getAdmission().subscribe(res => {
        this.admissionList = res;
      });
    
    this.getPntMedicineList();
    this.getMedicineList();
    this.getPntTestList();
    this.getTestList();
  }

  // In Pt Prescription Data List
  getInPtPrescriptionList(){
    this._inPtPrescriptSvc.getPrescription().subscribe(res => {
      this.inPtPrescriptionList = res;
      this.dataSource.data = this.inPtPrescriptionList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this._notifySvc.fail("Failed to load In Pt Prescription Data", "Dismiss");
    });
  }

  // Patient Medicine Data List
  getPntMedicineList(){
    this._pntMedicineSvc.getPntMedicines().subscribe(res =>{
      this.pntMedicineList = res;
      this.dataSourcePnt.data = this.pntMedicineList;
      this.dataSourcePnt.paginator = this.paginator;
      this.dataSourcePnt.sort = this.sort;
    }, err => {
      this._notifySvc.fail("Failed to load Patient Medicine Data", "Dismiss");
    });
  }

  // Patient Test Data List
  getPntTestList(){
    this._pntTestSvc.getPatientTests().subscribe(res => {
      this.pntTestList = res;
      this.dataSourcePntTest.data = this.pntTestList;
      this.dataSourcePntTest.paginator = this.paginator;
      this.dataSourcePntTest.sort = this.sort;
    }, err => {
      this._notifySvc.fail("Failed to load Patient Test Data", "Dismiss");
    });
  }

  // Medicine Data List
  getMedicineList(){
    this._medicineSvc.getMedicine().subscribe(res => {
      this.medicineList = res;
    });
  }

  // Get Patient Name From Admission Data List
  getPatientName(id: number){
    let z = this.admissionList.find(p => p.admissionId == id);
    return z ? z.patientName : '';
  }

  // Get Medicine Name From Medicine List
  getMedicineName(id: number){
    let z = this.medicineList.find(p => p.medicineListId == id);
    return z ? z.medicineName : '';
  }

  // Get Test List Data
  getTestList(){
    this._testListSvc.getTestList().subscribe(res => {
      this.testList = res;
    });
  }

  // Get Test Name From Test List
  getTestName(id: number){
    let z = this.testList.find(p => p.testlistId == id);
    return z ? z.testName : '';
  }

  editInPtPrescription(inPtPrescriptionId: any){
    this._router.navigateByUrl('/inptprescriptions-edit/'+ inPtPrescriptionId);
  }

}
