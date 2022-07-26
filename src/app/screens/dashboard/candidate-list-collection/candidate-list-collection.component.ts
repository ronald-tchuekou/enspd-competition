/*
 * Copyright (c) 14/08/2022 07:51
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportAllContentComponent } from '../../../components/modals/export-all-content/export-all-content.component';
import { ExportContentComponent } from '../../../components/modals/export-content/export-content.component';
import { ImportContentComponent } from '../../../components/modals/import-content/import-content.component';
import { CandidatesService, Cursus } from '../../../services/candidates.service';
import { Collection, CollectionsService } from '../../../services/collection.service';
import { ConstantsService } from '../../../services/constants.service';
import { DiplomesService } from '../../../services/diplome.service';
import { FilieresService } from '../../../services/filieres.service';
import { RegionsService } from '../../../services/regions.service';

@Component({
  selector: 'app-candidate-list-collection',
  templateUrl: './candidate-list-collection.component.html',
  styles: []
})
export class CandidateListCollectionComponent implements OnInit {
  loading: boolean = false;
  collections: Collection[] = [];
  filieres: any[] = [];
  regions: any[] = [];
  diplomes: any[] = [];
  level: number = 0;
  position: number = -1;
  cursus: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionsService,
    private candidateService: CandidatesService,
    private filiereService: FilieresService,
    private constantService: ConstantsService,
    private regionsService: RegionsService,
    private diplomesService: DiplomesService,
    private sbr: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log('Params : ', params);
      if (params['level']) {
        const p = params['level'].split('_');
        this.level = p[2];
        this.cursus = p[1] === 'in' ? Cursus.IN : Cursus.SI;
        this.collections = [];
        this.getCollections(this.level, this.cursus);
      }
    });
  }

  getCollections(level: number, cursus: string) {
    this.loading = true;
    this.diplomesService.getDiplomes().subscribe({
      next: (data1) => {
        this.diplomes = data1.map(item => ({ ...item, label: item.libelle, value: item.id }));
        this.regionsService.getRegions().subscribe({
          next: (regions) => {
            this.regions = regions.map(item => ({ ...item, label: item.libelle, value: item.id }));
            this.filiereService.getFilieresBy({
              cursus
            }).subscribe({
              next: (data) => {
                this.filieres = data.map(item => ({ ...item, label: item.libelle, value: item.id }));
                this.collectionService.getCollectionBy({ level, cursus }).subscribe({
                  next: (data) => {
                    this.collections = data;
                    this.loading = false;
                  },
                  error: (error: any) => {
                    this.loading = false;
                    console.log('Error when get candidates list : ', error);
                  }
                });
              },
              error: (error) => {
                this.loading = false;
                console.log(error);
              }
            });
          },
          error: (error) => {
            this.loading = false;
            console.log(error);
          }
        });
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      }
    });
  }

  deleteCollection(id: number | undefined) {
    const response = confirm('Voulez-vous vraiment supprimer cette list de candidates ?');
    if (response) {
      this.loading = true;
      this.collectionService.deleteCollection(id || 0).subscribe({
        next: () => {
          this.sbr.open('Liste supprimée avec succès !', undefined,
            { duration: 3000 });
          this.getCollections(this.level, this.cursus);
        },
        error: (error: any) => {
          this.loading = false;
          if (error.error)
            this.sbr.open(error.error.message, undefined,
              { duration: 3000 });
          else
            this.sbr.open('Une erreur est survenue', undefined,
              { duration: 3000 });
          console.log('Error when delete collection list : ', error);
        }
      });
    }
  }

  importList() {
    this.dialog.open(ImportContentComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((value) => {
      if (value) {
        this.getCollections(this.level, this.cursus);
      }
    });
  }

  export(collection: Collection, index: number) {
    this.position = index;
    this.candidateService.getPassCandidatesBy({
      collection_id: collection.id,
      attente: 1,
      admis: 1
    }).subscribe({
      next: (data) => {
        this.position = -1;
        this.dialog.open(ExportContentComponent, {
          disableClose: true,
          data: {
            cursus: collection.cursus,
            level: collection.level,
            candidates: data,
            filieres: collection.level === 1 ? '' : this.filieres,
            regions: this.regions
          }
        }).afterClosed().subscribe((data) => {
          if (data) {
            this.sbr.open('Liste exporter avec succès !',
              undefined, { duration: 3000 });
          }
        });
      },
      error: (error) => {
        this.position = -1;
        console.log(error);
        this.sbr.open('Une erreur est survenue, veuillez réessayer !',
          undefined, { duration: 3000 });
      }
    });
  }

  exportAll(collection: Collection, index: number) {
    this.position = index;
    this.candidateService.getCandidatesBy({
      collection_id: collection.id
    }).subscribe({
      next: (data) => {
        this.position = -1;
        this.dialog.open(ExportAllContentComponent, {
          disableClose: true,
          data: {
            cursus: collection.cursus,
            level: collection.level,
            candidates: data,
            filieres: collection.level === 1 ? '' : this.filieres,
            regions: this.regions,
            diplomes: this.diplomes
          }
        }).afterClosed().subscribe((data) => {
          if (data) {
            this.sbr.open('Liste exporter avec succès !',
              undefined, { duration: 3000 });
          }
        });
      },
      error: (error) => {
        this.position = -1;
        console.log(error);
        this.sbr.open('Une erreur est survenue, veuillez réessayer !',
          undefined, { duration: 3000 });
      }
    });
  }
}
