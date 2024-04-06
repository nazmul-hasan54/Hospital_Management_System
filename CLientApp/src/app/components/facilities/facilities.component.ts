import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admission } from '../../models/admission';
import { Facilities } from '../../models/facilities';
import { AdmissionService } from '../../services/admission.service';
import { FacilitiesService } from '../../services/facilities.service';
import { NotifyService } from '../../services/notify.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  admission: Admission[] = [];
  facility: Facilities[] = [];
  dataSource: MatTableDataSource<Facilities> = new MatTableDataSource(this.facility);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = [ "facilitiesId","admissionId", "facilityName", "facilityPrice", "action"];
  constructor(
    private dataSvc: FacilitiesService,
    private addSvc: AdmissionService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Facilities) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteFacility(Number(item.facilitiesId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.facilitiesId != x.facilitiesId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  ngOnInit(): void {
    this.dataSvc.getFacility().subscribe(x => {
      this.facility = x;
      console.log(x);
      this.dataSource.data = this.facility;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dissmiss");
    });
    this.addSvc.getAdmission().subscribe(x => {
      this.admission = x;
    }, err => {
      this.notifySvc.fail("Failed to load data", "Dismiss");
    });
  }

}
