import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hospitals } from '../../../models/hospitals';
import { HospitalsService } from '../../../services/hospitals.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-hospitals-create',
  templateUrl: './hospitals-create.component.html',
  styleUrls: ['./hospitals-create.component.css']
})
export class HospitalsCreateComponent implements OnInit {
  hospital: Hospitals = new Hospitals();
  hospitalForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });
  constructor(
    private dataSvc: HospitalsService,
    private notifySvc: NotifyService
  ) { }
  get f() {
    return this.hospitalForm.controls;
  }

  insert() {
    if (this.hospitalForm.invalid) return;
    this.hospital.name = this.f['name'].value;
    this.hospital.address = this.f['address'].value;
    this.hospital.phone = this.f['phone'].value;
    this.hospital.email = this.f['email'].value;
    this.dataSvc.insertHospital(this.hospital)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted successfully!!", "DISMISS");
        this.hospitalForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
  }

}
