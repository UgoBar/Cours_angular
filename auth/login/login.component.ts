import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = false;

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.auth.authenticate(this.form.value).subscribe({
      next: () => this.router.navigateByUrl('/customers'),
      error: () => this.error = true,
    })
  }

}
