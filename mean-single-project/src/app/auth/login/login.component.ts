import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  loginStatusSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loginStatusSubscription = this.authService.getAuthStatusListener()
    .subscribe(status => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login({email: form.value.email, password: form.value.password});
    form.resetForm();
  }

  ngOnDestroy() {
    this.loginStatusSubscription.unsubscribe();
  }
}
