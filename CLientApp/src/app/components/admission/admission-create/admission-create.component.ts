import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-admission-create',
  templateUrl: './admission-create.component.html',
  styleUrls: ['./admission-create.component.css']
})
export class AdmissionCreateComponent implements OnInit {
  admissions: Admission = new Admission();
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
    outPtPresccriptId: new FormControl('', Validators.required) 

  })
  constructor(
    private dataSvc: AdmissionService,
    private notifySvc: NotifyService,
    private docSvc: DoctorsService,
    private bedSvc: BedsService,
    private outPtSvc: OutPtPresccriptsService,
    private datePipe: DatePipe
  ) { }
  get f() {
    return this.admissionForm.controls;
  }
  insert() {
    if (this.admissionForm.invalid) return;

    console.log(this.admissionForm.value);

    Object.assign(this.admissions, this.admissionForm.value);

    console.log(this.admissions);

    this.dataSvc.insertAdmission(this.admissions)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data Inserted Sucessfully", "DISMISS");
        this.admissionForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {

    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctors = r;
      }, err => {
        this.notifySvc.fail("Failed to load zoos data!!", "DISMISS");
      })
    this.bedSvc.getBeds().
      subscribe(b => {
        this.beds = b;
      }, err => {
        this.notifySvc.fail("Failed to load zoos data!!", "DISMISS");

      })
    this.outPtSvc.getOutPtPresccripts().
      subscribe(b => {
        this.outPtPresccripts = b;
      }, err => {
        this.notifySvc.fail("Failed to load zoos data!!", "DISMISS");

      })

  }
}
