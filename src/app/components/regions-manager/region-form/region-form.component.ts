/*
 * Copyright (c) 05/08/2022 06:18
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Region, RegionsService } from '../../../services/regions.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styles: []
})
export class RegionFormComponent implements OnInit {
  @Input() currentRegion: Region | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private regionsService: RegionsService,
    private sbr: MatSnackBar
  ) {
  }

  initForm() {
    this.libelle = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentRegion']) {
      this.initValues(changes['currentRegion'].currentValue);
      if (changes['currentRegion'].currentValue)
        this.title = 'Modification de la région';
      else
        this.title = 'Ajout d\'une région';
    }
  }

  ngOnInit(): void {
  }

  initValues(region: Region) {
    if (!region)
      return;
    this.libelle = region.libelle;
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

    if (this.currentRegion)
      this.updateRegion(data);
    else
      this.createRegion(data);
  }

  updateRegion(data: any) {
    this.loading = true;
    this.regionsService.updateRegion(data, this.currentRegion?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Région modifié avec succès.',
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

  createRegion(data: any) {
    this.loading = true;
    this.regionsService.addRegion(data).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Région ajouté avec succès.',
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
