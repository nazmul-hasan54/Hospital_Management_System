import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from '../../../models/departments';
import { Designations } from '../../../models/designations';
import { Doctors } from '../../../models/doctors';
import { DepartmentsService } from '../../../services/departments.service';
import { DesignationsService } from '../../../services/designations.service';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-doctors-create',
  templateUrl: './doctors-create.component.html',
  styleUrls: ['./doctors-create.component.css']
})
export class DoctorsCreateComponent implements OnInit {
  docotrs: Doctors = new Doctors();
  departments: Departments[] = [];
  designations: Designations[] = [];
  doctorsForm: FormGroup = new FormGroup({
    doctorName: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    designationId: new FormControl('', Validators.required),
    visitFee: new FormControl('', Validators.required)
  })


  
  constructor(
    private dataSvc: DoctorsService,
    private depSvc: DepartmentsService,
    private desigSvc: DesignationsService,
    private notifySvc: NotifyService,
  ) { }
  get f() {
    return this.doctorsForm.controls;
  }
  insert() {
    if (this.doctorsForm.invalid) return;

    console.log(this.doctorsForm.value);

    Object.assign(this.docotrs, this.doctorsForm.value);

    console.log(this.docotrs);

    this.dataSvc.insertDoctor(this.docotrs)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data Inserted Sucessfully", "DISMISS");
        this.doctorsForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    this.depSvc.getDepartment()
      .subscribe(r => {
        this.departments = r;
      }, err => {
        this.notifySvc.fail("Failed to load department data!!", "DISMISS");
      })
    this.desigSvc.getDesignationList().
      subscribe(b => {
        this.designations = b;
      }, err => {
        this.notifySvc.fail("Failed to load designation  data!!", "DISMISS");

      })
  }

}
