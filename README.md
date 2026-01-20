# Portfolio Personnel & Projets Interactifs

Bienvenue sur mon portfolio interactif. Ce projet met en avant mes compétences en développement web moderne, incluant deux projets principaux : un système solaire animé et un Rubik's Cube 3D entièrement fonctionnel.

## 🔗 Accès Direct (Recommandé)

Le site est déployé et accessible en ligne à l'adresse suivante :

### 👉 **[https://markhushounsou.github.io/Portfolio/](https://markhushounsou.github.io/Portfolio/)**

---

## 🎮 Projets Inclus

### 1. 🌍 Système Solaire 3D
- Navigation interactive des planètes
- Animations GSAP fluides
- Textures et modèles 3D
- Support multilingue (EN/FR)

### 2. 🎲 Rubik's Cube 3D (NEW!)
- Cube entièrement fonctionnel avec CSS 3D pur
- Contrôles au clavier, souris et tactiles (swipe)
- Undo/Redo illimité et sauvegarde automatique
- Mode démo avec lecture de séquences aléatoires
- Thème sombre/clair et effets sonores Web Audio
- **Accès**: `/cube` | Documentation: [RUBIKS_CUBE_README.md](./RUBIKS_CUBE_README.md)
- **Structure**: Sous-projet indépendant avec logique réutilisable
  - 📁 `src/cube/` — Barrel export et configuration
  - 🎮 `src/pages/CubePage.jsx` — Interface de jeu
  - 🧠 `src/hooks/` — Logique métier (5 custom hooks)
  - 🔧 `src/utils/` — Algorithmes et utilitaires
  - 🎨 `src/components/Cube.jsx` — Composant 3D

---

## 💻 Installation & Lancement Local

Si vous devez évaluer le code ou lancer le projet sur votre machine, suivez ces étapes :

### Prérequis
*   **Node.js** (Version 16 ou supérieure recommandée)
*   **Git**

### 1. Récupérer le projet
Ouvrez un terminal et clonez le dépôt :

```bash
git clone https://github.com/MarkhusHounsou/Portfolio.git
cd Portfolio
```

### 2. Installer les dépendances
Installez les librairies nécessaires (React, Tailwind, GSAP...) :

```bash
npm install
```

### 3. Lancer le serveur
Démarrez le serveur de développement local :

```bash
npm run dev
```
Cliquez sur le lien qui s'affiche (généralement `http://localhost:5173/Portfolio/`) pour voir le site.

> **Note :** Si vous souhaitez voir la version de production en local, utilisez `npm run build` puis `npm run preview`.

---

## � Architecture & Organisation

Le portfolio utilise une **approche modulaire** avec des **sous-projets indépendants**:

### Structure Principale
```
src/
├── pages/                     # Pages principales
│   ├── CubePage.jsx          # 🎲 Rubik's Cube Game
│   ├── HowItWorks.jsx        # Documentation technique
│   └── ...
├── cube/                     # 🎲 SUB-PROJECT: Rubik's Cube
│   ├── index.js              # Barrel export (entry point)
│   ├── README.md             # Documentation complète
│   ├── project.json          # Configuration du sous-projet
│   └── ...
├── components/               # Composants réutilisables
├── hooks/                    # Logique métier (state, input, etc.)
├── utils/                    # Utilitaires (math, persistence, etc.)
└── ...
```

### Sous-Projets

#### 🎲 Rubik's Cube 3D
Un **sous-projet autonome** qui peut être réutilisé indépendamment:
- **Logique métier**: 5 custom hooks réutilisables (`useCube`, `useAutoPlay`, `useKeyboardControls`, `useSwipeControls`, `useCubeSettings`)
- **Utilitaires réutilisables**: Modèle de données, algorithmes de mouvement, calculs 3D, sons, persistance
- **Composant isolé**: `Cube.jsx` + `Cube.css` (peut être exporté comme composant indépendant)
- **Documentation**: [RUBIKS_CUBE_README.md](./RUBIKS_CUBE_README.md) + [RUBIKS_CUBE_PROJECT.md](./RUBIKS_CUBE_PROJECT.md)
- **Accès**: `/cube` dans le portfolio

**Avantage**: La logique du Cube peut être extraite en package NPM ou réutilisée ailleurs sans modifier le portfolio.

---

## 🛠 Stack Technique

Ce projet a été réalisé avec les technologies suivantes :

*   **Framework :** React 19 (Vite)
*   **Styling :** Tailwind CSS
*   **Animations :** GSAP (GreenSock), Framer Motion & CSS 3D
*   **Routing :** React Router v7
*   **Internationalisation :** i18next (Français/Anglais)
*   **3D Rendering :** CSS 3D Transforms, Web Audio API

## 🌟 Points Forts du Projet

1.  **Système Solaire 3D (Slot 2)** : Une application immersive accessible depuis la page d'accueil.
2.  **Architecture Modulaire** : Composants réutilisables et séparation claire du code.
3.  **Design Responsive** : Adapté aux mobiles, tablettes et écrans larges.
