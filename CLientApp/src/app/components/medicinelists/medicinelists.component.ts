import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicinelists } from '../../models/medicinelists';
import { MedicinelistsService } from '../../services/medicinelists.service';
import { NotifyService } from '../../services/notify.service';
import { ConfirmDeleteDialogComponent } from '../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-medicinelists',
  templateUrl: './medicinelists.component.html',
  styleUrls: ['./medicinelists.component.css']
})
export class MedicinelistsComponent implements OnInit {
  medicine: Medicinelists[] = [];
  dataSource: MatTableDataSource<Medicinelists> = new MatTableDataSource(this.medicine);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["medicineName", "price", "actions"];
  constructor(
    private dataSvc: MedicinelistsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Medicinelists) {
    this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deleteMedicine(Number(item.medicineListId))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "Dismiss");
          this.dataSource.data = this.dataSource.data.filter(d => d.medicineListId != x.medicineListId);
        }, err => {
          this.notifySvc.fail("Data delete failed", "Dismiss");
        })
    });
  }

  ngOnInit(): void {
    this.dataSvc.getMedicine().
      subscribe(x => {
        this.medicine = x;
        console.log(x);
        this.dataSource.data = this.medicine;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load medicine data", "Dismiss");
      });
  }

}
