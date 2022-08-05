/*
 * Copyright (c) 05/08/2022 05:47
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diplome, DiplomesService } from '../../../services/diplome.service';

@Component({
  selector: 'app-diplome-list',
  templateUrl: './diplome-list.component.html',
  styles: []
})
export class DiplomeListComponent implements OnInit {
  diplomes: Diplome[] = [];
  loading: boolean = false;
  @Output() diplomeSelected = new EventEmitter();

  constructor(private diplomeService: DiplomesService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getDiplomes();
  }

  getDiplomes() {
    this.loading = true;
    this.diplomeService.getDiplomes().subscribe({
      next: (data: Diplome[]) => {
        this.loading = false;
        this.diplomes = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteDiplome(item: Diplome) {
    const response = confirm('Voulez-vous vraiment supprimer ce Diplôme ?');
    if (response) {
      this.loading = true;
      this.diplomeService.deleteDiplome(item.id).subscribe({
        next: value => {
          this.getDiplomes();
          this.sbr.open('Diplôme supprimé avec succès !', undefined,
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
