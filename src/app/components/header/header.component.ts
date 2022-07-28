/*
 * Copyright (c) 28/07/2022 09:17
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookiesService } from '../../services/cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private cookie: CookiesService, private router: Router) {
  }

  ngOnInit(): void {
  }

  disconnect() {
    const response = confirm('Voulez-vous vraiment vous déconnecter ?');
    if (response) {
      this.cookie.removeValue(environment.user_profile_key);
      setTimeout(() => this.router.navigate(['sign-in']), 2000);
    }
    return false;
  }
}