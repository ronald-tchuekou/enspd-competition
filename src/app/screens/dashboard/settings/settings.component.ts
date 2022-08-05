/*
 * Copyright (c) 02/08/2022 09:03
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../services/accounts.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  currentUser: Account | any = {};

  constructor(private local: LocalStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.local.getValue(environment.user_profile_key);
  }

}
