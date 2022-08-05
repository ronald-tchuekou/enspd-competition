/*
 * Copyright (c) 05/08/2022 06:33
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Option, OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styles: []
})
export class OptionListComponent implements OnInit {
  options: Option[] = [];
  loading: boolean = false;
  @Output() optionSelected = new EventEmitter();

  constructor(private optionService: OptionsService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getOptions();
  }

  getOptions() {
    this.loading = true;
    this.optionService.getOptions().subscribe({
      next: (data: Option[]) => {
        this.loading = false;
        this.options = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteOption(item: Option) {
    const response = confirm('Voulez-vous vraiment supprimer cette Option ?');
    if (response) {
      this.loading = true;
      this.optionService.deleteOption(item.id).subscribe({
        next: value => {
          this.getOptions();
          this.sbr.open('Option supprimée avec succès !', undefined,
            { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          if (err.error)
            this.sbr.open(err.error.message, undefined, { duration: 3000 });
          else
            this.sbr.open('Une erreur s\'est produite', undefined,
              { duration: 3000 });
        }
      });
    }
  }
}
