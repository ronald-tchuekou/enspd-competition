/*
 * Copyright (c) 05/08/2022 06:33
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilieresService } from '../../../services/filieres.service';
import { Option, OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styles: []
})
export class OptionFormComponent implements OnInit {
  @Input() currentOption: Option | null = null;
  @Input() filieres: any[] = [];
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  code: string = '';
  filiere: string = '';
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private sbr: MatSnackBar
  ) {
  }

  initForm() {
    this.filiere = '';
    this.code = '';
    this.libelle = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentOption']) {
      this.initValues(changes['currentOption'].currentValue);
      if (changes['currentOption'].currentValue)
        this.title = 'Modification de l\'option';
      else
        this.title = 'Ajout d\'une option';
    }
  }

  ngOnInit(): void {
  }

  initValues(option: Option) {
    if (!option)
      return;
    this.filiere = option.filiere_id + '';
    this.code = option.code;
    this.libelle = option.libelle;
  }

  validate() {
    return this.code.trim() !== '' &&
      this.libelle.trim() !== '' && this.filiere !== '';
  }

  submit() {
    if (!this.validate()) {
      this.sbr.open('Veuillez indiquer tous les champs du formulaire.',
        undefined, { duration: 3000 });
      return;
    }
    const data = {
      filiere_id: this.filiere,
      code: this.code.trim(),
      libelle: this.libelle.trim()
    };

    if (this.currentOption)
      this.updateOption(data);
    else
      this.createOption(data);
  }

  updateOption(data: any) {
    this.loading = true;
    this.optionsService.updateOption(data, this.currentOption?.id)
      .subscribe({
        next: value => {
          console.log(value);
          this.loading = false;
          this.onComplete.emit();
          this.sbr.open('Option modifiée avec succès.',
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

  createOption(data: any) {
    this.loading = true;
    this.optionsService.addOption(data).subscribe({
      next: value => {
        console.log(value);
        this.loading = false;
        this.onComplete.emit();
        this.sbr.open('Option ajoutée avec succès.',
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

  getFilieres() {
    this.loading = true;
    this.filiereService.getFilieres().subscribe({
      next: value => {
        this.loading = false;
        this.filieres = [
          { label: '...', value: '' },
          ...value.map(item => ({ ...item, label: item.libelle, value: item.id }))
        ];
      },
      error: err => {
        this.loading = false;
        console.log(err);
      }
    });
  }
}
