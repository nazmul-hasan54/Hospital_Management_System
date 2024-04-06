import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmissionCreateComponent } from './components/admission/admission-create/admission-create.component';
import { AdmissionEditComponent } from './components/admission/admission-edit/admission-edit.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { AppoinmentCreateComponent } from './components/appoinment/appoinment-create/appoinment-create.component';
import { AppoinmentEditComponent } from './components/appoinment/appoinment-edit/appoinment-edit.component';
import { AppoinmentComponent } from './components/appoinment/appoinment.component';
import { BedsCreateComponent } from './components/beds/beds-create/beds-create.component';
import { BedsEditComponent } from './components/beds/beds-edit/beds-edit.component';
import { BedsComponent } from './components/beds/beds.component';
import { DepartmentCreateComponent } from './components/departments/department-create/department-create.component';
import { DepartmentEditComponent } from './components/departments/department-edit/department-edit.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DesignationCreateComponent } from './components/designations/designation-create/designation-create.component';
import { DesignationEditComponent } from './components/designations/designation-edit/designation-edit.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { DoctorsCreateComponent } from './components/doctors/doctors-create/doctors-create.component';
import { DoctorsEditComponent } from './components/doctors/doctors-edit/doctors-edit.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { FacilitiesCreateComponent } from './components/facilities/facilities-create/facilities-create.component';
import { FacilitiesEditComponent } from './components/facilities/facilities-edit/facilities-edit.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { HomeComponent } from './components/home/home.component';
import { HospitalsCreateComponent } from './components/hospitals/hospitals-create/hospitals-create.component';
import { HospitalsEditComponent } from './components/hospitals/hospitals-edit/hospitals-edit.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { InptprescriptionsCreateComponent } from './components/inptprescriptions/inptprescriptions-create/inptprescriptions-create.component';
import { InptprescriptionsEditComponent } from './components/inptprescriptions/inptprescriptions-edit/inptprescriptions-edit.component';
import { InptprescriptionsComponent } from './components/inptprescriptions/inptprescriptions.component';
import { MedicinelistsCreateComponent } from './components/medicinelists/medicinelists-create/medicinelists-create.component';
import { MedicinelistsEditComponent } from './components/medicinelists/medicinelists-edit/medicinelists-edit.component';
import { MedicinelistsComponent } from './components/medicinelists/medicinelists.component';
import { OutptpresccriptCreateComponent } from './components/outptpresccript/outptpresccript-create/outptpresccript-create.component';
import { OutptpresccriptEditComponent } from './components/outptpresccript/outptpresccript-edit/outptpresccript-edit.component';
import { OutptpresccriptComponent } from './components/outptpresccript/outptpresccript.component';
import { RoomsCreateComponent } from './components/rooms/rooms-create/rooms-create.component';
import { RoomsEditComponent } from './components/rooms/rooms-edit/rooms-edit.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { SchedulesCreateComponent } from './components/schedules/schedules-create/schedules-create.component';
import { SchedulesEditComponent } from './components/schedules/schedules-edit/schedules-edit.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { TestlistCreateComponent } from './components/testlists/testlist-create/testlist-create.component';
import { TestlistEditComponent } from './components/testlists/testlist-edit/testlist-edit.component';
import { TestlistsComponent } from './components/testlists/testlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admission', component: AdmissionComponent },
  { path: 'appoinment', component: AppoinmentComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'department-create', component: DepartmentCreateComponent },
  { path: 'department-edit/:id', component: DepartmentEditComponent },
  { path: 'appoinment-create', component: AppoinmentCreateComponent },
  { path: 'appoinment-edit/:id', component: AppoinmentEditComponent },
  { path: 'admission-create', component: AdmissionCreateComponent },
  { path: 'admission-edit/:id', component: AdmissionEditComponent },
  { path: 'OutPtPresccript', component: OutptpresccriptComponent },
  { path: 'OutPtPresccript-create', component: OutptpresccriptCreateComponent },
  { path: 'OutPtPresccript-edit/:id', component: OutptpresccriptEditComponent },
  { path: 'testlists', component: TestlistsComponent },
  { path: 'testlists-create', component: TestlistCreateComponent },
  { path: 'testlists-edit/:id', component: TestlistEditComponent },
  { path: 'designations', component: DesignationsComponent },
  { path: 'designation-create', component: DesignationCreateComponent },
  { path: 'designation-edit/:id', component: DesignationEditComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctors-create', component: DoctorsCreateComponent },
  { path: 'doctors-edit/:id', component: DoctorsEditComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room-create', component: RoomsCreateComponent },
  { path: 'rooms-edit/:id', component: RoomsEditComponent },
  { path: 'beds', component: BedsComponent },
  { path: 'beds-create', component: BedsCreateComponent },
  { path: 'beds-edit/:id', component: BedsEditComponent },
  { path: 'hospitals', component: HospitalsComponent },
  { path: 'hospitals-create', component: HospitalsCreateComponent },
  { path: 'hospitals-edit/:id', component: HospitalsEditComponent },
  { path: 'facilities', component: FacilitiesComponent },
  { path: 'facilities-create', component: FacilitiesCreateComponent },
  { path: 'facilities-edit/:id', component: FacilitiesEditComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'schedules-create', component: SchedulesCreateComponent },
  { path: 'schedules-edit/:id', component: SchedulesEditComponent },
  { path: 'medicinelists', component: MedicinelistsComponent },
  { path: 'medicinelists-create', component: MedicinelistsCreateComponent },
  { path: 'medicinelists-edit/:id', component: MedicinelistsEditComponent },
  { path: 'inptprescriptions', component: InptprescriptionsComponent },
  { path: 'inptprescriptions-create', component: InptprescriptionsCreateComponent },
  { path: 'inptprescriptions-edit/:id', component:  InptprescriptionsEditComponent},



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
