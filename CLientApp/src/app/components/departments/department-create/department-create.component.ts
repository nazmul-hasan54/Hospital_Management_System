import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from '../../../models/departments';
import { DepartmentsService } from '../../../services/departments.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  department: Departments = new Departments();
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  })
  constructor(
    private dataSvc: DepartmentsService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.departmentForm.controls;
  }
  insert() {
    if (this.departmentForm.invalid) return;
    this.department.departmentName = this.f['departmentName'].value;
    this.department.location = this.f['location'].value;
    this.dataSvc.insertDepartment(this.department)
      .subscribe(r => {
        this.notifyService.success("Data Inserted Sucessfully", "DISMISS");
        this.departmentForm.reset({});
      }, err => {
        this.notifyService.fail("Data Failed To Saved", "DISMISS");
      })
  }
  ngOnInit(): void {
  }

}
