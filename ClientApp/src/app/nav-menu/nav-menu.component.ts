import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  public isLogged: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.onCheckUser();
  }

  onLogout(): void {
    this.authService.logoutUser();
    this.isLogged = false;
    window.location.reload();
  }

  onCheckUser(): void {
    if (this.authService.getCurrentUser()) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
  }
}
