/*
 * Copyright (c) 30/07/2022 17:06
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Cursus } from './candidates.service';

export interface Collection {
  id?: number,
  name: string,
  candidate_count: number,
  admis_candidate_count: number,
  attente_candidate_count: number,
  level: number,
  cursus: Cursus,
  created_at?: Date,
  updated_at?: Date
}

export const DEFAULT_COLLECTION: Collection = {
  id: 0,
  name: '',
  candidate_count: 0,
  admis_candidate_count: 0,
  attente_candidate_count: 0,
  level: 1,
  cursus: Cursus.SI
};

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  server: string = environment.server_path + '/collection';

  constructor(private http: HttpClient) {
  }

  getCollections() {
    return this.http.get<Collection[]>(this.server, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getCollectionBy(find: any) {
    let query = '';
    Object.keys(find).forEach((item, index) => {
      if (index === 0)
        query += item + '=' + find[item];
      else
        query += '&' + item + '=' + find[item];
    });
    return this.http.get<Collection[]>(this.server + '/by?' + query, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addCollection(data: any) {
    return this.http.post<Collection>(this.server, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  deleteCollection(id: number) {
    return this.http.delete(this.server + '/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  updateCollection(data: any, id: number | undefined) {
    return this.http.put(this.server + '/' + id, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

}
