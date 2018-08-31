import { Component, OnInit } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpStatus: boolean;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const authData: AuthData = {
      email: form.value.email,
      password: form.value.password
    };
    this.authService.signUp(authData);
    form.resetForm();
  }

}
