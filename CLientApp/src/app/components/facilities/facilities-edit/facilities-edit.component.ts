import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Admission } from '../../../models/admission';
import { Facilities } from '../../../models/facilities';
import { AdmissionService } from '../../../services/admission.service';
import { FacilitiesService } from '../../../services/facilities.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-facilities-edit',
  templateUrl: './facilities-edit.component.html',
  styleUrls: ['./facilities-edit.component.css']
})
export class FacilitiesEditComponent implements OnInit {
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
    private notifySvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }

  get f() {
    return this.facilityForm.controls;
  }
  update() {
    if (this.facilityForm.invalid) return;
    console.log(this.facilityForm.value);

    /*this.facility.facilitiesId = 0;*/
    Object.assign(this.facility, this.facilityForm.value);

    console.log(this.facility);

    this.dataSvc.updateFacility(this.facility)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data update successfully!!","Dismiss");
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getFacilityId(id).subscribe(x => {
      this.facility = x
      this.facilityForm.patchValue(this.facility);
    }, err => {
      this.notifySvc.fail("Data Saved failed", "DISSMISS")
    });
    this.addSvc.getAdmission()
      .subscribe(r => {
        this.admission = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}
