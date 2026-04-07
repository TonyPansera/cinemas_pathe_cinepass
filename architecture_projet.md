# Architecture et Arborescence : Mon Rétroprojecteur

Voici une structure de dossiers complète, professionnelle et maintenable en mode "Monorepo". Elle sépare très distinctement le moteur de scraping et l'application Next.js.

```text
mon-retroprojecteur/
├── .github/                       # Automatisation GitHub (CI/CD)
│   └── workflows/
│       ├── scraping.yml           # Action pour lancer le scraper (ex: un cron tous les matins)
│       └── webapp.yml             # Action pour vérifier/builder le front-end Next.js sur push
│
├── scraper/                       # Partie Scraping & Traitement des Données (Python)
│   ├── src/
│   │   ├── main.py                # Point d'entrée pour lancer le script
│   │   ├── fetcher.py             # Logique d'extraction HTML (BeautifulSoup/Playwright)
│   │   └── processor.py           # ➔ LOGIQUE DE TRI : Transforme/organise les données par cinéma
│   ├── tests/                     # Dossier de tests unitaires Python (via pytest)
│   │   ├── test_fetcher.py
│   │   └── test_processor.py
│   ├── data/                      # Stockage local des fichiers de sortie
│   │   └── seances_par_cinema.json
│   ├── scripts/                   # Scripts d'automatisation relatifs aux données
│   │   └── run_manual.sh          # Sript utilitaire pour lancer manuellement le scrape
│   └── requirements.txt           # Liste des dépendances (bs4, playwright, etc.)
│
├── web/                           # Partie Application Web (Next.js / React / Tailwind)
│   ├── src/
│   │   ├── app/                   # App Router Next.js (pages, layouts)
│   │   │   ├── globals.css        # Styles globaux Tailwind
│   │   │   ├── layout.tsx         # Layout principal de navigation
│   │   │   └── page.tsx           # Page d'accueil listant les cinémas
│   │   ├── components/            # Composants réutilisables (ex: CinemaCard, UI elements)
│   │   ├── lib/                   # Fonctions utilitaires, fetchers des données JSON
│   │   └── types/                 # Types TypeScript (Interfaces de Cinéma, Séance)
│   ├── public/                    # Assets statiques (images, logo)
│   │   └── data/                  # Symlink ou copie automatique de ../../scraper/data/ pour Next
│   ├── tests/                     # Tests frontend (Jest / Playwright)
│   │   └── components.test.tsx
│   ├── scripts/                   # Scripts liés à l'application web
│   │   └── build_and_export.sh
│   ├── package.json               # Dépendances Node.js / React
│   ├── tailwind.config.ts         # Configuration Tailwind CSS
│   ├── postcss.config.js          # Configuration requise par Tailwind
│   └── next.config.mjs            # Configuration de Next.js
│
├── scripts/                       # Scripts globaux d'automatisation (Racine)
│   ├── install_all.sh             # Script global d'installation de tout le projet
│   └── deploy.sh                  # Script de déploiement global
│
├── .gitignore                     # Fichiers et dossiers à ignorer (node_modules, venv, pycache..)
└── README.md                      # Documentation d'accueil exhaustive
```

---

## Rôle des dossiers majeurs et logique de Tri

### `scraper/` (Data & Logic)
C'est le moteur autonome du système. L'objectif est d'extraire, nettoyer et structurer.
- **Logique de tri par cinéma** : Elle doit se situer précisément dans **`scraper/src/processor.py`**.
  - `fetcher.py` s'occupe de pomper le code source de *leretroprojecteur.com*.
  - `processor.py` reçoit ces données brutes et effectue la réorganisation. Au lieu de conserver le format horaire, ce script parcourt l'itération des séances, et les agglomère sous forme de tableau ou dictionnaire ayant comme "clef" le nom du cinéma.
  - Ensuite, le résultat est déversé sous format JSON dans `scraper/data/seances_par_cinema.json`.

### `web/` (Interface Utilisateur)
C'est la vitrine. Elle doit être agnostique du site d'origine.
- **Rôle :** Elle lit simplement le fichier `.json` généré (soit mis en static dans `public/data/`, soit lu depuis `lib/`). Son seul travail est d'afficher merveilleusement bien les données à l'aide de *Tailwind CSS*.
- **Évite le traitement Lourd :** La logique Next.js (`page.tsx`) est très digeste, car le scraper a déjà fait 100% du travail de filtrage.

### `tests/` et `scripts/`
- Vous remarquerez que les `tests/` sont cloisonnés dans le domaine du composant qu'ils testent : `scraper/tests/` pour tout ce qui valide la logique de traitement Python (`processor.py` notamment, pour vérifier que le tri se fait bien) ; et `web/tests/` pour les tests React.
- Les dossiers `scripts/` se trouvent à la racine pour les actions globales et dans chaque sous-dossier pour leurs routines spécifiques d'exécution.

> [!TIP]
> **Évolutivité de ce modèle**
> L'énorme avantage de cette structure Monorepo (séparation Scraping / Web) est qu'elle vous permet de facilement faire évoluer votre data ! Si un jour le flux de données de *leretroprojecteur.com* justifie l'utilisation d'une vraie base de données MongoDB ou Supabase à la place d'un JSON local, l'application Next.js (`web/`) nécessitera quasiment 0 changement si l'interface de l’API ou du backend reste bien isolée via `processor.py`.
