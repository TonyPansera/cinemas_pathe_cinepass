export interface Seance {
  film: string;
  realisateur: string;
  annee: string | number;
  cinema: string;
  zipcode: string;
  date: string;
  heure: string;
}

export type SeancesByCinema = Record<string, Seance[]>;
export type SeancesByDate = Record<string, Seance[]>;

export interface ScraperOutput {
  by_cinema: SeancesByCinema;
  by_date: SeancesByDate;
}
