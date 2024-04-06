import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Doctors } from '../../../models/doctors';
import { Schedule } from '../../../models/schedule';
import { DoctorsService } from '../../../services/doctors.service';
import { NotifyService } from '../../../services/notify.service';
import { ScheduleService } from '../../../services/schedule.service';

@Component({
  selector: 'app-schedules-edit',
  templateUrl: './schedules-edit.component.html',
  styleUrls: ['./schedules-edit.component.css']
})
export class SchedulesEditComponent implements OnInit {
  schedules: Schedule = new Schedule();
  doctors: Doctors[] = [];
  scheduleForm: FormGroup = new FormGroup({
    scheduleDays: new FormControl('', Validators.required),
    scheduleTime: new FormControl('', Validators.required),
    doctorsId: new FormControl('', Validators.required)
  })
  constructor(
    private dataSvc: ScheduleService,
    private docSvc: DoctorsService,
    private notifySvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.scheduleForm.controls;
  }
  update() {
    if (this.scheduleForm.invalid) return;

    console.log(this.scheduleForm.value);

    Object.assign(this.schedules, this.scheduleForm.value);
    console.log(this.schedules);

    this.dataSvc.updateSchedule(this.schedules)
      .subscribe(r => {
        console.log(r);
        this.notifySvc.success("Data updated successfully!!", "Dismiss");
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getScheduleById(id)
      .subscribe(r => {
        this.schedules = r;
        this.scheduleForm.patchValue(this.schedules);
      }, err => {
        this.notifySvc.fail("Fail to load character data!!", "DISMISS");
      });
    this.docSvc.getDoctors()
      .subscribe(r => {
        this.doctors = r;
      }, err => {
        this.notifySvc.fail("Failed to load cartoon data!!", "DISMISS");
      })
  }

}
