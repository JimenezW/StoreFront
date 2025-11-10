import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import urlConstRouting from '../../../shared/constants/url-const.routing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private _router : Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.userService.login(user).subscribe({
        next: (response) => {
          let res = response;
          if (res != undefined && res?.ok) {
            const url =urlConstRouting.dashboard.base;
            this._router.navigateByUrl('/' + url);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Manejo de errores, mostrar mensajes al usuario, etc.
        }
      });
    }
  }

}
