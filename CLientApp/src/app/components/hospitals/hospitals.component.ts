import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hospitals } from '../../models/hospitals';
import { HospitalsService } from '../../services/hospitals.service';
import { NotifyService } from '../../services/notify.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  hospital: Hospitals[] = [];
  dataSource: MatTableDataSource<Hospitals> = new MatTableDataSource(this.hospital);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["name", "address", "phone", "email", "actions"];
  constructor(
    private dataSvc: HospitalsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Hospitals) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteHospital(Number(item.hospitalId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "Dismiss");
          this.dataSource.data = this.dataSource.data.filter(d => d.hospitalId != x.hospitalId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "Dismiss");
        })
    });
  }

  ngOnInit(): void {
    this.dataSvc.getHopital().
      subscribe(x => {
        this.hospital = x;
        console.log(x);
        this.dataSource.data = this.hospital;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load hospital data", "Dismiss");
      });
  }

}
