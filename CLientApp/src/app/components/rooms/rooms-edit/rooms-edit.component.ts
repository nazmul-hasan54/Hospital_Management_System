import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departments } from '../../../models/departments';
import { Rooms } from '../../../models/rooms';
import { DepartmentsService } from '../../../services/departments.service';
import { NotifyService } from '../../../services/notify.service';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-rooms-edit',
  templateUrl: './rooms-edit.component.html',
  styleUrls: ['./rooms-edit.component.css']
})
export class RoomsEditComponent implements OnInit {
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
    
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.roomForm.controls;
  }
  update() {
    if (this.roomForm.invalid) return;
    console.log(this.roomForm.value);

    Object.assign(this.room, this.roomForm.value);
    console.log(this.room);

    this.dataSvc.updateRoom(this.room)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.fail("update  data!!", "Dismiss");
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "Dismiss");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getRoomId(id)
      .subscribe(x => {
        this.room = x;
        this.roomForm.patchValue(this.room);
      }, err => {
        this.notifySvc.fail("Fail to load cartoon data!!", "DISMISS");
      })
    this.depSvc.getDepartment()
      .subscribe(r => {
        this.department = r;
      }, err => {
        this.notifySvc.fail("Failed to load admission data!!", "Dismiss");
      })
  }

}
