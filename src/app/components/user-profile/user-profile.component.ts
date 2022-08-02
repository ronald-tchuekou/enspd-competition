/*
 * Copyright (c) 30/07/2022 11:37
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {
  @Input() currentUser: any = {};
  labels: any = {
    sex: 'Sex :',
    nationality: 'Nationalité :',
    phone: 'Téléphone :',
    email: 'Adresse e-mail :'
  };
  keys: string[] = Object.keys(this.labels);

  constructor() {
  }

  ngOnInit(): void {

  }

  getBirthday(birthday: string) {
    return moment(birthday).format('DD MMMM YYYY');
  }
}
