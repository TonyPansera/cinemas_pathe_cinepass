import requests
from bs4 import BeautifulSoup

urls = ["https://leretroprojecteur.com/", "https://leretroprojecteur.com/portail-seances"]
headers = {"User-Agent": "Mozilla"}

for url in urls:
    print(f"\n==== {url} ====")
    resp = requests.get(url, headers=headers)
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    # Let's find elements that might contain movie titles, times, or cinemas.
    # Usually they use semantic HTML like <article>, or classes like .movie, .cinema, .seance
    articles = soup.find_all('article')
    print(f"Number of <article> tags: {len(articles)}")
    
    if len(articles) > 0:
        print("First article snippet:", articles[0].prettify()[:300])
        
    divs_with_seance = soup.find_all('div', class_=lambda c: c and ('seance' in c.lower() or 'session' in c.lower() or 'screening' in c.lower()))
    print(f"Number of 'seance' divs: {len(divs_with_seance)}")
    
    lists = soup.find_all('ul')
    print(f"Number of <ul> tags: {len(lists)}")
