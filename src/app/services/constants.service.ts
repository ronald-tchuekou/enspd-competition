/*
 * Copyright (c) 30/07/2022 16:13
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

import { Injectable } from '@angular/core';
import { CellConfig, jsPDF, TableConfig } from 'jspdf';
import { Cursus, Sexe } from './candidates.service';

interface Header {
  width: number,
  name: string,
  prompt: string
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() {
  }

  createSegments(table: Array<any>, limit: number): Array<Array<any>> {
    let result: Array<Array<any>> = [];
    let stack = 0;
    while (stack < table.length) {
      result.push(table.slice(stack, stack + limit));
      stack += limit;
    }
    const sub = table.slice(stack);
    if (sub.length !== 0) result.push(sub);
    return result;
  }

  getPercentage(total: number, count: number) {
    if (total === 0 || count === 0)
      return 0;
    return Math.floor((count * 100) / total);
  }

  createHeaders(keys: Header[]): CellConfig[] {
    return keys.map(key => ({
      name: key.name,
      prompt: key.prompt,
      width: key.width,
      align: 'left',
      padding: 5
    }));
  }

  savePDF(data: any[], fileName: string) {
    try {
      const headers: any[] = this.createHeaders([
        { width: 30, name: 'id', prompt: 'N°' },
        { width: 130, name: 'nom', prompt: 'Nom' },
        { width: 130, name: 'prenom', prompt: 'Prénom' },
        { width: 55, name: 'date_nais', prompt: 'Date Naissance' },
        { width: 90, name: 'lieu_nais', prompt: 'Lieu Naissance' },
        { width: 35, name: 'sexe', prompt: 'Sexe' },
        { width: 90, name: 'cursus', prompt: 'Cursus' }
      ]);

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'A4',
        compress: true,
        precision: 2,
        putOnlyUsedFonts: true,
        floatPrecision: 'smart'
      });

      const config: TableConfig = {
        autoSize: false,
        printHeaders: true,
        fontSize: 6,
        padding: 3
      };

      data.forEach(item => {
        doc.setFontSize(13);
        doc.text(
          `Cursus : ${item.cursus}      Filière : ${item.filiere}      Niveau : ${item.level}`,
          12, 20);
        doc.table(12, 40, item.list, headers, config);
        doc.addPage('A4', 'p');
      });

      doc.save(fileName);
    } catch (e: any) {
      console.log(e.message, e);
    }
  }
}
