/*
 * Copyright (c) 30/07/2022 17:06
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  server: string = environment.server_path + '/auth';

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post(this.server + '/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAccounts() {
    return this.http.get(this.server + '/users', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getAccountBy(find: any) {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get(this.server + 'users-by' + '?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addAccount(data: any) {
    return this.http.post(this.server + '/create', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteAccount(id: string) {
    return this.http.delete(this.server + '/delete/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateAccount(data: any, id: string) {
    return this.http.put(this.server + '/update' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  changePassword(data: { old_password: string; new_password: string }, id: number) {
    return this.http.put(this.server + '/change-pass/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
