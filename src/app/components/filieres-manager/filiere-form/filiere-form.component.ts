/*
 * Copyright (c) 05/08/2022 06:10
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filiere, FilieresService } from '../../../services/filieres.service';

@Component({
  selector: 'app-filiere-form',
  templateUrl: './filiere-form.component.html',
  styles: []
})
export class FiliereFormComponent implements OnInit {
  @Input() currentFiliere: Filiere | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  code: string = '';
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private filieresService: FilieresService,
    private sbr: MatSnackBar
  ) {
  }

  initForm() {
    this.code = '';
    this.libelle = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentFiliere']) {
      this.initValues(changes['currentFiliere'].currentValue);
      if (changes['currentFiliere'].currentValue)
        this.title = 'Modification du filière';
      else
        this.title = 'Ajout d\'un filière';
    }
  }

  ngOnInit(): void {
  }

  initValues(filiere: Filiere) {
    if (!filiere)
      return;
    this.code = filiere.code;
    this.libelle = filiere.libelle;
  }

  validate() {
    return this.code.trim() !== '' &&
      this.libelle.trim() !== '';
  }

  submit() {
    if (!this.validate()) {
      this.sbr.open('Veuillez indiquer tous les champs du formulaire.',
        undefined, { duration: 3000 });
      return;
    }
    const data = {
      code: this.code.trim(),
      libelle: this.libelle.trim()
    };

    if (this.currentFiliere)
      this.updateFiliere(data);
    else
      this.createFiliere(data);
  }

  updateFiliere(data: any) {
    this.loading = true;
    this.filieresService.updateFiliere(data, this.currentFiliere?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Filière modifiée avec succès.',
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

  createFiliere(data: any) {
    this.loading = true;
    this.filieresService.addFiliere(data).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Filière ajoutée avec succès.',
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
