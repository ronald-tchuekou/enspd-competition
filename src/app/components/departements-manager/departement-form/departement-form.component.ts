/*
 * Copyright (c) 05/08/2022 06:55
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departement, DepartementsService } from '../../../services/departements.service';

@Component({
  selector: 'app-departement-form',
  templateUrl: './departement-form.component.html',
  styles: []
})
export class DepartementFormComponent implements OnInit {
  @Input() currentDepartement: Departement | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private departementsService: DepartementsService,
    private sbr: MatSnackBar
  ) {
  }

  initForm() {
    this.libelle = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDepartement']) {
      this.initValues(changes['currentDepartement'].currentValue);
      if (changes['currentDepartement'].currentValue)
        this.title = 'Modification de la département';
      else
        this.title = 'Ajout d\'une département';
    }
  }

  ngOnInit(): void {
  }

  initValues(departement: Departement) {
    if (!departement)
      return;
    this.libelle = departement.libelle;
  }

  validate() {
    return this.libelle.trim() !== '';
  }

  submit() {
    if (!this.validate()) {
      this.sbr.open('Veuillez indiquer tous les champs du formulaire.',
        undefined, { duration: 3000 });
      return;
    }
    const data = {
      libelle: this.libelle.trim()
    };

    if (this.currentDepartement)
      this.updateDepartement(data);
    else
      this.createDepartement(data);
  }

  updateDepartement(data: any) {
    this.loading = true;
    this.departementsService.updateDepartement(data, this.currentDepartement?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Département modifié avec succès.',
            undefined,
            { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          this.sbr.open('Une erreur est survenue.',
            undefined,
            { duration: 3000 });
        }
      });
  }

  createDepartement(data: any) {
    this.loading = true;
    this.departementsService.addDepartement(data).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Département ajouté avec succès.',
          undefined,
          { duration: 3000 });
      },
      error: err => {
        console.log(err);
        this.loading = false;
        this.sbr.open('Une erreur est survenue.',
          undefined,
          { duration: 3000 });
      }
    });
  }
}
