import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '../../../node_modules/@angular/common';
import { RouterModule } from '../../../node_modules/@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { AuthRouterModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    AuthRouterModule
  ]
})
export class AuthModule {}
