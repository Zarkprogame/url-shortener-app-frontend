import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-success',
  imports: [],
  templateUrl: './auth-success.html',
})
export class AuthSuccess implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.handleCallback(window.location.href)) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
