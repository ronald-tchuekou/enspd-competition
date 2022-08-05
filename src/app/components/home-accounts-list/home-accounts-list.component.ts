/*
 * Copyright (c) 30/07/2022 20:31
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { Account } from '../../services/accounts.service';

@Component({
  selector: 'app-home-accounts-list',
  templateUrl: './home-accounts-list.component.html',
  styles: []
})
export class HomeAccountsListComponent implements OnInit {
  currentAccount: Account | null = null;
  newAccount: any = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
