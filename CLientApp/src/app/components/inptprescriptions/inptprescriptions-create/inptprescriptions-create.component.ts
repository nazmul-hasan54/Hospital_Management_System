import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Admission } from 'src/app/models/admission';
import { Inptprescriptions } from 'src/app/models/inptprescriptions';
import { Medicinelists } from 'src/app/models/medicinelists';
import { Patienttests } from 'src/app/models/patienttests';
import { Pntmedicines } from 'src/app/models/pntmedicines';
import { TestList } from 'src/app/models/test-list';
import { AdmissionService } from 'src/app/services/admission.service';
import { InptprescriptionsService } from 'src/app/services/inptprescriptions.service';
import { MedicinelistsService } from 'src/app/services/medicinelists.service';
import { NotifyService } from 'src/app/services/notify.service';
import { PatienttestsService } from 'src/app/services/patienttests.service';
import { PntmedicinesService } from 'src/app/services/pntmedicines.service';
import { TestListService } from 'src/app/services/test-list.service';

@Component({
  selector: 'app-inptprescriptions-create',
  templateUrl: './inptprescriptions-create.component.html',
  styleUrls: ['./inptprescriptions-create.component.css']
})
export class InptprescriptionsCreateComponent implements OnInit {

  pntMedicineList: Pntmedicines[]=[];
  pntTestList: Patienttests[]=[];
  admissionList: Admission[]=[];
  medicineList: Medicinelists[]=[];
  testList: TestList[]=[];
  inPtPrescriptionList: any[]=[];
  pntMedicineLists:any;
  pntTestListById: any;
  inPtPrescriptionForm!: FormGroup;
  pntMedicineArray!: FormArray;
  pntTestListArray!: FormArray;
  pagetitle = "Create new In Patient Prescription"
  editInPtPrescription: any;
  isedit = false;
  editInPtPrescript:any;
  editInPtPrescriptionDetail: any;
  constructor(
    private _fb: FormBuilder,
    private _admissionSvc: AdmissionService,
    private _medicineList: MedicinelistsService,
    private _pntMedcineSvc: PntmedicinesService,
    private _pntTestListSvc: PatienttestsService,
    private _testList: TestListService,
    private _http: HttpClient,
    private _inPtPrescriptionSvc: InptprescriptionsService,
    private _notifySvc: NotifyService,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAdmissionList();
    this.getMedicineList();
    this.getTestList();
    this.getInPtPrescription();
    // let id: number = this._activeroute.snapshot.params['id'];
    // if(id != null){
    //   this.pagetitle = "Edit In Patient Prescription";
    //   this.isedit = true;
    //   this.editInPtPrescriptInfo(id);
    // }
    this.editInPtPrescript = this._activateRoute.snapshot.params['inPtPrescriptionId'];
    if(this.editInPtPrescript != null){
      this.pagetitle = "Edit Existing In Patient Prescription";
      this.isedit = true;
      this.getInPtPrescriptionById(this.editInPtPrescript);
    }
  }

  createForm(){
    this.inPtPrescriptionForm = this._fb.group({
      addmisonId: [,[Validators.required]],
      isReleased: [false, []],
      prescriptionDate: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      pntMedicines: this._fb.array([]),
      patientTests: this._fb.array([]),
    });
  }

  getInPtPrescriptionById(inPtPrescriptionId: any){
    this._pntMedcineSvc.getPntMedicineById(inPtPrescriptionId).subscribe(res => {
      this.pntMedicineLists = res;
      for (let i = 0; i < this.pntMedicineLists.length; i++) {
        this.addPntMedicine();
      };
      console.log("ghahf", this.pntMedicineLists);
    });

    this._pntTestListSvc.getPatientTestById(inPtPrescriptionId).subscribe(res => {
      this.pntTestListById = res;
      for (let i = 0; i < this.pntTestListById.length; i++) {
        this.addPntTestList();
      };
      console.log("ghahfvhfhf", this.pntTestListById);
    });

    this._inPtPrescriptionSvc.getPrescriptionById(inPtPrescriptionId).subscribe(res => {
      let inPtPrescription: any;
      inPtPrescription = res;
      console.log("ghafhf", inPtPrescription);
      if(inPtPrescription != null){
        this.inPtPrescriptionForm.patchValue({
          addmisonId: inPtPrescription.addmisonId,
          isReleased: inPtPrescription.isReleased,
          prescriptionDate: inPtPrescription.prescriptionDate,
          instruction: inPtPrescription.instruction,
          pntMedicines:  inPtPrescription.pntMedicines,
          patientTests: inPtPrescription.pntTestList
        });
        this.inPtPrescriptionForm.setControl('pntMedicines', this._fb.array(inPtPrescription.pntMedicines || []));
        this.inPtPrescriptionForm.setControl('patientTests', this._fb.array(inPtPrescription.pntTestList || []));
      }
      
      // this.inPtPrescriptionForm.patchValue(inPtPrescription);
    }, err => {
      this._notifySvc.fail("Failed to load In Patient Prescription Data", "Dismiss");
    });
  // }
  }

