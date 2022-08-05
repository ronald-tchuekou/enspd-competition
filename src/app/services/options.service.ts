/*
 * Copyright (c) 30/07/2022 17:11
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Option {
  id: number,
  code: string,
  libelle: string,
  createdAt?: Date,
  updatedAt?: Date
}

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  server: string = environment.server_path + '/option';

  constructor(private http: HttpClient) {
  }

  getOptions(): Observable<Option[]> {
    return this.http.get<Option[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getOptionsBy(find: any): Observable<Option[]> {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Option[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addOption(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteOption(id: number) {
    return this.http.delete(this.server + '/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteAll() {
    return this.http.delete(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateOption(data: any, id: number | undefined) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
