/*
 * Copyright (c) 16/08/2022 08:22
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

const d = {
  nom: string,
  prenom: string,
  date_nais: date, // au format *yyyy-mm-dd*
  lieu_nais: string,
  region_origine: integer, // ID de la région (paramètres)
  depart_origine: integer, // ID du département (paramètre)
  statut_mat: string,// ['célibataire','marié']
  sexe: string, // ['Masculin', 'Feminin']
  nationalite: string,
  nom_pere: string,
  prof_pere: string,
  nom_mere: string,
  prof_mere: string,
  cursus: string, // ['Ingénieur','Science Ingénieur']
  niveau: integer, // [1,3]
  admis: boolean, // [0,1] ou [true,false]
  attente: boolean, // [0,1] ou [true,false]
  filiere_choisie: integer, // ID filière (paramètres)
  option_choisie: integer, // ID option (paramètres)
  diplome_entree: integer, // ID diplome (paramètres)
  note1: integer,
  note2: integer,
  note3: integer,
  range: integer,
  anonymous_num: integer
};
