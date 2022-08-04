/*
 * Copyright (c) 28/07/2022 01:04
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Account, AccountsService } from '../../services/accounts.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: []
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    private cookie: LocalStorageService,
    private sbr: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  validateData() {
    return this.email.trim() !== '' && this.password.trim() !== '';
  }

  submit() {
    if (!this.validateData()) {
      this.sbr.open(
        'Veuillez indiquer tous les champs du formulaire.',
        undefined,
        { duration: 3000 }
      );
      return;
    }

    this.loading = true;
    this.accountService.login(this.email, this.password).subscribe({
      next: (data: Account) => {
        console.log(data);
        this.cookie.setValue(environment.user_profile_key, data);
        this.loading = false;
        this.router.navigate(['dashboard']).then(() => {
        });
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        if (error.error.message)
          this.sbr.open(error.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open('Une erreur est survenue, veuillez réessayer.',
            undefined, { duration: 3000 });
      }
    });
  }

  resetPassword() {
    return this.router.navigate(['pass-forget']);
  }
}
