/*
 * Copyright (c) 25/08/2022 09:50
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidatesService } from '../../../services/candidates.service';
import { CollectionsService } from '../../../services/collection.service';

@Component({
  selector: 'app-change-collection',
  templateUrl: './change-collection.component.html',
  styles: []
})
export class ChangeCollectionComponent implements OnInit {

  @Input() candidate_id: number = 0;
  @Output() onComplete = new EventEmitter();
  collections: any[] = [];
  @Input() collection: string = '';

  constructor(
    private sbr: MatSnackBar,
    private collectionService: CollectionsService,
    private candidateService: CandidatesService
  ) {
  }

  ngOnInit(): void {
    this.getCollections();
  }

  getCollections() {
    this.collectionService.getCollections().subscribe({
      next: data => {
        this.collections = [
          { label: '---', value: '' },
          ...data.map(item => ({ label: item.name, value: item.id }))
        ];
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onValueChange(value: string) {
    const response = confirm('Est-vous sûre de vouloir modifier la collection de ce candidat ?');
    if (response) {
      this.candidateService.updateCandidate({ collection_id: value }, this.candidate_id)
        .subscribe({
          next: () => {
            this.sbr.open('La collection à été modifiée avec succès !', undefined,
              { duration: 3000 });
            this.onComplete.emit();
          },
          error: err => {
            console.log(err);
            this.sbr.open('Une erreur à été produite, veuillez réessayer',
              undefined, { duration: 3000 });
          }
        });
    }
  }
}
