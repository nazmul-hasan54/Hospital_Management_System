import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departments } from '../../../models/departments';
import { DepartmentsService } from '../../../services/departments.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  
  department: Departments = new Departments();
  departmentForm: FormGroup = new FormGroup({
    departmentName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  })
  constructor(
    private dataSvc: DepartmentsService,
    private notifyService: NotifyService,
    private activeRoute: ActivatedRoute
  ) { }
  get f() {
    return this.departmentForm.controls;
  }

  update() {
    if (this.departmentForm.invalid) return;
    this.department.departmentName = this.f['departmentName'].value;
    this.department.location = this.f['location'].value;
    //console.log(this.department);
    this.dataSvc.updateDepartment(this.department)
      .subscribe(r => {
        this.notifyService.success("Data Updated successfully!!", "DISMISS");
      }, err => {
        this.notifyService.fail("Fail to update data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.dataSvc.getDepartmentById(id)
      .subscribe(x => {
        console.log(x);
        this.department = x;
        this.departmentForm.patchValue(this.department);
      }, err => {
        this.notifyService.fail("Fail to load department data!!", "DISMISS");
      })
  }

}
