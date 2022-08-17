/*
 * Copyright (c) 14/08/2022 13:32
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidate, CandidatesService, Cursus } from '../../../services/candidates.service';
import { Collection, CollectionsService, DEFAULT_COLLECTION } from '../../../services/collection.service';
import { ConstantsService } from '../../../services/constants.service';

@Component({
  selector: 'app-import-content',
  templateUrl: './import-content.component.html',
  styles: []
})
export class ImportContentComponent implements OnInit {
  @ViewChild('csv_file_input') csv_file_input: any;
  name: string = '';
  level: string = '';
  date: number = new Date().getTime();
  cursus: Cursus = Cursus.IN;
  levels: any[] = [
    { label: '...', value: '' },
    { label: 'Niveau 1', value: 1 },
    { label: 'Niveau 3', value: 3 }
  ];
  cursus_list: any[] = [
    { label: '...', value: '' },
    { label: Cursus.SI, value: Cursus.SI },
    { label: Cursus.IN, value: Cursus.IN }
  ];
  loading: boolean = false;
  collection: Collection = DEFAULT_COLLECTION;
  allCandidate: any[] = [];

  constructor(
    private collectionService: CollectionsService,
    private candidateService: CandidatesService,
    private sbr: MatSnackBar,
    private utils: ConstantsService,
    private ref: MatDialogRef<ImportContentComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data && data.level) {
      this.level = data.level;
    }
  }

  ngOnInit(): void {
  }

  importContent() {
    if (this.level !== '')
      this.csv_file_input.nativeElement.click();
    else
      this.sbr.open('Veuillez indiquer le niveau concerné', undefined,
        { duration: 3000 });
  }

  onCSVInputChange(event: any) {
    const file = event.target.files[0];
    console.log(file);
    if (file.type === 'text/csv') {
      const fr = new FileReader();
      this.loading = true;
      fr.readAsText(file);
      fr.onload = () => {
        this.formatCSV(fr.result);
      };
      fr.onerror = () => this.loading = false;
    } else {
      this.sbr.open('Le fichier doit être in fichier de type CSV avec pour séparateur le point virgule (;)',
        undefined, { duration: 5000 });
    }
  }

  formatCSV(data: any) {
    this.loading = true;
    const lines = data.split('\n');
    const headers = lines[0].replace('\r', '').split(';');
    const content: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] !== '') {
        const current = lines[i].replace('\r', '').split(';');
        let content_item = {};
        if (current[0] !== '')
          headers.forEach((item: any, index: number) => {
            if (item !== 'id')
              content_item = { ...content_item, [item]: current[index] };
          });
        content.push(content_item);
      }
    }

    this.allCandidate = content;

    // Create the collection.
    if (content.length === 0) return;
    const collection: Collection = {
      name: this.name.trim() === '' ? this.getDefaultName() : this.name.trim(),
      candidate_count: 0,
      admis_candidate_count: 0,
      attente_candidate_count: 0,
      level: parseInt(this.level),
      cursus: this.cursus
    };
    this.collectionService.addCollection(collection).subscribe({
      next: (data) => {
        this.collection = data;
        const pages = this.utils.createSegments(content.map((item: any) => {
          const candidate: Candidate = {
            nom: item.nom,
            prenom: item.prenom,
            date_nais: item?.date_nais?.split('/').reverse().join('-'),
            lieu_nais: item.lieu_nais,
            region_origine: item?.region_origine,//Math.floor((Math.random() * 10) + 1),
            depart_origine: item?.depart_origine,
            statut_mat: item.statut_mat,
            sexe: item.sexe,
            nationalite: item.nationalite,
            nom_pere: item.nom_pere,
            prof_pere: item.prof_pere,
            nom_mere: item.nom_mere,
            prof_mere: item.prof_mere,
            cursus: this.cursus,
            niveau: parseInt(this.level),
            admis: item.admis || false,
            attente: item.attente || false,
            filiere_choisie: item?.filiere_choisie || 0,
            option_choisie: item.option_choisie || 0,
            diplome_entree: item.diplome_entree || 0,
            collection_id: data.id || 0,
            note1: item.note1 || 0,
            note2: item.note2 || 0,
            note3: item.note3 || 0,
            average: item.average,
            range: item.range || 0,
            anonymous_num: item.anonymous_num || 0
          };
          return candidate;
        }), 100);
        this.saveContent(pages, 0);
      },
      error: err => {
        this.loading = false;
        if (err.error)
          this.sbr.open(err.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open(
            'Une erreur est survenue, veuillez réessayer.',
            undefined,
            { duration: 3000 });
      }
    });
  }

  saveContent(list: any[], nextPage: number) {
    if (list.length === 0) {
      this.loading = false;
      return;
    }
    this.candidateService.addCandidate(list[nextPage]).subscribe({
      next: () => {
        if (nextPage === (list.length - 1)) {
          this.collectionService.updateCollection({
            candidate_count: this.allCandidate.length,
            admis_candidate_count: this.allCandidate.filter(item => item.admis).length,
            attente_candidate_count: this.allCandidate.filter(item => item.attente).length,
            level: parseInt(this.level)
          }, this.collection.id || 0).subscribe({
            next: data => {
              this.loading = false;
              console.log(data);
              this.ref.close(true);
            },
            error: err => {
              this.loading = false;
              console.log(err);
              this.ref.close(true);
            }
          });
        } else {
          this.saveContent(list, nextPage + 1);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        if (error.error)
          this.sbr.open(error.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open(
            'Une erreur est survenue, veuillez réessayer.',
            undefined,
            { duration: 3000 });
      }
    });
  }

  getDefaultName() {
    return `Collection_level_${this.level}_${this.cursus}_${this.date}`;
  }

}
