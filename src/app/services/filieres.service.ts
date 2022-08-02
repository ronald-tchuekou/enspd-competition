/*
 * Copyright (c) 30/07/2022 17:11
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilieresService {

  constructor() {
  }


  getFilieres() {
    const candidates = [];
    for (let i = 1; i < 21; i++) {
      candidates.push({
        id: 'id' + i,
        label: 'Filiere ' + i,
        value: 'filiere' + i
      });
    }
    return of(candidates);
  }

  addFiliere(data: any) {
    return of({
      id: 'id',
      label: 'Filiere',
      value: 'filiere'
    });
  }

  deleteFiliere(id: string) {
    return of({ id });
  }

  updateFiliere(data: any, id: string) {
    return of({ data });
  }

}
