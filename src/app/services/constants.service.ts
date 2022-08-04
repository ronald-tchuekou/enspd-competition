/*
 * Copyright (c) 30/07/2022 16:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() {
  }

  createSegments(table: Array<any>, limit: number): Array<Array<any>> {
    let result: Array<Array<any>> = [];
    let stack = 0;
    while (stack < table.length) {
      result.push(table.slice(stack, stack + limit));
      stack += limit;
    }
    const sub = table.slice(stack);
    if (sub.length !== 0) result.push(sub);
    return result;
  }

  getPercentage(total: number, count: number) {
    if (total === 0 || count === 0)
      return 0;
    return Math.floor((count * 100) / total);
  }
}
