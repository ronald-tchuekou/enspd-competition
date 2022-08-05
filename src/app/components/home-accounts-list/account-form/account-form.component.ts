/*
 * Copyright (c) 05/08/2022 03:49
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Account, AccountsService } from '../../../services/accounts.service';
import { Sexe } from '../../../services/candidates.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styles: []
})
export class AccountFormComponent implements OnInit, OnChanges {
  @Input() currentAccount: Account | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  name: string = '';
  surname: string = '';
  nationality: string = '';
  birthday: string = '';
  birthday_place: string = '';
  sex: string = '';
  email: string = '';
  phone: string = '';
  loading: boolean = false;
  title: string = 'Ajout d\'un compte';
  sex_content: any[] = [
    { label: '...', value: '' },
    { label: Sexe.M, value: Sexe.M },
    { label: Sexe.F, value: Sexe.F }
  ];

  constructor(
    private accountsService: AccountsService,
    private sbr: MatSnackBar
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentAccount']) {
      this.initValues(changes['currentAccount'].currentValue);
      if (changes['currentAccount'].currentValue)
        this.title = 'Modification du compte';
      else
        this.title = 'Ajout d\'un compte';
    }
  }

  ngOnInit(): void {
  }

  initValues(account: Account) {
    if (!account)
      return;
    this.name = account.name;
    this.surname = account.surname;
    this.nationality = account.nationality;
    this.birthday = moment(account.birthday).format('YYYY-MM-DD');
    this.birthday_place = account.birthday_place;
    this.sex = account.sex;
    this.phone = account.phone;
    this.email = account.email;
  }

  validate() {
    return this.name.trim() !== '' &&
      this.surname.trim() !== '' &&
      this.nationality.trim() !== '' &&
      this.birthday.trim() !== '' &&
      this.birthday_place.trim() !== '' &&
      this.sex !== '' &&
      this.phone.trim() !== '' &&
      this.email.trim() !== '';
  }

  submit() {
    if (!this.validate()) {
      this.sbr.open('Veuillez indiquer tous les champs du formulaire.',
        undefined, { duration: 3000 });
      return;
    }
    const data = {
      name: this.name.trim(),
      surname: this.surname.trim(),
      nationality: this.nationality.trim(),
      birthday: this.birthday.trim(),
      birthday_place: this.birthday_place.trim(),
      sex: this.sex.trim(),
      phone: this.phone.trim(),
      email: this.email.trim()
    };

    if (this.currentAccount)
      this.updateAccount(data);
    else
      this.createAccount(data);
  }

  updateAccount(data: any) {
    this.loading = true;
    this.accountsService.updateAccount(data, this.currentAccount?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Compte modifié avec succès.',
            undefined,
            { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          this.sbr.open('Une erreur est survenue.',
            undefined,
            { duration: 3000 });
        }
      });
  }

  createAccount(data: any) {
    this.loading = true;
    this.accountsService.addAccount({ ...data, password: 'password' }).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Compte ajouté avec succès.',
          undefined,
          { duration: 3000 });
      },
      error: err => {
        console.log(err);
        this.loading = false;
        this.sbr.open('Une erreur est survenue.',
          undefined,
          { duration: 3000 });
      }
    });
  }
}
