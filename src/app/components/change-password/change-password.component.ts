/*
 * Copyright (c) 30/07/2022 11:48
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: Account | any = {};
  old_password: string = '';
  new_password: string = '';
  pass_confirm: string = '';
  loading: boolean = false;

  constructor(private sbr: MatSnackBar, private accountService: AccountsService) {
  }

  ngOnInit(): void {
  }

  validate() {
    if (this.old_password.trim() === '') {
      this.sbr.open(
        'Veuillez indiquer l\'ancien mot de passe !',
        undefined,
        { duration: 3000 });
      return false;
    }
    if (this.new_password.trim() === '') {
      this.sbr.open(
        'Veuillez indiquer le nouveau mot de passe !',
        undefined,
        { duration: 3000 });
      return false;
    }
    if (this.pass_confirm.trim() === '') {
      this.sbr.open(
        'Veuillez indiquer la confirmation du nouveau mot de passe !',
        undefined,
        { duration: 3000 });
      return false;
    }
    if (this.new_password.trim() !== this.pass_confirm.trim()) {
      this.sbr.open(
        'Le mot de passe de confirmation est incorrect !',
        undefined,
        { duration: 3000 });
      return false;
    }
    return true;
  }

  submit() {
    if (!this.validate()) {
      return;
    }
    this.loading = true;
    this.accountService.changePassword({
      old_password: this.old_password.trim(),
      new_password: this.new_password.trim()
    }, this.user.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.loading = false;
        this.sbr.open(
          'Votre mot de passe est modifié !',
          undefined,
          { duration: 3000 }
        );
      },
      error: (error: any) => {
        this.loading = false;
        console.log(error);
        if (error.error)
          this.sbr.open(error.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open(
            'Une erreur est survenue, veuillez réessayer !',
            undefined,
            { duration: 3000 }
          );
      }
    });
  }
}
