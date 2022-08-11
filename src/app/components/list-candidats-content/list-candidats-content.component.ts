/*
 * Copyright (c) 29/07/2022 08:27
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import * as moment from 'moment';
import 'moment/locale/fr';
import { Candidate, CandidatesService, Cursus } from '../../services/candidates.service';
import { ConstantsService } from '../../services/constants.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { OptionsService } from '../../services/options.service';
import { ExportContentComponent } from '../modals/export-content/export-content.component';
import { ExportLevelCursusComponent } from '../modals/export-level-cursus/export-level-cursus.component';

moment.locale('fr');

@Component({
  selector: 'app-list-candidats-content',
  templateUrl: './list-candidats-content.component.html',
  styles: []
})
export class ListCandidatsContentComponent implements OnInit {
  @Input() currentCandidate: Candidate | null = null;
  @Output() currentCandidateChange = new EventEmitter();
  loading: boolean = false;
  content: Candidate[] = [];
  filieres: any[] = [];
  cursus_list: any[] = [
    { label: Cursus.SI, value: Cursus.SI },
    { label: Cursus.IN, value: Cursus.IN }
  ];
  currentPage: number = 0;
  pages: Candidate[][] = [];
  limit: number = 50;
  candidate_name: string = '';
  filiere: string = '';
  cursus: string = '';

  constructor(
    private candidateService: CandidatesService,
    private constantService: ConstantsService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private sbr: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.loading = true;
    this.candidateService.getCandidates().subscribe({
      next: (data: any) => {
        this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
          this.filieres = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
        });
        this.content = _.sortBy(data, ['nom', 'prenom']).map((item: any) => ({
          ...item,
          date_nais: moment(item.date_nais).format('YYYY-MM-DD'),
          cni_date: moment(item.cni_date).format('YYYY-MM-DD')
        }));
        this.getPages(this.content);
        this.loading = false;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  limitChange(value: string) {
    this.limit = parseInt(value);
    this.getPages(this.content);
  }

  getPages(content: any[]) {
    this.pages = this.constantService.createSegments(content, this.limit);
    this.currentPage = this.pages.length > 0 ? 1 : 0;
  }

  previousPage() {
    if (this.currentPage > 1)
      this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.pages.length)
      this.currentPage++;
  }

  setContent(content: any[]) {
    this.content = content;
    this.cursus = '';
    this.filiere = '';
    this.candidate_name = '';
    this.getPages(this.content);
  }

  filterContent() {
    const name = this.candidate_name.trim().toLowerCase();
    if (this.cursus === '' && name === '' && this.filiere === '') {
      this.getPages(this.content);
      return;
    }
    if (this.cursus !== '' && name === '' && this.filiere === '') {
      this.getPages(this.content.filter(item => item.cursus === this.cursus));
      return;
    }
    if (this.cursus === '' && name !== '' && this.filiere === '') {
      this.getPages(this.content.filter(item => {
        return item.nom?.toLowerCase()
          .includes(name) || item.prenom?.toLowerCase().includes(name);
      }));
      return;
    }
    if (this.cursus === '' && name === '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (this.cursus !== '' && name !== '' && this.filiere === '') {
      this.getPages(this.content.filter(item => item.cursus === this.cursus &&
        (item.nom?.toLowerCase().includes(name) ||
          item.prenom?.toLowerCase().includes(name))));
      return;
    }
    if (this.cursus === '' && name !== '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => (item.nom?.toLowerCase().includes(name) ||
        item.prenom?.toLowerCase().includes(name)) && item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (this.cursus !== '' && name === '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.cursus === this.cursus &&
        item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (this.cursus !== '' && name !== '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.cursus === this.cursus &&
        (item.nom?.toLowerCase().includes(name) || item.prenom?.toLowerCase().includes(name)) &&
        item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
  }

  deleteAll() {
    const response = confirm('Voulez-vous vraiment supprimer cette liste de candidates ?');
    if (response) {
      this.loading = true;
      this.candidateService.deleteAll().subscribe({
        next: () => {
          this.loading = false;
          this.getCandidates();
          this.sbr.open('Liste supprimer avec succès !', undefined, { duration: 3000 });
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
          if (error.error)
            this.sbr.open(error.error.message, undefined, { duration: 3000 });
          else
            this.sbr.open('une erreur est survenue.', undefined, { duration: 3000 });
        }
      });
    }
  }

  getFiliere(query: number) {
    return this.filieres.find(item => item.value === query)?.label || '';
  }

  filterFilieres(query: string) {
    return this.filieres.filter(item => item.cursus === query);
  }

  toggleAdmis(candidate: Candidate, index: number, page: number) {
    this.candidateService.updateCandidate({
      admis: !candidate.admis,
      attente: false
    }, candidate.id).subscribe({
      next: value => {
        console.log(value);
        const p = this.limit * (page - 1) + index;
        const c = { ...candidate, admis: !candidate.admis, attente: false };
        this.content = [
          ...this.content.slice(0, p),
          c,
          ...this.content.slice(p + 1)
        ];
        this.pages = this.constantService.createSegments(this.content, this.limit);
        if (this.currentCandidate) this.currentCandidateChange.emit(c);
      },
      error: err => {
        console.log(err);
        if (err.error)
          this.sbr.open(err.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open('Une erreur est survenu.', undefined, { duration: 3000 });
      }
    });
  }

  export() {
    if (this.content.length === 0) {
      this.sbr.open('La liste de candidats est vide.', undefined,
        { duration: 3000 });
      return;
    }
    this.dialog.open(ExportLevelCursusComponent, {
      disableClose: true
    }).afterClosed().subscribe(value => {
      if (value) {
        const data: any[] = [];
        this.content.filter(item => item.admis || item.attente).forEach(
          (item, index) => {
            if (item.nom)
              data.push({
                ...item,
                id: `${index + 1}`
              });
            else console.log(item);
          }
        );
        this.dialog.open(ExportContentComponent, {
          disableClose: true,
          data: {
            ...value,
            candidates: data.filter(item => item.cursus === value.cursus),
            options: this.cursus_list,
            filieres: this.filieres
          }
        }).afterClosed().subscribe(value => {
          if (value)
            this.export();
        });
      }
    });
  }

  toggleAttente(candidate: Candidate, index: number, page: number) {
    this.candidateService.updateCandidate({
      attente: !candidate.attente,
      admis: false
    }, candidate.id).subscribe({
      next: value => {
        console.log(value);
        const p = this.limit * (page - 1) + index;
        const c = { ...candidate, attente: !candidate.attente, admis: false };
        this.content = [
          ...this.content.slice(0, p),
          c,
          ...this.content.slice(p + 1)
        ];
        this.pages = this.constantService.createSegments(this.content, this.limit);
        if (this.currentCandidate) this.currentCandidateChange.emit(c);
      },
      error: err => {
        console.log(err);
        if (err.error)
          this.sbr.open(err.error.message, undefined, { duration: 3000 });
        else
          this.sbr.open('Une erreur est survenu.', undefined, { duration: 3000 });
      }
    });
  }
}
