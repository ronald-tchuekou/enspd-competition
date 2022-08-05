/*
 * Copyright (c) 05/08/2022 06:55
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departement, DepartementsService } from '../../../services/departements.service';

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styles: []
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];
  loading: boolean = false;
  @Output() departementSelected = new EventEmitter();

  constructor(private departementService: DepartementsService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getDepartements();
  }

  getDepartements() {
    this.loading = true;
    this.departementService.getDepartements().subscribe({
      next: (data: Departement[]) => {
        this.loading = false;
        this.departements = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteDepartement(item: Departement) {
    const response = confirm('Voulez-vous vraiment supprimer cet Département ?');
    if (response) {
      this.loading = true;
      this.departementService.deleteDepartement(item.id).subscribe({
        next: value => {
          this.getDepartements();
          this.sbr.open('Département supprimé avec succès !', undefined,
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
