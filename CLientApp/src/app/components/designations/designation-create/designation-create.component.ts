import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Designations } from '../../../models/designations';
import { DesignationsService } from '../../../services/designations.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css']
})
export class DesignationCreateComponent implements OnInit {
  designation: Designations = new Designations();
  designationForm: FormGroup = new FormGroup({
    desigRank: new FormControl('', Validators.required)
    
  })

  constructor(
    private dataSvc: DesignationsService,
    private notifyService: NotifyService
  ) { }
  get f() {
    return this.designationForm.controls;
  }
  insert() {
    if (this.designationForm.invalid) return;
    this.designation.desigRank = this.f['desigRank'].value;

    this.dataSvc.insertDesignation(this.designation)
      .subscribe(r => {
        this.notifyService.success("Data Inserted Sucessfully", "DISMISS");
        this.designationForm.reset({});
      }, err => {
        this.notifyService.fail("Data Failed To Saved", "DISMISS");
      })
  }

  ngOnInit(): void {
  }

}
