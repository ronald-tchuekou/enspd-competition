/*
 * Copyright (c) 30/07/2022 17:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Departement {
  id: number,
  libelle: string,
  createdAt?: Date,
  updatedAt?: Date
}

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {

  server: string = environment.server_path + '/departement';

  constructor(private http: HttpClient) {
  }

  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getDepartementsBy(find: any): Observable<Departement[]> {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Departement[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addDepartement(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteDepartement(id: number) {
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

  updateDepartement(data: any, id: number | undefined) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
