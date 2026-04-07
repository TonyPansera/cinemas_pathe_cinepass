import json
import os

def group_by_cinema(seances_brutes: list) -> dict:
    """
    Groupe les séances par Cinéma.
    """
    seances_par_cinema = {}
    
    for seance in seances_brutes:
        cinema = seance.get("cinema", "Inconnu")
        
        if cinema not in seances_par_cinema:
            seances_par_cinema[cinema] = []
            
        seances_par_cinema[cinema].append(seance)
        
        seances_par_cinema[cinema] = sorted(
            seances_par_cinema[cinema], 
            key=lambda x: (x["date"], x["heure"])
        )
        
    return seances_par_cinema

def group_by_date(seances_brutes: list) -> dict:
    """
    Groupe les séances par Date (Chronologique).
    """
    seances_par_date = {}
    
    for seance in seances_brutes:
        date_str = seance.get("date", "Inconnu")
        
        if date_str not in seances_par_date:
            seances_par_date[date_str] = []
            
        seances_par_date[date_str].append(seance)
    
    # Tri chronologique par heure au sein de chaque journée
    for date_str in seances_par_date:
        seances_par_date[date_str] = sorted(
            seances_par_date[date_str], 
            key=lambda x: x["heure"]
        )
        
    return seances_par_date

def save_to_json(data: dict, output_path: str):
    """Sauvegarde le dictionnaire dans un fichier JSON local."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
