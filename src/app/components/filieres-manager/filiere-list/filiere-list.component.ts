/*
 * Copyright (c) 05/08/2022 06:10
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filiere, FilieresService } from '../../../services/filieres.service';

@Component({
  selector: 'app-filiere-list',
  templateUrl: './filiere-list.component.html',
  styles: []
})
export class FiliereListComponent implements OnInit {
  filieres: Filiere[] = [];
  loading: boolean = false;
  @Output() filiereSelected = new EventEmitter();

  constructor(private filiereService: FilieresService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getFilieres();
  }

  getFilieres() {
    this.loading = true;
    this.filiereService.getFilieres().subscribe({
      next: (data: Filiere[]) => {
        this.loading = false;
        this.filieres = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteFiliere(item: Filiere) {
    const response = confirm('Voulez-vous vraiment supprimer ce compte ?');
    if (response) {
      this.loading = true;
      this.filiereService.deleteFiliere(item.id).subscribe({
        next: value => {
          this.getFilieres();
          this.sbr.open('Compte supprimé avec succès !', undefined,
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
