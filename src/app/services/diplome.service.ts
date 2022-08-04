/*
 * Copyright (c) 30/07/2022 17:11
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Diplome {
  id: number,
  code: string,
  libelle: string,
  createdAt?: Date,
  updatedAt?: Date
}

@Injectable({
  providedIn: 'root'
})
export class DiplomesService {

  server: string = environment.server_path + '/diplome';

  constructor(private http: HttpClient) {
  }

  getDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getDiplomesBy(find: any): Observable<Diplome[]> {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Diplome[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addDiplome(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteDiplome(id: string) {
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

  updateDiplome(data: any, id: string) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
