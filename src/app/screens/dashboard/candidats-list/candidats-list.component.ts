/*
 * Copyright (c) 30/07/2022 06:38
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ListCandidatsContentComponent
} from '../../../components/list-candidats-content/list-candidats-content.component';
import { CandidatesService } from '../../../services/candidates.service';
import { ConstantsService } from '../../../services/constants.service';

@Component({
  selector: 'app-candidats-list',
  templateUrl: './candidats-list.component.html',
  styles: []
})
export class CandidatsListComponent implements OnInit {
  tab_index: number = 0;
  currentCandidate: any;
  @ViewChild('csv_file_input') csv_file_input: any;
  @ViewChild('listCandidatsContentComponent') listCandidate: ListCandidatsContentComponent | undefined;
  file_loading: boolean = false;

  constructor(
    private candidateService: CandidatesService,
    private sbr: MatSnackBar,
    private utils: ConstantsService
  ) {
  }

  ngOnInit(): void {
  }

  deleteCurrent() {
    // TODO
  }

  choseCSVFile() {
    this.csv_file_input.nativeElement.click();
  }

  onCSVInputChange(event: any) {
    const fr = new FileReader();
    this.file_loading = true;
    fr.readAsText(event.target.files[0]);
    fr.onload = () => {
      this.formatCSV(fr.result);
    };
    fr.onerror = () => this.file_loading = false;
  }

  formatCSV(data: any) {
    this.file_loading = true;
    const lines = data.split('\n');
    const headers = lines[0].split(';');
    const content = [];
    for (let i = 1; i < lines.length; i++) {
      const current = lines[i].split(';');
      let content_item = {};
      if (current[0] !== '')
        headers.forEach((item: any, index: number) => {
          if (item !== 'id')
            content_item = { ...content_item, [item]: current[index] };
        });
      content.push(content_item);
    }
    const pages = this.utils.createSegments(content.map((item: any) => ({
      nom: item.nom,
      prenom: item.prenom,
      date_nais: item?.date_nais?.split('/').reverse().join('-'),
      lieu_nais: item.lieu_nais,
      region_origine: item?.centre_origin,
      depart_origine: item?.dpt_origine,
      statut_mat: item.statut_mat,
      sexe: item.sexe,
      nationalite: item.nationalite,
      nom_pere: item.nom_pere,
      prof_pere: item.prof_pere,
      nom_mere: item.nom_mere,
      prof_mere: item.prof_mere,
      cursus: 'Ingénieur',
      niveau: item?.niveau || 1,
      filiere_choisie: item?.filiere || -1,
      option_choisie: -1,
      diplome_entree: item.diplome_requis_par_option_id
    })), 100);

    this.candidateService.deleteAll().subscribe({
      next: () => {
        this.saveContent(pages, 0);
      },
      error: (error: any) => {
        console.log(error);
        this.file_loading = false;
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

  saveContent(list: any[], nextPage: number) {
    if (list.length === 0) {
      this.file_loading = false;
      return;
    }
    this.candidateService.addCandidate(list[nextPage]).subscribe({
      next: (data: any) => {
        if (nextPage === (list.length - 1)) {
          this.file_loading = false;
          this.listCandidate?.getCandidates();
          console.log(data);
        } else {
          this.saveContent(list, nextPage + 1);
        }
      },
      error: (error: any) => {
        console.log(error);
        this.file_loading = false;
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
}
