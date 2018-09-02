import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signUpStatus: boolean;
  isLoading = false;
  signUpStatusSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signUpStatusSubscription = this.authService.getAuthStatusListener()
    .subscribe(status => {
      this.isLoading = status;
    });
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

  ngOnDestroy() {
    this.signUpStatusSubscription.unsubscribe();
  }

}
