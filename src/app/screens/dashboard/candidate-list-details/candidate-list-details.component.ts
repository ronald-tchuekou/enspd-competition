/*
 * Copyright (c) 14/08/2022 07:47
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  ListCandidatsContentComponent
} from '../../../components/list-candidats-content/list-candidats-content.component';
import { ImportContentComponent } from '../../../components/modals/import-content/import-content.component';
import { Candidate, CandidatesService } from '../../../services/candidates.service';
import { Collection, CollectionsService, DEFAULT_COLLECTION } from '../../../services/collection.service';
import { ConstantsService } from '../../../services/constants.service';
import { DepartementsService } from '../../../services/departements.service';
import { Diplome, DiplomesService } from '../../../services/diplome.service';
import { Filiere, FilieresService } from '../../../services/filieres.service';
import { Option, OptionsService } from '../../../services/options.service';
import { Region, RegionsService } from '../../../services/regions.service';

@Component({
  selector: 'app-candidate-list-details',
  templateUrl: './candidate-list-details.component.html',
  styles: []
})
export class CandidateListDetailsComponent implements OnInit {
  tab_index: number = 0;
  currentCandidate: Candidate | any;
  @ViewChild('csv_file_input') csv_file_input: any;
  @ViewChild('listCandidatsContentComponent') listCandidate: ListCandidatsContentComponent | undefined;
  file_loading: boolean = false;
  filieres: any[] = [];
  options: any[] = [];
  departments: any[] = [];
  regions: any[] = [];
  diplomes: any[] = [];
  loading: boolean = false;
  collection: Collection = DEFAULT_COLLECTION;

  constructor(
    private collectionService: CollectionsService,
    private candidateService: CandidatesService,
    private sbr: MatSnackBar,
    private dialog: MatDialog,
    private utils: ConstantsService,
    private filiereService: FilieresService,
    private optionsService: OptionsService,
    private regionsService: RegionsService,
    private departementsService: DepartementsService,
    private diplomesService: DiplomesService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const collection_id = params['collection_id'];
      if (collection_id) {
        this.loading = true;
        this.collectionService.getCollectionBy({ id: collection_id }).subscribe({
          next: (data) => {
            this.collection = data[0];
          },
          error: err => {
            console.log(err);
          }
        });
        this.getContent();
      }
    });
  }

  deleteCurrent() {
    // TODO
  }

  getContent() {
    this.filiereService.getFilieres().subscribe((data: Filiere[]) => {
      this.filieres = [{ label: '...', value: '' },
        ...data.map(item => ({ ...item, label: item.libelle, value: item.id }))];
      // Loading options
      this.optionsService.getOptions().subscribe((data: Option[]) => {
        this.options = [{ label: '...', value: '' },
          ...data.map(item => ({ ...item, label: item.libelle, value: item.id }))];
        // Loading regions
        this.regionsService.getRegions().subscribe((data: Region[]) => {
          this.regions = [{ label: '...', value: '' },
            ...data.map(item => ({ ...item, label: item.libelle, value: item.id }))];
          // Loading departments
          this.departementsService.getDepartements().subscribe((data: Region[]) => {
            this.departments = [{ label: '...', value: '' },
              ...data.map(item => ({ ...item, label: item.libelle, value: item.id }))];
            // Loading diplomas
            this.diplomesService.getDiplomes().subscribe((data: Diplome[]) => {
              this.loading = false;
              this.diplomes = [{ label: '...', value: '' },
                ...data.map(item => ({ ...item, label: item.libelle, value: item.id }))];
            });
          });
        });
      });
    });
  }

  importList() {
    this.dialog.open(ImportContentComponent, {
      disableClose: true,
      data: {
        level: this.collection.level
      }
    }).afterClosed().subscribe(data => {
      if (data) {
        window.history.back();
      }
    });
  }
}
