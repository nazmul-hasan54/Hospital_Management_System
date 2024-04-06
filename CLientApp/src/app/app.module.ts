import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModuleModule } from './mat-module/mat-module.module';
import { AdmissionComponent } from './components/admission/admission.component';
import { HomeComponent } from './components/home/home.component';
import { AppoinmentComponent } from './components/appoinment/appoinment.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentCreateComponent } from './components/departments/department-create/department-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentEditComponent } from './components/departments/department-edit/department-edit.component';
import { ConfirmDeleteDialogComponent } from './components/dialog/confirm-delete-dialog/confirm-delete-dialog.component';

import { AppoinmentCreateComponent } from './components/appoinment/appoinment-create/appoinment-create.component';
import { AppoinmentEditComponent } from './components/appoinment/appoinment-edit/appoinment-edit.component';
import { DatePipe } from '@angular/common';
import { BedsComponent } from './components/beds/beds.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { AdmissionCreateComponent } from './components/admission/admission-create/admission-create.component';
import { AdmissionEditComponent } from './components/admission/admission-edit/admission-edit.component';


import { OutptpresccriptCreateComponent } from './components/outptpresccript/outptpresccript-create/outptpresccript-create.component';
import { OutptpresccriptComponent } from './components/outptpresccript/outptpresccript.component';
import { OutptpresccriptEditComponent } from './components/outptpresccript/outptpresccript-edit/outptpresccript-edit.component';
import { OutPtPresccriptsService } from './services/out-pt-presccripts.service';

import { TestlistsComponent } from './components/testlists/testlists.component';
import { TestlistCreateComponent } from './components/testlists/testlist-create/testlist-create.component';
import { TestlistEditComponent } from './components/testlists/testlist-edit/testlist-edit.component';
import { DesignationCreateComponent } from './components/designations/designation-create/designation-create.component';
import { DesignationEditComponent } from './components/designations/designation-edit/designation-edit.component';
import { DoctorsCreateComponent } from './components/doctors/doctors-create/doctors-create.component';
import { DoctorsEditComponent } from './components/doctors/doctors-edit/doctors-edit.component';
import { BedsCreateComponent } from './components/beds/beds-create/beds-create.component';
import { BedsEditComponent } from './components/beds/beds-edit/beds-edit.component';
import { RoomsCreateComponent } from './components/rooms/rooms-create/rooms-create.component';
import { RoomsEditComponent } from './components/rooms/rooms-edit/rooms-edit.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { HospitalsCreateComponent } from './components/hospitals/hospitals-create/hospitals-create.component';
import { HospitalsEditComponent } from './components/hospitals/hospitals-edit/hospitals-edit.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { FacilitiesCreateComponent } from './components/facilities/facilities-create/facilities-create.component';
import { FacilitiesEditComponent } from './components/facilities/facilities-edit/facilities-edit.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { SchedulesCreateComponent } from './components/schedules/schedules-create/schedules-create.component';
import { SchedulesEditComponent } from './components/schedules/schedules-edit/schedules-edit.component';
import { MedicinelistsComponent } from './components/medicinelists/medicinelists.component';
import { MedicinelistsCreateComponent } from './components/medicinelists/medicinelists-create/medicinelists-create.component';
import { MedicinelistsEditComponent } from './components/medicinelists/medicinelists-edit/medicinelists-edit.component';
import { InptprescriptionsComponent } from './components/inptprescriptions/inptprescriptions.component';
import { InptprescriptionsCreateComponent } from './components/inptprescriptions/inptprescriptions-create/inptprescriptions-create.component';
import { InptprescriptionsEditComponent } from './components/inptprescriptions/inptprescriptions-edit/inptprescriptions-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    AdmissionComponent,
    HomeComponent,
    AppoinmentComponent,
    DoctorsComponent,
    DepartmentsComponent,
    DesignationsComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    ConfirmDeleteDialogComponent,

    AppoinmentCreateComponent,
    AppoinmentEditComponent,
    BedsComponent,
    RoomsComponent,
    AdmissionCreateComponent,
    AdmissionEditComponent,

    OutptpresccriptCreateComponent,
    OutptpresccriptComponent,
    OutptpresccriptEditComponent,
    TestlistsComponent,
    TestlistCreateComponent,
    TestlistEditComponent,
    DesignationCreateComponent,
    DesignationEditComponent,
    DoctorsCreateComponent,
    DoctorsEditComponent,
    BedsCreateComponent,
    BedsEditComponent,
    RoomsCreateComponent,
    RoomsEditComponent,
    HospitalsComponent,
    HospitalsCreateComponent,
    HospitalsEditComponent,
    FacilitiesComponent,
    FacilitiesCreateComponent,
    FacilitiesEditComponent,
    SchedulesComponent,
    SchedulesCreateComponent,
    SchedulesEditComponent,
    MedicinelistsComponent,
    MedicinelistsCreateComponent,
    MedicinelistsEditComponent,
    InptprescriptionsComponent,
    InptprescriptionsCreateComponent,
    InptprescriptionsEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModuleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe
  ],
  providers: [DatePipe,OutPtPresccriptsService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
