/*
 * Copyright (c) 30/07/2022 17:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Region {
  id: number,
  libelle: string,
  created_at?: Date,
  updated_at?: Date
}

export const DEFAULT_REGION: Region = {
  id: 0,
  libelle: ''
};

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  server: string = environment.server_path + '/region';

  constructor(private http: HttpClient) {
  }

  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getRegionsBy(find: any): Observable<Region[]> {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Region[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addRegion(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteRegion(id: number) {
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

  updateRegion(data: any, id: number | undefined) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
