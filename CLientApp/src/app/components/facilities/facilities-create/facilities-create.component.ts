import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admission } from '../../../models/admission';
import { Facilities } from '../../../models/facilities';
import { AdmissionService } from '../../../services/admission.service';
import { FacilitiesService } from '../../../services/facilities.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-facilities-create',
  templateUrl: './facilities-create.component.html',
  styleUrls: ['./facilities-create.component.css']
})
export class FacilitiesCreateComponent implements OnInit {
  facility: Facilities = new Facilities();
  admission: Admission[] = [];
  facilityForm: FormGroup = new FormGroup({
    facilityName: new FormControl('', Validators.required),
    addmisonId: new FormControl('', Validators.required),
    facilityPrice: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: FacilitiesService,
    private addSvc: AdmissionService,
    private notifySvc: NotifyService
  ) { }
  get f() {
    return this.facilityForm.controls;
  }
  insert() {
    if (this.facilityForm.invalid) return;
    console.log(this.facilityForm.value);

    this.facility.facilitiesId =0;
    Object.assign(this.facility, this.facilityForm.value);
   
    console.log(this.facility);

    this.dataSvc.insertFacility(this.facility)
      .subscribe(r => {
        console.log(r);
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }

  ngOnInit(): void {
    this.addSvc.getAdmission()
      .subscribe(r => {
        this.admission = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}
