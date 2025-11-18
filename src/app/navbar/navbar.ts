import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  public authService = inject(AuthService);
}
