/*
 * Copyright (c) 28/07/2022 07:38
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  getValue(key: string) {
    return JSON.parse(window.localStorage.getItem(key) || 'null');
  }

  setValue(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeValue(key: string) {
    window.localStorage.removeItem(key);
  }

}
