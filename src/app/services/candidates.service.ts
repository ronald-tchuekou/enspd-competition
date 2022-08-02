/*
 * Copyright (c) 30/07/2022 14:22
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  server: string = environment.server_path + '/candidate';

  constructor(private http: HttpClient) {
  }

  getCandidates() {
    return this.http.get(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getCandidatesBy(find: any) {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addCandidate(data: any) {
    return this.http.post(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteCandidate(id: string) {
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

  updateCandidate(data: any, id: string) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
