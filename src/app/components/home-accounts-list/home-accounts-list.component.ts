/*
 * Copyright (c) 30/07/2022 20:31
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Account, AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-home-accounts-list',
  templateUrl: './home-accounts-list.component.html',
  styles: []
})
export class HomeAccountsListComponent implements OnInit {
  accounts: Account[] = [];
  loading: boolean = false;

  constructor(private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => this.accountService.getAccounts().subscribe({
      next: (data: Account[]) => {
        this.loading = false;
        this.accounts = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    }), 5000);
  }

}
