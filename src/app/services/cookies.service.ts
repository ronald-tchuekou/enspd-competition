/*
 * Copyright (c) 28/07/2022 07:38
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookie: CookieService) {
  }

  getValue(key: string) {
    return JSON.parse(this.cookie.get(key) || 'null');
  }

  getAllValue() {
    return this.cookie.getAll();
  }

  setValue(key: string, value: any) {
    this.cookie.set(key, JSON.stringify(value), 30);
  }

  removeValue(key: string) {
    this.cookie.delete(key);
  }

  removeAll() {
    this.cookie.deleteAll();
  }
}
