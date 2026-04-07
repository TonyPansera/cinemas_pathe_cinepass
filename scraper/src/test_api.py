import requests
from datetime import datetime, timedelta

headers = {"User-Agent": "Mozilla/5.0"}
base_url = "https://leretroprojecteur.com/api/movies/by-day/"
date_str = "2026-04-07"
resp = requests.get(base_url + date_str, headers=headers)
data = resp.json()

print(f"Number of movies today: {len(data)}")
if len(data) > 0:
    movie = data[0]
    print(f"Keys in movie: {list(movie.keys())}")
    seances_cinemas = movie.get("seances", {})
    print(f"Seances is of type: {type(seances_cinemas)}")
