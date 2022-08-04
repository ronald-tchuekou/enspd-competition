/*
 * Copyright (c) 30/07/2022 14:22
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export enum Cursus {SI = 'Science Ingénieur', IN = 'Ingénieur'}

export enum Sexe {M = 'Masculin', F = 'Feminin'}

export interface Candidate {
  id: number,
  nom: string,
  prenom: string,
  date_nais: Date,
  lieu_nais: string,
  region_origine: number,
  depart_origine: number,
  statut_mat: string,
  sexe: Sexe,
  nationalite: string,
  nom_pere: string,
  prof_pere: string,
  nom_mere: string,
  prof_mere: string,
  cursus: Cursus,
  niveau: number,
  filiere_choisie: number,
  option_choisie: number,
  diplome_entree: number,
  admis: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  server: string = environment.server_path + '/candidate';

  constructor(
    private http: HttpClient
  ) {
  }

  getCandidates() {
    return this.http.get<Candidate[]>(this.server, {
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
    return this.http.get<Candidate[]>(this.server + '/by?' + query, {
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
