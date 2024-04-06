import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appoinment } from '../../../models/appoinment';
import { Doctors } from '../../../models/doctors';
import { AppoinmentService } from '../../../services/appoinment.service';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-appoinment-create',
  templateUrl: './appoinment-create.component.html',
  styleUrls: ['./appoinment-create.component.css']
})
export class AppoinmentCreateComponent implements OnInit {
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
    private datePipe: DatePipe
  ) { }
  get f() {
    return this.appoinmentForm.controls;
  }
  //getDoctorName(id: number) {
  //  let z = this.doctor.find(c => c.doctorsId == id);
  //  return z ? z.doctorName : '';
  //}
  insert() {
    if (this.appoinmentForm.invalid) return;

    console.log(this.appoinmentForm.value);

    Object.assign(this.appoinment, this.appoinmentForm.value);

    console.log(this.appoinment);

    this.dataSvc.insertAppoinments(this.appoinment)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data Inserted Sucessfully", "DISMISS");
        this.appoinmentForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctor = r;
      }, err => {
        this.notifySvc.fail("Failed to load zoos data!!", "DISMISS");
      })
  }

}
