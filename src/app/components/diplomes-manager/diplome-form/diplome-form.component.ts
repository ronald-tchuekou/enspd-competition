/*
 * Copyright (c) 05/08/2022 05:55
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diplome, DiplomesService } from '../../../services/diplome.service';

@Component({
  selector: 'app-diplome-form',
  templateUrl: './diplome-form.component.html',
  styles: []
})
export class DiplomeFormComponent implements OnInit {
  @Input() currentDiplome: Diplome | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  code: string = '';
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private diplomesService: DiplomesService,
    private sbr: MatSnackBar
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDiplome']) {
      this.initValues(changes['currentDiplome'].currentValue);
      if (changes['currentDiplome'].currentValue)
        this.title = 'Modification du diplôme';
      else
        this.title = 'Ajout d\'un diplôme';
    }
  }

  initForm() {
    this.code = '';
    this.libelle = '';
  }

  ngOnInit(): void {
  }

  initValues(diplome: Diplome) {
    if (!diplome)
      return;
    this.code = diplome.code;
    this.libelle = diplome.libelle;
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

    if (this.currentDiplome)
      this.updateDiplome(data);
    else
      this.createDiplome(data);
  }

  updateDiplome(data: any) {
    this.loading = true;
    this.diplomesService.updateDiplome(data, this.currentDiplome?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Diplôme modifié avec succès.',
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

  createDiplome(data: any) {
    this.loading = true;
    this.diplomesService.addDiplome(data).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Diplôme ajouté avec succès.',
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
