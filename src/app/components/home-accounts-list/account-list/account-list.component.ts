/*
 * Copyright (c) 05/08/2022 02:59
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account, AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styles: []
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  loading: boolean = false;
  @Output() accountSelected = new EventEmitter();

  constructor(private accountService: AccountsService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.loading = true;
    this.accountService.getAccounts().subscribe({
      next: (data: Account[]) => {
        this.loading = false;
        this.accounts = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteAccount(item: Account) {
    const response = confirm('Voulez-vous vraiment supprimer ce compte ?');
    if (response) {
      this.loading = true;
      this.accountService.deleteAccount(item.id).subscribe({
        next: value => {
          this.getAccounts();
          this.sbr.open('Compte supprimé avec succès !', undefined,
            { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          if (err.error)
            this.sbr.open(err.error.message, undefined, { duration: 3000 });
          else
            this.sbr.open('Une erreur s\'est produite', undefined,
              { duration: 3000 });
        }
      });
    }
  }
}
