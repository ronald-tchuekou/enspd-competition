/*
 * Copyright (c) 28/07/2022 01:04
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private router: Router, private cookie: CookiesService) {
  }

  ngOnInit(): void {
  }

  submit() {
    const data = {
      email: this.email,
      password: this.password
    };
    console.log(data);
    this.cookie.setValue(environment.user_profile_key, data);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['dashboard']).then(() => {
      });
    }, 2000);
    // TODO
  }
}
