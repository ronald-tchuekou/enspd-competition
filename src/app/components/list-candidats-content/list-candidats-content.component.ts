/*
 * Copyright (c) 29/07/2022 08:27
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidatesService } from '../../services/candidates.service';
import { ConstantsService } from '../../services/constants.service';
import { FilieresService } from '../../services/filieres.service';
import { OptionsService } from '../../services/options.service';

@Component({
  selector: 'app-list-candidats-content',
  templateUrl: './list-candidats-content.component.html',
  styles: []
})
export class ListCandidatsContentComponent implements OnInit {
  @Input() currentCandidate: any = null;
  @Output() currentCandidateChange = new EventEmitter();
  loading: boolean = false;
  content: any[] = [];
  filieres: any[] = [];
  options: any[] = [];
  currentPage: number = 0;
  pages: any[][] = [];
  limit: number = 50;
  candidate_name: string = '';
  filiere: string = '';
  option: string = '';

  constructor(
    private candidateService: CandidatesService,
    private constantService: ConstantsService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private sbr: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.loading = true;
    this.candidateService.getCandidates().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.filiereService.getFilieres().subscribe((data: any) => this.filieres = data);
        this.optionsService.getOptions().subscribe((data: any) => this.options = data);
        this.content = data;
        this.getPages(this.content);
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
    this.option = '';
    this.filiere = '';
    this.candidate_name = '';
    this.getPages(this.content);
  }

  filterContent() {
    const name = this.candidate_name.trim().toLowerCase();
    if (this.option === '' && name === '' && this.filiere === '') {
      this.getPages(this.content);
      return;
    }
    if (this.option !== '' && name === '' && this.filiere === '') {
      this.getPages(this.content.filter(item => item.opt_comp === this.option));
      return;
    }
    if (this.option === '' && name !== '' && this.filiere === '') {
      this.getPages(this.content.filter(item => item.nom.toLowerCase()
        .includes(name) || item.prenom.toLowerCase().includes(name)));
      return;
    }
    if (this.option === '' && name === '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.filiere === this.filiere));
      return;
    }
    if (this.option !== '' && name !== '' && this.filiere === '') {
      this.getPages(this.content.filter(item => item.opt_comp === this.option &&
        (item.lastname.toLowerCase().includes(name) ||
          item.firstname.toLowerCase().includes(name))));
      return;
    }
    if (this.option === '' && name !== '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => (item.lastname.toLowerCase().includes(name) ||
        item.firstname.toLowerCase().includes(name)) && item.filiere === this.filiere));
      return;
    }
    if (this.option !== '' && name === '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.opt_comp === this.option &&
        item.filiere === this.filiere));
      return;
    }
    if (this.option !== '' && name !== '' && this.filiere !== '') {
      this.getPages(this.content.filter(item => item.opt_comp === this.option &&
        (item.lastname.toLowerCase().includes(name) || item.firstname.toLowerCase().includes(name)) &&
        item.filiere === this.filiere));
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
}
