/*
 * Copyright (c) 28/07/2022 09:17
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Account } from '../../services/accounts.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  user: Account;

  constructor(private cookie: LocalStorageService, private router: Router) {
    this.user = cookie.getValue(environment.user_profile_key);
  }

  ngOnInit(): void {
  }

  disconnect() {
    const response = confirm('Voulez-vous vraiment vous déconnecter ?');
    if (response) {
      this.cookie.removeValue(environment.user_profile_key);
      setTimeout(() => this.router.navigate(['sign-in']), 1000);
    }
    return false;
  }
}
