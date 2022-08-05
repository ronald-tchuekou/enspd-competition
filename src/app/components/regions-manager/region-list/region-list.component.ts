/*
 * Copyright (c) 05/08/2022 06:18
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Region, RegionsService } from '../../../services/regions.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styles: []
})
export class RegionListComponent implements OnInit {
  regions: Region[] = [];
  loading: boolean = false;
  @Output() regionSelected = new EventEmitter();

  constructor(private regionService: RegionsService, private sbr: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getRegions();
  }

  getRegions() {
    this.loading = true;
    this.regionService.getRegions().subscribe({
      next: (data: Region[]) => {
        this.loading = false;
        this.regions = data;
      },
      error: (error: any) => {
        this.loading = false;
        console.log('Error when get candidates list : ', error);
      }
    });
  }

  deleteRegion(item: Region) {
    const response = confirm('Voulez-vous vraiment supprimer cette Région ?');
    if (response) {
      this.loading = true;
      this.regionService.deleteRegion(item.id).subscribe({
        next: value => {
          this.getRegions();
          this.sbr.open('Région supprimé avec succès !', undefined,
            { duration: 3000 });
        },
        error: err => {
          console.log(err);
          this.loading = false;
          if (err.error)
            this.sbr.open(err.error.message, undefined, { duration: 3000 });
          else
            this.sbr.open('Une erreur s\'est produite', undefined,
              { duration: 3000 });
        }
      });
    }
  }
}
