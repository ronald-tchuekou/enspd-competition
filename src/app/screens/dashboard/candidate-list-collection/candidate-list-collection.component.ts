/*
 * Copyright (c) 14/08/2022 07:51
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportContentComponent } from '../../../components/modals/import-content/import-content.component';
import { Cursus } from '../../../services/candidates.service';
import { Collection, CollectionsService } from '../../../services/collection.service';
import { ConstantsService } from '../../../services/constants.service';

@Component({
  selector: 'app-candidate-list-collection',
  templateUrl: './candidate-list-collection.component.html',
  styles: []
})
export class CandidateListCollectionComponent implements OnInit {
  loading: boolean = false;
  collections: Collection[] = [];
  level: number = 0;
  cursus: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private collectionService: CollectionsService,
    private constantService: ConstantsService,
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
}
