import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departments } from '../../../models/departments';
import { Rooms } from '../../../models/rooms';
import { DepartmentsService } from '../../../services/departments.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-rooms-create',
  templateUrl: './rooms-create.component.html',
  styleUrls: ['./rooms-create.component.css']
})
export class RoomsCreateComponent implements OnInit {
  room: Rooms = new Rooms();
  department: Departments[] = [];
  roomForm: FormGroup = new FormGroup({
    roomNo: new FormControl('', Validators.required),
    roomType: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required)
  });

  constructor(
    private dataSvc: RoomsService,
    private depSvc: DepartmentsService,
    private notifySvc: NotifyService,
  ) { }
  get f() {
    return this.roomForm.controls;
  }
  insert() {
    if (this.roomForm.invalid) return;
    console.log(this.roomForm.value);

    Object.assign(this.room, this.roomForm.value);
    console.log(this.room);

    this.dataSvc.insertRoom(this.room)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data saved successfully!!", "Dismiss");
        this.roomForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }
  ngOnInit(): void {
    this.depSvc.getDepartment()
      .subscribe(r => {
        this.department = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}
