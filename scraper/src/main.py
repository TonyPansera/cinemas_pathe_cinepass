import os
from fetcher import fetch_seances_for_dates
from processor import group_by_cinema, group_by_date, save_to_json

# Chemin absolu vers le dossier 'data' en remontant d'un niveau depuis 'src'
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
OUTPUT_FILE = os.path.join(DATA_DIR, "seances_par_cinema.json")

def main():
    print("⏳ Démarrage du scraping de leretroprojecteur.com via son API interne...")
    
    # 1. Extraction (fetch) pour une semaine
    print("  -> Traitement des 7 prochains jours...")
    seances_brutes = fetch_seances_for_dates(days_ahead=7)
    
    print(f"  -> {len(seances_brutes)} séances brutes trouvées.")
    
    # 2. Traitement (process)
    print("  -> Tri et regroupement double (par cinéma et par date)...")
    donnees_triees = {
        "by_cinema": group_by_cinema(seances_brutes),
        "by_date": group_by_date(seances_brutes)
    }
    
    # 3. Sauvegarde
    print(f"  -> Sauvegarde dans {OUTPUT_FILE}...")
    save_to_json(donnees_triees, OUTPUT_FILE)
    
    print("✅ Terminé avec succès ! Regardez le fichier JSON.")

if __name__ == "__main__":
    main()
