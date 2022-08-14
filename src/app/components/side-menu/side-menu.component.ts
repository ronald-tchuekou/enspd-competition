/*
 * Copyright (c) 13/08/2022 18:24
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: []
})
export class SideMenuComponent implements OnInit {
  show: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    const path = window.location.href;
    if (path.includes('candidats-list')) this.show = true;
  }

}
