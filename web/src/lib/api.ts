import fs from "fs";
import path from "path";
import { ScraperOutput } from "../types";

export function getSeancesData(): ScraperOutput {
  try {
    const filePath = path.join(process.cwd(), "..", "scraper", "data", "seances_par_cinema.json");
    
    if (!fs.existsSync(filePath)) {
      console.warn("Fichier JSON non trouvé. Veuillez exécuter le backend python.");
      return { by_cinema: {}, by_date: {} };
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents) as ScraperOutput;
  } catch (error) {
    console.error("Erreur critique IO:", error);
    return { by_cinema: {}, by_date: {} };
  }
}
