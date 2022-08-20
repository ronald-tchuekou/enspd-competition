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

  static parseCell(itemValue: string) {
    let parsedValue = itemValue;

    // Replace all double quotes with two double quotes
    parsedValue = parsedValue.replace(/"/g, `""`);

    // If value contains comma, new-line or double-quote, enclose in double quotes
    parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;

    return parsedValue;
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
    if (total === count)
      return 100;
    return ((count * 100) / total).toFixed(2);
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
        // Pour la liste principale
        doc.setFontSize(12);
        doc.text('Liste principale : ' + item.admis_list.length + ' candidates', 12, 20);
        doc.text(
          `Cursus : ${item.cursus}      Filière : ${item.filiere}      Niveau : ${item.level}`,
          12, 40);
        doc.table(12, 60, item.admis_list, headers, config);

        // Pour la liste d'attente
        doc.addPage('A4', 'p');
        doc.setFontSize(12);
        doc.text('Liste d\'attente : ' + item.attente_list.length + ' candidates', 12, 20);
        doc.text(
          `Cursus : ${item.cursus}      Filière : ${item.filiere}      Niveau : ${item.level}`,
          12, 40);
        doc.table(12, 60, item.attente_list, headers, config);

        // Nouvelle page.
        doc.addPage('A4', 'p');
      });

      doc.save(fileName);
    } catch (e: any) {
      console.log(e.message, e);
    }
  }

  saveCSV(data: any[], fileName: string) {
    const headerKeys = ['id', 'nom', 'prenom', 'date_nais', 'lieu_nais', 'sexe', 'cursus'];
    const headerLabels = 'N°;Nom;Prénom;Date Naissance;Lieu Naissance;Sexe;Cursus';

    let lines: string[] = [];
    data.forEach(dataContent => {
      lines.push(`Liste principale : ${dataContent.admis_list.length} candidates`);
      lines.push(`Cursus : ${dataContent.cursus}     Filière : ${dataContent.filiere}     Niveau : ${dataContent.level}`);

      lines.push(headerLabels);
      dataContent.admis_list.forEach((item: any) => {
        let line = '';
        headerKeys.forEach((key, index) => {
          line += `${index === 0 ? '' : ';'}${ConstantsService.parseCell(item[key])}`;
        });
        lines.push(line);
        line = '';
      });

      lines.push(`Liste d'attente : ${dataContent.attente_list.length} candidates`);
      lines.push(`Cursus : ${dataContent.cursus}     Filière : ${dataContent.filiere}     Niveau : ${dataContent.level}`);

      lines.push(headerLabels);
      dataContent.attente_list.forEach((item: any) => {
        let line = '';
        headerKeys.forEach((key, index) => {
          line += `${index === 0 ? '' : ';'}${ConstantsService.parseCell(item[key])}`;
        });
        lines.push(line);
        line = '';
      });

    });

    const content = lines.join('\n');

    const csvBlob = new Blob([content], { type: 'text/csv' });
    const blobUrl = URL.createObjectURL(csvBlob);
    const anchorElement = document.createElement('a');

    anchorElement.href = blobUrl;
    anchorElement.download = fileName;
    anchorElement.click();

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 500);
  }
}
