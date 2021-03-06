import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// side modules
import { QuillModule} from 'ngx-quill';
// custom modules
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthService } from '../admin/shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from '../search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: LoginPageComponent },
        { path: 'dashboard', component: DashboardPageComponent, canActivate: [ AuthGuard ] },
        { path: 'create', component: CreatePageComponent, canActivate: [ AuthGuard ] },
        { path: 'post/:id/edit', component: EditPageComponent, canActivate: [ AuthGuard ] }
      ] }
    ])
  ],
  exports: [],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe
  ],
  providers: [ AuthService, AuthGuard ]
})

export class AdminModule {

}


