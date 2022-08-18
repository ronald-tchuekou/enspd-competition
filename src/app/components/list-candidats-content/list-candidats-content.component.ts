/*
 * Copyright (c) 29/07/2022 08:27
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/fr';
import { Candidate, CandidatesService } from '../../services/candidates.service';
import { Collection, CollectionsService, DEFAULT_COLLECTION } from '../../services/collection.service';
import { ConstantsService } from '../../services/constants.service';
import { Filiere, FilieresService } from '../../services/filieres.service';
import { OptionsService } from '../../services/options.service';
import { Region, RegionsService } from '../../services/regions.service';
import { ExportContentComponent } from '../modals/export-content/export-content.component';

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
  regions: any[] = [];
  collection: Collection = DEFAULT_COLLECTION;
  currentPage: number = 0;
  pages: Candidate[][] = [];
  limit: number = 50;
  candidate_name: string = '';
  filiere: string = '';
  region: string = '';

  constructor(
    private collectionService: CollectionsService,
    private candidateService: CandidatesService,
    private constantService: ConstantsService,
    private filiereService: FilieresService,
    private regionService: RegionsService,
    private optionsService: OptionsService,
    private sbr: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const collection_id = params['collection_id'];
      if (collection_id) {
        this.getCandidates(collection_id);
        this.getCollection(collection_id);
      }
    });
  }

  getCandidates(collection_id: number) {
    this.loading = true;
    this.candidateService.getCandidatesBy({ collection_id: collection_id }).subscribe({
      next: (data: any) => {
        this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
          this.filieres = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
        });
        this.regionService.getRegions().subscribe((data: Region[]) => {
          this.regions = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
        });
        this.content = data.map((item: any) => ({
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

  getCollection(collection_id: number) {
    this.loading = true;
    this.collectionService.getCollectionBy({ id: collection_id }).subscribe({
      next: (data) => {
        this.collection = data[0];
      },
      error: (error: any) => {
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

  filterContent() {
    const name = this.candidate_name.trim().toLowerCase();
    if (name === '' && this.filiere === '' && this.region === '') {
      this.getPages(this.content);
      return;
    }
    if (name !== '' && this.filiere === '' && this.region === '') {
      this.getPages(this.content.filter(item => {
        return item.nom?.toLowerCase().includes(name) || item.prenom?.toLowerCase().includes(name);
      }));
      return;
    }
    if (name === '' && this.filiere !== '' && this.region === '') {
      this.getPages(this.content.filter(item => item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (name !== '' && this.filiere !== '' && this.region === '') {
      this.getPages(this.content.filter(item => (item.nom?.toLowerCase().includes(name) ||
        item.prenom?.toLowerCase().includes(name)) && item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (name !== '' && this.filiere === '' && this.region !== '') {
      this.getPages(this.content.filter(item => (item.nom?.toLowerCase().includes(name) ||
        item.prenom?.toLowerCase().includes(name)) && item.region_origine === parseInt(this.region)));
      return;
    }
    if (name === '' && this.filiere === '' && this.region !== '') {
      this.getPages(this.content.filter(item => item.region_origine === parseInt(this.region)));
      return;
    }
    if (name === '' && this.filiere !== '' && this.region !== '') {
      this.getPages(this.content.filter(item => item.region_origine === parseInt(this.region)
        && item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
    if (name !== '' && this.filiere !== '' && this.region !== '') {
      this.getPages(this.content.filter(item => (item.nom?.toLowerCase().includes(name) ||
          item.prenom?.toLowerCase().includes(name)) && item.region_origine === parseInt(this.region)
        && item.filiere_choisie === parseInt(this.filiere)));
      return;
    }
  }

  deleteAll() {
    const response = confirm('Voulez-vous vraiment supprimer cette liste de candidates ?');
    if (response) {
      this.loading = true;
      this.collectionService.deleteCollection(this.collection.id || 0).subscribe({
        next: () => {
          this.loading = false;
          this.sbr.open('Liste supprimer avec succès !', undefined, { duration: 3000 });
          window.history.back();
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

  filterFilieres() {
    return this.filieres.filter(item => item.cursus === this.collection.cursus);
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
        this.collectionService.updateCollection({
          admis_candidate_count: this.getAdmisCount()
        }, this.collection.id).subscribe({
          error: err => {
            console.log('Error when update collection update :', err);
          }
        });
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
        cursus: this.collection.cursus,
        level: this.collection.level,
        candidates: data,
        filieres: this.collection.level === 1 ? '' : this.filieres,
        regions: this.regions
      }
    }).afterClosed().subscribe(value => {
      if (value)
        this.export();
    });
  }

  getAdmisCount() {
    return this.content.filter(item => item.admis).length;
  }

  getAttenteCount() {
    return this.content.filter(item => item.attente).length;
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
        this.collectionService.updateCollection({
          attente_candidate_count: this.getAttenteCount()
        }, this.collection.id).subscribe({
          error: err => {
            console.log('Error when update collection update :', err);
          }
        });
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
