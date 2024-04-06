import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-inptprescriptions-edit',
  templateUrl: './inptprescriptions-edit.component.html',
  styleUrls: ['./inptprescriptions-edit.component.css']
})
export class InptprescriptionsEditComponent implements OnInit {

  inPtPrescriptionForm!: FormGroup;
  inPtPrescription: any;
  pntMedicineList!: any;
  pntTestList!: any;
  admissionList: Admission[]=[];
  medicineList: Medicinelists[]=[];
  testList: TestList[]=[];
  pntMedicineArray!: FormArray;
  pntTestListArray!: FormArray;
  isedit = false;
  pageTitle = "Edit Existing In Patient Prescription";
  id:any;
  createForm(){
    this.inPtPrescriptionForm = this._fb.group({
      addmisonId: [0, [Validators.required]],
      isReleased: [false, []],
      prescriptionDate: ['', [Validators.required]],
      instruction: ['', [Validators.required]],
      pntMedicines: this._fb.array([this._buildPntMedicineItems({inPtPrescriptionId: null,medicineListId: null,quantity: null,doges: null})]),
      patientTests: this._fb.array([this._buildPntTestItems({inPtPrescriptionId: null,testlistId: null,result: null})])
    })
  // inPtPrescriptionForm: FormGroup = new FormGroup({
  //   addmisonId: new FormControl(0, Validators.required),
  //   isReleased: new FormControl(false,),
  //   prescriptionDate: new FormControl('', Validators.required),
  //   instruction: new FormControl('', Validators.required),
  //   pntMedicines: this._fb.array([
      // new FormGroup({
      //   inPtPrescriptionId: new FormControl(0, Validators.required),
      //   medicineListId: new FormControl(0, Validators.required),
      //   quantity: new FormControl(0, Validators.required),
      //   doges: new FormControl('',)
      // }),
    // ]),
    // patientTests: this._fb.array([
      // new FormGroup({
      //   inPtPrescriptionId: new FormControl(0, Validators.required),
      //   testlistId: new FormControl(0, Validators.required),
      //   result: new FormControl('', )
      // })
  //   ])
  // });
}

  // now = new Date();
  // inPtPrescriptionForm = this._fb.group({
  //   addmisonId: [0,[Validators.required]],
  //   isReleased: [false, []],
  //   prescriptionDate: [this.now, [Validators.required]],
  //   instruction: ['', [Validators.required]],
  //   pntMedicines: this._fb.array([]),
  //   patientTests: this._fb.array([]),
  // });
  constructor(
    private _fb: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _inPtPrescriptionSvc: InptprescriptionsService,
    private _notifySvc: NotifyService,
    private _pntMedcineSvc: PntmedicinesService,
    private _pntTestListSvc: PatienttestsService,
    private _admissionSvc: AdmissionService,
    private _medicineList: MedicinelistsService,
    private _testList: TestListService,
  ) { }

  get f() {
    return this.inPtPrescriptionForm.controls;
  }

  ngOnInit(): void {
    this.createForm();
    this.getAdmissionList();
    this.getMedicineList();
    this.getTestList();
    // this.createForm();
    // this.getPntMedicineById();
    // this.getPntTestById();
    this.id = this._activateRoute.snapshot.params['id'];
    if(this.id != null){
      this.isedit = true;
      this.getInPtPrescriptionById(this.id);
    }
  }

  _buildPntMedicineItems(items: any): FormGroup {
    if(!items){
      items = {
        inPtPrescriptionId: null,
        medicineListId: null,
        quantity: null,
        doges: null
      }
    }
    return this._fb.group({
      inPtPrescriptionId: [items.inPtPrescriptionId, [Validators.required]],
      medicineListId: [items.medicineListId, [Validators.required]],
      quantity: [items.quantity, [Validators.required]],
      doges: [items.quantity, []],
    });
  }

  _buildPntTestItems(items: any): FormGroup {
    if(!items){
      items = {
        inPtPrescriptionId: null,
        testlistId: null,
        result: null
      }
    }
    return this._fb.group({
      inPtPrescriptionId: [items.inPtPrescriptionId, [Validators.required]],
      testlistId: [items.testlistId, [Validators.required]],
      result: [items.result, []],
    });
  }
  
  getInPtPrescriptionById(id: any){
    this._pntMedcineSvc.getPntMedicineById(id).subscribe(res => {
      this.pntMedicineList = res;
      for (let i = 0; i < this.pntMedicineList.length; i++) {
        this.addPntMedicine();
      };
      console.log("ghahf", this.pntMedicineList);
    });

    this._pntTestListSvc.getPatientTestById(id).subscribe(res => {
      this.pntTestList = res;
      console.log("ghahfvhfhf", this.pntTestList);
    });

    this._inPtPrescriptionSvc.getPrescriptionById(id).subscribe(res => {
      this.inPtPrescription = res;
      console.log("ghafhf", this.inPtPrescription);
      if(this.inPtPrescription != null){
        this.inPtPrescriptionForm.patchValue({
          addmisonId: this.inPtPrescription.addmisonId,
          isReleased: this.inPtPrescription.isReleased,
          prescriptionDate: this.inPtPrescription.prescriptionDate,
          instruction: this.inPtPrescription.instruction,
          pntMedicines: this.inPtPrescription.pntMedicines,
          patientTests: this.inPtPrescription.pntTestList
        });
        this.inPtPrescriptionForm.setControl('pntMedicines', this._fb.array(this.inPtPrescription.pntMedicines || []));
        this.inPtPrescriptionForm.setControl('patientTests', this._fb.array(this.inPtPrescription.patientTests || []));
      }
      
      // this.inPtPrescriptionForm.patchValue(this.inPtPrescription);
    }, err => {
      this._notifySvc.fail("Failed to load In Patient Prescription Data", "Dismiss");
    });
  // }
  }


  // getPntMedicineById(){
  //   let id: number = this._activateRoute.snapshot.params['id'];
  //   this._pntMedcineSvc.getPntMedicineById(id).subscribe(res => {
  //     this.pntMedicineList = res;
  //     console.log("ghahf", this.pntMedicineList);
  //   });
  // }


  // getPntTestById(){
  //   let id: number = this._activateRoute.snapshot.params['id'];
  //   this._pntTestListSvc.getPatientTestById(id).subscribe(res => {
  //     this.pntTestList = res;
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

  // createForm(){
  //   this.inPtPrescriptionForm = this._fb.group({
  //     addmisonId: [, [Validators.required]],
  //     isReleased: [false, []],
  //     prescriptionDate: ['', [Validators.required]],
  //     instruction: ['', [Validators.required]],
  //     pntMedicines: this._fb.array([]),
  //     patientTests: this._fb.array([]),
  //   });
  // }

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


  update(){
    this.inPtPrescription.addmisonId = this.f['addmisonId'].value;
    this.inPtPrescription.isReleased = this.f['isReleased'].value;
    this.inPtPrescription.prescriptionDate = this.f['prescriptionDate'].value;
    this.inPtPrescription.instruction = this.f['instruction'].value;
    this.inPtPrescription.pntMedicines = this.f['pntMedicines'].value;
    this.inPtPrescription.patientTests = this.f['patientTests'].value;
    if(this.inPtPrescriptionForm.valid){
      this._inPtPrescriptionSvc.updatePrescription(this.inPtPrescription).subscribe(res => {
        if(res){
          console.log("ghghgh", res);
            
            this._notifySvc.success('In Pt Prescription Updated Successfully','Dismiss');
        } else {
          this._notifySvc.fail('Failed to Update In Pt Prescription', 'Dismiss');
        }
      });
    }
  }

}
