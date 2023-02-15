import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {User} from "../../shared/user";
import {passwordValidator} from "./password.validator";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  singUpForm!: FormGroup;
  isVisible = false;

  constructor(private fb: FormBuilder, private _authService: AuthService,
              private _notification: NzNotificationService, private _modal: NzModalService, private _router: Router) {
  }

  ngOnInit(): void {
    let user = new User()
    this.singUpForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      address: [user.address, Validators.required],
      username: [user.username, Validators.required],
      password: [user.password, Validators.required],
      confirmPassword: [user.confirmPassword, Validators.required],
      email: [user.email, Validators.required],
      phoneNumber: [user.phoneNumber, Validators.required]
    }, {validators: passwordValidator})
  }

  submitHandler() {
    if (this.singUpForm.invalid) {
      this.singUpForm.markAllAsTouched()
      this._notification.create(
        'error',
        'Validation Error',
        "Please fill this form correctly",
      )
    } else {
      this._authService.addUser(this.singUpForm.value).subscribe({
        next: value => {
          this.isVisible = true
          setTimeout(() => {
            this.isVisible = false
            this._router.navigate(["/login"]).then()
          }, 1500)
        },
        error: err => {
          this._notification.create(
            'error',
            'Internal Error',
            "Something went wrong!",
          )
        }
      })
    }
  }

  get firstName() {
    return this.singUpForm.get("firstName")
  }

  get lastName() {
    return this.singUpForm.get("lastName")
  }


  get username() {
    return this.singUpForm.get("username")
  }

  get address() {
    return this.singUpForm.get("address")
  }

  get password() {
    return this.singUpForm.get("password")
  }

  get confirmPassword() {
    return this.singUpForm.get("confirmPassword")
  }

  get email() {
    return this.singUpForm.get("email")
  }

  get phoneNumber() {
    return this.singUpForm.get("phoneNumber")
  }
}
