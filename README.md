# Mon Rétroprojecteur (v2)

> **📝 Note pour l'IA (Contexte du projet)**
> Ce fichier sert de mémoire interne primordiale. Lors de vos prochaines interventions sur ce projet, lisez attentivement ce fichier pour comprendre la finalité du projet, son architecture (monorepo), et l'état exact d'avancement des développements.

## 🎯 Objectif du Projet
"Mon Rétroprojecteur" est une application web personnelle dont le but est d'indexer et d'afficher le calendrier des ressorties cinéma à Paris.
À la différence du site d'origine ([leretroprojecteur.com](https://leretroprojecteur.com/)), cette application vise à **réorganiser les séances par cinéma** (et non chronologiquement par date globale) pour faciliter la planification des séances pour l'utilisateur.

## 🏗️ Architecture "Monorepo"
Afin de garantir flexibilité et évolutivité (et de bien séparer le traitement de la donnée du rendu visuel), le projet est structuré en deux parties totalement indépendantes : le scraper backend et le client web.

```text
/
├── scraper/     # Logique d'extraction et traitement des données (Python)
├── web/         # Application Frontend React (Next.js)
├── scripts/     # Scripts d'automatisation globaux
├── .github/     # Workflows d'Intégration Continue (CI/CD)
└── README.md    # Mémoire du projet (ce fichier)
```

### 1. Le Moteur de Données (`/scraper/`)
**Stack :** Python, Requests
- **Concept :** Ce module interroge directement l'API REST interne découverte sur le site cible (`/api/movies/by-day/YYYY-MM-DD`). Cela permet d'obtenir les JSON originaux de façon infiniment plus stable qu'un parsing HTML via BeautifulSoup.
- **Fichiers clés :**
  - `scraper/src/fetcher.py` : Itère sur les 7 prochains jours pour consolider toutes les séances.
  - `scraper/src/processor.py` : Change le paradigme de la donnée en regroupant tous les films sous une **clé principale représentant le nom du cinéma**, et trie les dates par ordre chronologique décroissant/croissant pour l'UX.
  - `scraper/src/main.py` : Ordonnanceur qui exporte finalement ces données vers un fichier unique local dans `/scraper/data/seances_par_cinema.json`.
- **État d'avancement :** **✅ TERMINÉ (100%)**. Le pipeline Python est fonctionnel, propre et génère le fichier attendu.

### 2. L'Application UI (`/web/`)
**Stack :** Next.js (App Router), React, Tailwind CSS, TypeScript
- **Concept :** L'interface doit venir lire passivement le fichier json (ou son exposition serveur) et construire une grille visuelle ou une liste interactive permettant de parcourir facilement ses cinémas favoris.
- **État d'avancement :** **⏳ INITIALISÉ MAIS VIDE (10%)**. L'application a été initialisée et configurée (`create-next-app` effectué) mais l'intégration et la création des composants visuels doivent encore démarrer.

## 🛠️ Mode d'emploi et Consignes pour l'IA
1. **Frontend en priorité :** Tout le travail restant se passe dans `/web`. Ne remettez pas en cause l'architecture globale ni le backend qui font parfaitement le travail demandé.
2. **Pas de logique métier dans React :** Le gros avantage de ce projet est que le tri (par cinéma, par chronologie, par titre) est **déjà géré** intelligemment par `processor.py` côté backend. Ne ré-inventez pas de hooks alambiqués pour trier les données dans Next.js : contentez-vous de consommer le résultat JSON et de le formater visuellement de façon pure.
3. **Excellence du Design :** L'UI doit faire preuve de *Visual Excellence* : utilisez des palettes étudiées au contraste subtil, du *glassmorphism*, des animations modernes à l'état de l'art (micro-animations, layout shifts) et une expérience utilisateur parfaite. Refusez de pondre un design "MVP" fade. La typographie, les espacements (`gap`, `padding`) doivent être généreux et "Premium".

---
*Mise à jour : Création de la structure, écriture et validation finale du Backend Python. En attente de l'implémentation du Frontend.*
