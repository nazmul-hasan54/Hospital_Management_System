import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departments } from '../../../models/departments';
import { Designations } from '../../../models/designations';
import { Doctors } from '../../../models/doctors';
import { DepartmentsService } from '../../../services/departments.service';
import { DesignationsService } from '../../../services/designations.service';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-doctors-edit',
  templateUrl: './doctors-edit.component.html',
  styleUrls: ['./doctors-edit.component.css']
})
export class DoctorsEditComponent implements OnInit {
  doctors!: Doctors;
  departments: Departments[] = [];
  designation: Designations[] = [];
  doctorsForm: FormGroup = new FormGroup({
    doctorName: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    designationId: new FormControl('', Validators.required),
    visitFee: new FormControl('', Validators.required)
  })

  constructor(
    private docSvc: DoctorsService,
    private notifysvc: NotifyService,
    private degSvc: DesignationsService,
    private depSvc: DepartmentsService,
    private Route: ActivatedRoute

  ) { }

  get f() {
    return this.doctorsForm.controls;
  }
  update() {
    if (this.doctorsForm.invalid) return;
    this.doctors.doctorName = this.f['doctorName'].value;
    this.doctors.departmentId = this.f['departmentId'].value;
    this.doctors.designationId = this.f['designationId'].value;
    this.doctors.visitFee = this.f['visitFee'].value;
    this.docSvc.updateDoctor(this.doctors).subscribe(r => {
      this.notifysvc.success("Data updated Successfully", "DISSMISS");
      this.doctorsForm.reset({});
    }, err => {

      this.notifysvc.fail("Data update Failed", "DISSMISS");
    });
  }

  ngOnInit(): void {

    let id: number = this.Route.snapshot.params['id'];
    this.docSvc.getDoctorsById(id).subscribe(x => {
      this.doctors = x
      this.doctorsForm.patchValue(this.doctors);
    }, err => {
      this.notifysvc.fail("Data Saved failed", "DISSMISS")
    });
    this.depSvc.getDepartment().
      subscribe(x => {
        this.departments = x;
      }, err => {
        this.notifysvc.fail("Failed to load departments data", "DISMISS");
      })
    this.degSvc.getDesignationList().
      subscribe(x => {
        this.designation = x;
      }, err => {
        this.notifysvc.fail("Failed to load Designation data", "DISMISS");
      })
  }

}
