import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctors } from '../../../models/doctors';
import { Schedule } from '../../../models/schedule';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-schedules-create',
  templateUrl: './schedules-create.component.html',
  styleUrls: ['./schedules-create.component.css']
})
export class SchedulesCreateComponent implements OnInit {
  schedules: Schedule = new Schedule();
  doctors: Doctors[] = [];
  scheduleForm: FormGroup = new FormGroup({
    scheduleDays: new FormControl('', Validators.required),
    scheduleTime: new FormControl('', Validators.required),
    doctorsId: new FormControl('', Validators.required)
  })

  constructor(
    private dataSvc: ScheduleService,
    private docSvc:DoctorsService,
    private notifySvc: NotifyService
  ) { }

  get f() {
    return this.scheduleForm.controls;
  }
  insert() {
    if (this.scheduleForm.invalid) return;

    console.log(this.scheduleForm.value);

    Object.assign(this.schedules, this.scheduleForm.value);
    console.log(this.schedules);

    this.dataSvc.insertSchedule(this.schedules)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data inserted successfully!!", "Dismiss");
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctors = r;
      }, err => {
        this.notifySvc.fail("Failed to load cartoon data!!", "DISMISS");
      })
  }

}
