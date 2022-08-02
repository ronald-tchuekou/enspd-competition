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
export class OptionsService {

  constructor() {
  }


  getOptions() {
    const candidates = [];
    for (let i = 1; i < 21; i++) {
      candidates.push({
        id: 'id' + i,
        label: 'Option ' + i,
        value: 'option' + i
      });
    }
    return of(candidates);
  }

  addOption(data: any) {
    return of({
      id: 'id',
      label: 'Option',
      value: 'option'
    });
  }

  deleteOption(id: string) {
    return of({ id });
  }

  updateOption(data: any, id: string) {
    return of({ data });
  }

}
