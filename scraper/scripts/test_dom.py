import requests
from bs4 import BeautifulSoup
import sys

def main():
    urls = ["https://leretroprojecteur.com/", "https://leretroprojecteur.com/portail-seances"]
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

    for url in urls:
        print(f"\n==== {url} ====")
        try:
            resp = requests.get(url, headers=headers)
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            articles = soup.find_all('article')
            print(f"Number of <article> tags: {len(articles)}")
            if articles:
                print("First article snippet:", str(articles[0])[:300])
                
            divs_seance = soup.find_all('div', class_=lambda c: c and 'seance' in c.lower())
            print(f"Number of 'seance' divs: {len(divs_seance)}")
            
            # Print title
            print("TITLE:", soup.title.string if soup.title else "No title")
            
            # Print body text briefly
            body_text = soup.body.text.strip().replace('\n', ' ') if soup.body else ""
            print("Body text snippet:", body_text[:200])

            # Dump interesting classes
            classes = set()
            for element in soup.find_all(True):
                if element.get('class'):
                    classes.update(element.get('class'))
            
            interesting = [c for c in classes if any(x in c.lower() for x in ['film', 'cinema', 'date', 'time', 'seance', 'horaire', 'movie', 'jour', 'date'])]
            print("Interesting classes found:", interesting)

        except Exception as e:
            print(f"Error for {url}: {e}")

if __name__ == "__main__":
    main()
