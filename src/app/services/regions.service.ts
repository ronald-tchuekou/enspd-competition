/*
 * Copyright (c) 30/07/2022 17:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor() {
  }


  getRegions() {
    const candidates = [];
    for (let i = 1; i < 21; i++) {
      candidates.push({
        id: 'id' + i,
        label: 'Region ' + i,
        value: 'region' + i
      });
    }
    return of(candidates);
  }

  addRegion(data: any) {
    return of({
      id: 'id',
      label: 'Region',
      value: 'region'
    });
  }

  deleteRegion(id: string) {
    return of({ id });
  }

  updateRegion(data: any, id: string) {
    return of({ data });
  }

}
