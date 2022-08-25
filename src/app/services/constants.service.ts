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
        { width: 260, name: 'nom', prompt: 'Nom et Prénom' },
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
    const headerKeys = ['id', 'nom', 'date_nais', 'lieu_nais', 'sexe', 'cursus'];
    const headerLabels = 'N°;Nom et Prenom;Date Naissance;Lieu Naissance;Sexe;Cursus';

    let lines: string[] = [];
    data.forEach(dataContent => {
      lines.push(`Liste principale : ${dataContent.admis_list.length} candidates`);
      lines.push(`Cursus : ${dataContent.cursus}     Filiere : ${dataContent.filiere}     Niveau : ${dataContent.level}`);

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

  saveAllPDF(data: any[], fileName: string) {
    try {
      const headers: any[] = this.createHeaders([
        { width: 30, name: 'id', prompt: 'N°' },
        { width: 200, name: 'nom', prompt: 'Nom et Prénom' },
        { width: 55, name: 'date_nais', prompt: 'Date Naissance' },
        { width: 90, name: 'lieu_nais', prompt: 'Lieu Naissance' },
        { width: 35, name: 'sexe', prompt: 'Sexe' },
        { width: 40, name: 'region_origine', prompt: 'Région' },
        { width: 55, name: 'statut_mat', prompt: 'Statut matrimonial' },
        { width: 40, name: 'nationalite', prompt: 'Nationalité' },
        { width: 60, name: 'diplome_entree', prompt: 'Diplôme' },
        { width: 30, name: 'niveau', prompt: 'Niveau' },
        { width: 50, name: 'cursus', prompt: 'Cursus' },
        { width: 120, name: 'filiere_choisie', prompt: 'Filière' }
      ]);

      const doc = new jsPDF({
        orientation: 'l',
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

      doc.text('Liste de candidates : ', 11, 20);

      data.forEach(item => {
        // Pour la liste principale
        doc.setFontSize(12);
        doc.text(
          `Cursus : ${item.cursus}      ${
            item.group_filiere ? 'Filière : ' + item.filiere : 'Région : ' + item.region
          }      Niveau : ${item.level}     Effectif : ${item.list.length}`,
          12, 40);
        doc.table(12, 60, item.list, headers, config);
        // Nouvelle page.
        doc.addPage('A4', 'l');
      });

      doc.save(fileName);
    } catch (e: any) {
      console.log(e.message, e);
    }
  }

  saveAllCSV(data: any[], fileName: string) {
    const headerKeys = [
      'id',
      'nom',
      'date_nais',
      'lieu_nais',
      'sexe',
      'region_origine',
      'statut_mat',
      'nationalite',
      'diplome_entree',
      'niveau',
      'cursus',
      'filiere_choisie'
    ];
    const headerLabels = 'N°;Nom et Prenom;Date Naissance;Lieu Naissance;Sexe;Region;Statut matrimonial;Nationalite;Diplome;Niveau;Cursus;Filiere';

    let lines: string[] = [];
    data.forEach(dataContent => {
      lines.push(`Liste de candidates`);
      lines.push(`Cursus : ${dataContent.cursus}      ${
        dataContent.group_filiere ? 'Filiere : ' + dataContent.filiere : 'Region : ' + dataContent.region
      }      Niveau : ${dataContent.level}     Effectif : ${dataContent.list.length}`);

      lines.push(headerLabels);
      dataContent.list.forEach((item: any) => {
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
