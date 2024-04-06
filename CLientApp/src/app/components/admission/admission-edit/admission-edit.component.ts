import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admission } from '../../../models/admission';
import { Beds } from '../../../models/beds';
import { Doctors } from '../../../models/doctors';
import { OutPtPresccripts } from '../../../models/out-pt-presccripts';
import { AdmissionService } from '../../../services/admission.service';
import { BedsService } from '../../../services/beds.service';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';
import { OutPtPresccriptsService } from '../../../services/out-pt-presccripts.service';

@Component({
  selector: 'app-admission-edit',
  templateUrl: './admission-edit.component.html',
  styleUrls: ['./admission-edit.component.css']
})
export class AdmissionEditComponent implements OnInit {
  admission: Admission = new Admission();
  doctors: Doctors[] = [];
  beds: Beds[] = [];
  outPtPresccripts: OutPtPresccripts[] = [];
  admissionForm: FormGroup = new FormGroup({
    patientName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    addmissionDate: new FormControl('', Validators.required),
    problem: new FormControl('', Validators.required),
    isRelase: new FormControl('', Validators.required),
    doctorsId: new FormControl('', Validators.required),
    bedId: new FormControl('', Validators.required),
    outPtPresccriptId: new FormControl()
  })

  constructor(
    private dataSvc: AdmissionService,
    private notifySvc: NotifyService,
    private docSvc: DoctorsService,
    private bedSvc: BedsService,
    private outPtSvc: OutPtPresccriptsService,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute
  ) { }
  get f() {
    return this.admissionForm.controls;
  }
  update(): void {

    if (this.admissionForm.invalid) return;
    console.log(this.admissionForm.value);
    this.admission.patientName = this.f['patientName'].value;
    this.admission.age = this.f['age'].value;
    this.admission.phone = this.f['phone'].value;
    this.admission.email = this.f['email'].value;
    this.admission.address = this.f['address'].value;
    this.admission.addmissionDate = this.f['addmissionDate'].value;
    this.admission.problem = this.f['problem'].value;
    this.admission.isRelase = this.f['isRelase'].value;
    this.admission.doctorsId = this.f['doctorsId'].value;
    this.admission.bedId = this.f['bedId'].value;
    this.admission.outPtPresccriptId = this.f['outPtPresccriptId'].value;

    console.log(this.admission);
    this.dataSvc.updateAdmission(this.admission)
      .subscribe(r => {

        this.notifySvc.success("Succeeded to update admission data", "DISMISS");

      }, err => {
        this.notifySvc.fail("Fail to update data!!", "DISMISS");
      })
  }
  ngOnInit(): void {

    let id: number = this.activeRoute.snapshot.params['id'];
    this.dataSvc.getAdmissionById(id)
      .subscribe(r => {
        this.admission = r;
        this.admissionForm.patchValue(this.admission);
      }, err => {
        this.notifySvc.fail("Fail to load animal data!!", "DISMISS");
      });
    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctors = r;
      }, err => {
        this.notifySvc.fail("Failed to load Doctor data!!", "DISMISS");
      })
    this.bedSvc.getBeds().
      subscribe(b => {
        this.beds = b;
      }, err => {
        this.notifySvc.fail("Failed to load Bed data!!", "DISMISS");

      })
    this.outPtSvc.getOutPtPresccripts().
      subscribe(b => {
        this.outPtPresccripts = b;
     
      }, err => {
        this.notifySvc.fail("Failed to load Out Pt Presccript data!!", "DISMISS");

      })
  }

}
