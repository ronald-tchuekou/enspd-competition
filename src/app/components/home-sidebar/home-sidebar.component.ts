/*
 * Copyright (c) 15/08/2022 17:14
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cursus } from '../../services/candidates.service';
import { Collection, CollectionsService, DEFAULT_COLLECTION } from '../../services/collection.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styles: []
})
export class HomeSidebarComponent implements OnInit {
  tab_index: number = 1;
  searchQuery: string = '';
  currentCollection: Collection = DEFAULT_COLLECTION;
  @Output() currentCollectionChange = new EventEmitter();
  collections: Collection[] = [];
  search_collections: Collection[] = [];
  loading: boolean = false;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit(): void {
    this.getCollections();
  }

  setTabIndex(index: number) {
    this.tab_index = index;
    this.currentCollection = DEFAULT_COLLECTION;
    this.currentCollectionChange.emit(this.currentCollection);
    this.getCollections();
  }

  getCollections() {
    this.loading = true;
    this.collectionsService.getCollectionBy({
      cursus: this.tab_index === 1 ? Cursus.SI : Cursus.IN
    }).subscribe({
      next: (data) => {
        this.loading = false;
        this.collections = data;
        this.search_collections = this.collections;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  selectCollection(collection: Collection) {
    this.currentCollection = collection;
    this.currentCollectionChange.emit(collection);
  }

  filter(event: any) {
    const query = event.target.value.trim();
    if (query === '') {
      this.search_collections = this.collections;
      return;
    }
    this.search_collections = this.collections.filter(
      item => item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
