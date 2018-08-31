import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthhenticated = false;
  private authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userAuthhenticated = this.authService.isAuth();
    this.authSubscription = this.authService.getAuthStatusListener()
                            .subscribe(isAuthenticated => {
                              this.userAuthhenticated = isAuthenticated;
                            });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
