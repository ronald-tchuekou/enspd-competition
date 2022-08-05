/*
 * Copyright (c) 30/07/2022 17:11
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Filiere {
  id: number,
  code: string,
  libelle: string,
  createdAt?: Date,
  updatedAt?: Date
}

@Injectable({
  providedIn: 'root'
})
export class FilieresService {

  server: string = environment.server_path + '/filiere';

  constructor(private http: HttpClient) {
  }

  getFilieres(): Observable<Filiere[]> {
    return this.http.get<Filiere[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getFilieresBy(find: any): Observable<Filiere[]> {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Filiere[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addFiliere(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteFiliere(id: number) {
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

  updateFiliere(data: any, id: number | undefined) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