  insert(){
    if(this.inPtPrescriptionForm.valid){
      this._inPtPrescriptionSvc.insertPrescription(this.inPtPrescriptionForm.getRawValue()).subscribe(res => {
        if(res){
          console.log("ghghgh", res);
          
          this._notifySvc.success('In Pt Prescription Created Successfully','Dismiss');
        } else {
          this._notifySvc.fail('Failed to Create In Pt Prescription', 'Dismiss');
        }
      });
    } else {
      this._notifySvc.fail('Please fill up all the required field', 'Dismiss')
    }
  }

  
  // editInPtPrescriptInfo(id:number){
  //   this._inPtPrescriptionSvc.getPrescriptionById(id).subscribe(res => {
  //     this.editInPtPrescriptionDetail = res;
  //     if(this.editInPtPrescriptionDetail != null){
  //       this.inPtPrescriptionForm.setValue({
  //         addmisonId: this.editInPtPrescriptionDetail.addmisonId,
  //         isReleased: this.editInPtPrescriptionDetail.isReleased,
  //         prescriptionDate: this.editInPtPrescriptionDetail.prescriptionDate,
  //         instruction: this.editInPtPrescriptionDetail.instruction,
  //       });
  //     }
  //   });

  // }

  addPntMedicine(){
    this.pntMedicineArray = this.inPtPrescriptionForm.get("pntMedicines") as FormArray;
    let admissionById = this.inPtPrescriptionForm.get("addmisonId")?.value;
    if((admissionById != null && admissionById != '') || this.isedit){
      this.pntMedicineArray.push(this.generateRow());
    }
  }

  addPntTestList(){
    this.pntTestListArray = this.inPtPrescriptionForm.get("patientTests") as FormArray;
    let admissionById = this.inPtPrescriptionForm.get("addmisonId")?.value;
    if((admissionById != null && admissionById != '') || this.isedit){
      this.pntTestListArray.push(this.generatePntTestRow());
    }
  }

  get pntMedicines(){
    return this.inPtPrescriptionForm.get("pntMedicines") as FormArray;
  }

  get pntTestLists(){
    return this.inPtPrescriptionForm.get("patientTests") as FormArray;
  }

  generateRow(){
    return this._fb.group({
      inPtPrescriptionId: [, [Validators.required]],
      medicineListId: [, [Validators.required]],
      quantity: [, [Validators.required]],
      doges: ['',[]]
    });
  }

  generatePntTestRow(){
    return this._fb.group({
      inPtPrescriptionId: [, [Validators.required]],
      testlistId: [, [Validators.required]],
      result: ['', []]
    });
  }

  getAdmissionList(){
    this._admissionSvc.getAdmission().subscribe(res =>{
      this.admissionList = res;
    });
  }

  getMedicineList(){
    this._medicineList.getMedicine().subscribe(res => {
      this.medicineList = res;
    });
  }

  getTestList(){
    this._testList.getTestList().subscribe(res => {
      this.testList = res;
    });
  }

  getInPtPrescription(){
    this._inPtPrescriptionSvc.getPrescription().subscribe(res => {
      this.inPtPrescriptionList = res;
    });
  }

  removePntMedice(index: any){
    if(confirm('Do you want to remove?')){
      this.pntMedicines.removeAt(index);
    }
  }

  removePntTestList(index: any){
    if(confirm('Do you want to remove?')){
      this.pntTestLists.removeAt(index);
    }
  }

}
