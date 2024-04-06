import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Designations } from '../../../models/designations';
import { DesignationsService } from '../../../services/designations.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrls: ['./designation-edit.component.css']
})
export class DesignationEditComponent implements OnInit {
  desginaton: Designations = new Designations();
  designationForm: FormGroup = new FormGroup({
    desigRank: new FormControl('', Validators.required)
    
  })

  constructor(
    private dataSvc: DesignationsService,
    private notifyService: NotifyService,
    private activeRoute: ActivatedRoute
  ) { }
  get f() {
    return this.designationForm.controls;
  }
  update() {
    if (this.designationForm.invalid) return;
    this.desginaton.desigRank = this.f['desigRank'].value;
    
    //console.log(this.department);
    this.dataSvc.updateDesignation(this.desginaton)
      .subscribe(r => {
        this.notifyService.success("Data Updated successfully!!", "DISMISS");
      }, err => {
        this.notifyService.fail("Fail to update data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id: number = this.activeRoute.snapshot.params['id'];
    console.log(id);
    this.dataSvc.getDesignationById(id)
      .subscribe(x => {
        console.log(x);
        this.desginaton = x;
        this.designationForm.patchValue(this.desginaton);
      }, err => {
        this.notifyService.fail("Fail to load department data!!", "DISMISS");
      })
  }

}
