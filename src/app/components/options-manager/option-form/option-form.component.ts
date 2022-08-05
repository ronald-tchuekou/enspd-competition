/*
 * Copyright (c) 05/08/2022 06:33
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Option, OptionsService } from '../../../services/options.service';

@Component({
  selector: 'app-option-form',
  templateUrl: './option-form.component.html',
  styles: []
})
export class OptionFormComponent implements OnInit {
  @Input() currentOption: Option | null = null;
  @Output() onComplete = new EventEmitter();
  @Output() onBackClick = new EventEmitter();
  code: string = '';
  libelle: string = '';
  title: string = '';
  loading: boolean = false;

  constructor(
    private optionsService: OptionsService,
    private sbr: MatSnackBar
  ) {
  }

  initForm() {
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
    this.code = option.code;
    this.libelle = option.libelle;
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
}
