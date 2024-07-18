import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { StudentListComponent } from './features/master/components/student/student-list/student-list.component';
import { UserService } from './features/web/components/services/user.service';
import { FormularioComponent } from './features/web/components/formulario/formulario.component';
import { AgregarFormularioComponent } from './features/web/components/formulario/agregar-formulario/agregar-formulario.component';
import { AgregarUserComponent } from './features/web/components/user/agregar-user/agregar-user.component';
import { UserComponent } from './features/web/components/user/user.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './features/web/components/landing-page/landing-page.component';
import { StudentFormComponent } from './features/master/components/student/student-form/student-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TopbarComponent } from './global/components/topbar/topbar.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ApiReniecService } from './features/master/services/api-reniec.service';
import { StudentDetailsComponent } from './features/master/components/student/student-details/student-details.component';
import { AssigmentListComponent } from './features/transanccional/components/assignment/assigment-list/assigment-list.component';
import { AssigmentFormComponent } from './features/transanccional/components/assignment/assigment-form/assigment-form.component';
import { StudyProgrammeListComponent } from './features/transanccional/components/studyProgramme/study-programme-list/study-programme-list.component';
import { StudyProgrammeFormComponent } from './features/transanccional/components/studyProgramme/study-programme-form/study-programme-form.component';
import { StudyProgrammeDetailsComponent } from './features/transanccional/components/studyProgramme/study-programme-details/study-programme-details.component';
import { EnrollmentDetailListComponent } from './features/transanccional/components/enrollmentDetail/enrollment-detail-list/enrollment-detail-list.component';
import { EnrollmentDetailFormComponent } from './features/transanccional/components/enrollmentDetail/enrollment-detail-form/enrollment-detail-form.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProfileListComponent } from './features/master/components/profile/profile-list/profile-list.component';
import { ProfileFormComponent } from './features/master/components/profile/profile-form/profile-form.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FormularioComponent,
    AgregarFormularioComponent,
    AgregarUserComponent,
    UserComponent,
    SidebarComponent,
    StudentListComponent,
    StudentFormComponent,
    UserComponent,
    TopbarComponent,
    StudentDetailsComponent,
    AssigmentListComponent,
    AssigmentFormComponent,
    StudyProgrammeListComponent,
    StudyProgrammeFormComponent,
    StudyProgrammeDetailsComponent,
    EnrollmentDetailListComponent,
    EnrollmentDetailFormComponent,
    ProfileListComponent,
    ProfileFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule, // Asegúrate de que el módulo de enrutamiento esté importado
    RouterModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    MultiSelectModule,
    DropdownModule,
  ],
  providers: [
    ApiReniecService,
    UserService,
    NgbModal,
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
