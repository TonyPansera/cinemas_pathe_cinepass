import requests
from datetime import datetime, timedelta

def fetch_seances_for_dates(days_ahead: int = 7) -> list:
    """
    Récupère les séances via l'API interne du Rétroprojecteur
    pour aujourd'hui et les `days_ahead` prochains jours.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    
    seances_brutes = []
    base_url = "https://leretroprojecteur.com/api/movies/by-day/"
    
    for i in range(days_ahead):
        date_obj = datetime.now() + timedelta(days=i)
        date_str = date_obj.strftime("%Y-%m-%d")
        print(f"    - Consultation de l'API pour le {date_str}...")
        
        try:
            response = requests.get(base_url + date_str, headers=headers)
            response.raise_for_status()
            data = response.json()
            
            # Traitement du JSON (chaque objet représente un film avec ses séances par cinéma)
            for movie in data:
                titre = movie.get("title", "Film Inconnu")
                realisateur = movie.get("directors", "Inconnu")
                annee = movie.get("year", "Inconnu")
                showtimes_theater = movie.get("showtimes_theater", [])
                
                for theater_obj in showtimes_theater:
                    cinema_name = theater_obj.get("name", "Inconnu")
                    zipcode = theater_obj.get("zipcode", "")
                    horaires = theater_obj.get("seances", {})
                    
                    # Les clés dans horaires sont de la forme "18_10"
                    for heure_key, details in horaires.items():
                        
                        # Fallback pour reconstruire l'heure
                        heure_formattee = str(heure_key).replace("_", ":")
                        
                        # Ajout à notre structure brute aplatie
                        seances_brutes.append({
                            "film": titre,
                            "realisateur": realisateur,
                            "annee": annee,
                            "cinema": cinema_name,
                            "zipcode": zipcode,
                            "date": date_str,
                            "heure": heure_formattee
                        })
                        
        except Exception as e:
            print(f"      Erreur lors du scraping de {date_str} : {e}")
            
    return seances_brutes
