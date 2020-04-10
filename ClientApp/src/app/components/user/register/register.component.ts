import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  invalidForm: boolean;

  public get controls() {
    return this.userForm.controls;
  }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.router.navigateByUrl('user/profile');
    } else {
      this.userForm = this.formBuilder.group({
        userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      let user: User = {
        name: this.controls['userName'].value,
        email: this.controls['email'].value,
        password: this.controls['password'].value
      };

      this.authService.registerUser(user)
        .subscribe(user => {
          if (user) {
            this.authService.setUser(user);
            window.location.reload();
          }
        });

    } else console.log('Invalid form');
  }
}
