import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Appoinment } from '../../../models/appoinment';
import { Doctors } from '../../../models/doctors';
import { AppoinmentService } from '../../../services/appoinment.service';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-appoinment-edit',
  templateUrl: './appoinment-edit.component.html',
  styleUrls: ['./appoinment-edit.component.css']
})
export class AppoinmentEditComponent implements OnInit {
  appoinment: Appoinment = new Appoinment();
  doctor: Doctors[] = [];
  appoinmentForm: FormGroup = new FormGroup({

    patientName: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    appointDate: new FormControl('', Validators.required),
    problem: new FormControl('', Validators.required),
    serialNo: new FormControl('', Validators.required),
    doctorsId: new FormControl('', Validators.required)
  })

  constructor(
    private dataSvc: AppoinmentService,
    private notifySvc: NotifyService,
    private docSvc: DoctorsService,
    private datePipe: DatePipe,
    private activeRoute:ActivatedRoute
  ) { }
  get f() {
    return this.appoinmentForm.controls;
  }
  update(): void {
    if (this.appoinmentForm.invalid) return;
    console.log(this.appoinmentForm.value);
    this.appoinment.patientName = this.f['patientName'].value;
    this.appoinment.age = this.f['age'].value;
    this.appoinment.phone = this.f['phone'].value;
    this.appoinment.appointDate = this.f['appointDate'].value;
    this.appoinment.problem = this.f['problem'].value;
    this.appoinment.serialNo = this.f['serialNo'].value;
    this.appoinment.doctorsId = this.f['doctorsId'].value;
    console.log(this.appoinment);
    this.dataSvc.updateAppoinments(this.appoinment)
      .subscribe(r => {
        
          this.notifySvc.success("Succeeded to update appoinment data", "DISMISS");
        
      }, err => {
        this.notifySvc.fail("Fail to update data!!", "DISMISS");
      })
  }
  
  ngOnInit(): void {
    let id: number = this.activeRoute.snapshot.params['id'];
    this.dataSvc.getAppoinmentsById(id)
      .subscribe(r => {
        this.appoinment = r;
        this.appoinmentForm.patchValue(this.appoinment);
      }, err => {
        this.notifySvc.fail("Fail to load appoinment data!!", "DISMISS");
      });
    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctor = r;
        this.appoinmentForm.patchValue(this.doctor);
      }, err => {
        this.notifySvc.fail("Failed to load doctor data!!", "DISMISS");
      })
  }

}
