import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Hospitals } from '../../../models/hospitals';
import { HospitalsService } from '../../../services/hospitals.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-hospitals-edit',
  templateUrl: './hospitals-edit.component.html',
  styleUrls: ['./hospitals-edit.component.css']
})
export class HospitalsEditComponent implements OnInit {
  hospital: Hospitals = new Hospitals();
  hospitalForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: HospitalsService,
    private notifySvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.hospitalForm.controls;
  }
  update() {
    if (this.hospitalForm.invalid) return;
    this.hospital.name = this.f['name'].value;
    this.hospital.address = this.f['address'].value;
    this.hospital.phone = this.f['phone'].value;
    this.hospital.email = this.f['email'].value;
    this.dataSvc.updateHospital(this.hospital)
      .subscribe(r => {
        this.notifySvc.success("Data updated successfully!!", "DISMISS");
        this.hospitalForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getHospitalById(id)
      .subscribe(x => {
        this.hospital = x;
        this.hospitalForm.patchValue(this.hospital);
      }, err => {
        this.notifySvc.fail("Fail to load cartoon data!!", "DISMISS");
      })
  }

}
