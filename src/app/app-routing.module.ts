import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './global/components/sidebar/sidebar.component';
import { FormularioComponent } from './features/web/components/formulario/formulario.component';
import { AgregarFormularioComponent } from './features/web/components/formulario/agregar-formulario/agregar-formulario.component';
import { UserComponent } from './features/web/components/user/user.component';
import { LandingPageComponent } from './features/web/components/landing-page/landing-page.component';
import { StudentListComponent } from './features/master/components/student/student-list/student-list.component';
import { AssigmentListComponent } from './features/transanccional/components/assignment/assigment-list/assigment-list.component';
import { StudyProgrammeListComponent } from './features/transanccional/components/studyProgramme/study-programme-list/study-programme-list.component';
import { EnrollmentDetailListComponent } from './features/transanccional/components/enrollmentDetail/enrollment-detail-list/enrollment-detail-list.component';

const routes: Routes = [

  { path: 'landing_page', component: LandingPageComponent },
  { path: '', redirectTo: '/landing_page', pathMatch: 'full' }, 
  { path: 'sidebar', component: SidebarComponent},
  { path: 'formulario', component: FormularioComponent },
  { path: 'formulario/agregar', component: AgregarFormularioComponent },
  { path: 'user', component: UserComponent },
  { path: 'studentList', component: StudentListComponent},
  { path: 'assign', component: AssigmentListComponent},
  { path: 'studyProgram', component: StudyProgrammeListComponent},
  { path: 'enrollmentDetail', component: EnrollmentDetailListComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
