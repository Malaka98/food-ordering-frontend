import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Login} from "../../shared/login";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router,
              private _notification: NzNotificationService) {
  }

  ngOnInit(): void {
    let loginDto = new Login()
    this.loginForm = this._fb.group({
      username: [loginDto.username, [Validators.required]],
      password: [loginDto.password, [Validators.required]]
    })
  }

  loginHandler() {
    this._authService.login(this.loginForm.value).subscribe({
      next: (value) => {
        // console.log(value)
        this._notification.create(
          'success',
          'Log In',
          "You have successfully logged in"
        )
        setTimeout(() => {
          this._router.navigate(["/dashboard"]).then()
        }, 300)
      },
      error: err => {
        this._notification.create(
          'error',
          'Log In',
          "Somthing went wrong"
        )
        console.log(err.message)
      }
    })
  }

  get username() {
    return this.loginForm.get("username")
  }

  get password() {
    return this.loginForm.get("password")
  }
}
