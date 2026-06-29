# Life Manager — Organisez votre vie intelligemment

**Life Manager** est une application web tout-en-un conçue pour centraliser et automatiser votre organisation quotidienne.

Elle combine :
- une **todo intelligente**
- un **générateur de repas personnalisés** (IA)
- un **générateur d'exercices sportifs** (IA)
- un **calendrier unifié**

Le tout orchestré automatiquement grâce à des règles internes et à l'intelligence artificielle via l'**API OpenAI**.

---

## Vision du projet

L'objectif de Life Manager est simple :

> Ne plus réfléchir à *quand* faire les choses, *quoi* manger ou *comment* s'entraîner.

L'application s'occupe de :
- planifier vos tâches
- générer vos repas selon vos préférences
- créer vos séances de sport adaptées
- organiser le tout dans un calendrier clair et cohérent

> **État actuel :** le module **Todo + planification automatique + calendrier** est fonctionnel. Les modules **Repas (IA)** et **Exercices (IA)** sont à venir (voir [Roadmap](#roadmap)).

---

## Fonctionnalités

### ✅ Todo intelligente *(implémentée)*

- Création, modification et suppression de **catégories** personnalisées avec couleur (color picker)
- **Tâches** et **sous-tâches** par catégorie
- Gestion des **priorités** : `bas`, `moyen`, `haut` (indicateur visuel par point coloré)
- **Estimation de durée** (en minutes) par tâche / sous-tâche
- **Suivi de progression** (« X/Y tâches accomplies »)
- **Planification automatique** dans le calendrier en un clic (voir [Algorithme de planification](#algorithme-de-planification))

### 🍽️ Générateur de repas — IA *(à venir)*

- Génération automatique de repas personnalisés via l'API OpenAI
- Adaptation selon les préférences utilisateur
- Intégration dans le calendrier
- Favoris

### 🏋️ Générateur d'exercices — IA *(à venir)*

- Programmes sportifs personnalisés via l'API OpenAI
- Adaptés au niveau et aux objectifs
- Planification automatique
- Favoris

### 📅 Calendrier unifié *(implémenté, vocation à centraliser tous les modules)*

- Basé sur **FullCalendar 6** (locale FR)
- Vue hebdomadaire (par défaut) et mensuelle, plage horaire 7h–24h
- Modale de détail au clic sur un événement
- À terme : regroupe tâches, repas et séances de sport au même endroit

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Monorepo | npm workspaces + `concurrently` |
| Frontend | React 19 + TypeScript 4.9 (Create React App / `react-scripts`) |
| Calendrier | FullCalendar 6 (daygrid, timegrid, interaction) |
| Backend | NestJS 11 (Node.js, Express) |
| ORM | Prisma 7 (`@prisma/adapter-pg` + driver `pg`) |
| Base de données | PostgreSQL (hébergée sur Supabase) |
| IA *(à venir)* | API OpenAI (génération de repas et d'exercices) |
| Style | CSS par composant |

---

## Architecture

Le projet est un **monorepo** composé de deux workspaces npm indépendants :

```
┌──────────────────────┐         HTTP (REST, JSON)        ┌──────────────────────┐
│        client        │   /categories  /tasks            │        server        │
│  React 19 (CRA)      │ ───────────────────────────────▶ │   NestJS 11          │
│  port 3000           │   /sub-tasks                     │   port 3001          │
│  proxy → :3001       │ ◀─────────────────────────────── │                      │
└──────────────────────┘                                  └─────┬──────────┬─────┘
                                                                │ Prisma 7 │ API OpenAI
                                                                │ (pg Pool)│ (à venir)
                                                                ▼          ▼
                                                      ┌──────────────┐ ┌──────────┐
                                                      │  PostgreSQL  │ │  OpenAI  │
                                                      │  (Supabase)  │ │  (repas/ │
                                                      │              │ │  sport)  │
                                                      └──────────────┘ └──────────┘
```

- Le **client** (CRA) appelle l'API via des chemins relatifs (`/categories`, `/tasks`, `/sub-tasks`). En développement, le champ `"proxy": "http://localhost:3001"` du `client/package.json` redirige ces requêtes vers le serveur NestJS.
- Le **serveur** expose une API REST (un module NestJS par ressource) et accède à PostgreSQL via Prisma, en utilisant un `Pool` `pg` injecté dans le `PrismaService`. C'est lui qui hébergera les appels à l'API OpenAI pour les modules repas et sport.
- L'**algorithme de planification de la todo est exécuté côté client** (dans `TodoPanel.tsx`) : le serveur ne fait que persister les tâches ; le calendrier est généré en mémoire à partir des catégories chargées.

---

## Structure du projet

> La structure générale ne change pas : front React, back NestJS + Prisma, base PostgreSQL (Supabase). Les futurs modules (repas, exercices) viendront s'ajouter sous forme de nouveaux modules NestJS et de nouveaux composants/pages côté client.

```
Life-Manager/
├── package.json              # racine : workspaces + scripts dev/build
├── client/                   # Frontend React (CRA)
│   ├── public/
│   └── src/
│       ├── api/
│       │   ├── category.ts       # appels REST catégories
│       │   ├── task.ts           # appels REST tâches
│       │   └── subtask.ts        # appels REST sous-tâches
│       ├── components/
│       │   ├── TodoPanel.tsx     # Panneau gauche + algorithme de planification
│       │   ├── CalendarPanel.tsx # Panneau droit : calendrier FullCalendar + modale
│       │   ├── CategoryList.tsx  # Liste des catégories
│       │   ├── CategoryItem.tsx  # Composant d'une catégorie
│       │   ├── TaskItem.tsx      # Composant d'une tâche + sous-tâches
│       │   └── AddForm.tsx       # Formulaire d'ajout générique
│       ├── styles/               # Fichiers CSS par composant
│       ├── types/
│       │   ├── todo.types.ts     # Category, Task, Subtask, Priority
│       │   └── calendar.types.ts # CalendarEvent, CalendarEventDetail
│       ├── App.tsx               # Layout 2 panneaux + état des événements
│       └── index.tsx
└── server/                   # Backend NestJS
    ├── prisma/
    │   ├── schema.prisma         # Modèles category / task / subtask
    │   └── migrations/           # Migrations Prisma
    ├── prisma.config.ts          # Config Prisma (DIRECT_URL pour les migrations)
    └── src/
        ├── main.ts               # Bootstrap (port 3001, sérialisation BigInt)
        ├── app.module.ts         # Module racine (Config + ressources)
        ├── prisma.service.ts     # Client Prisma (Pool pg)
        ├── categories/           # Module Catégories (controller/service/dto)
        ├── tasks/                # Module Tâches (controller/service/dto)
        └── sub-tasks/            # Module Sous-tâches (controller/service/dto)
                                  # à venir : meals/ , workouts/ (modules IA)
```

---

## API REST

Toutes les ressources actuelles suivent le même schéma CRUD. Le serveur écoute par défaut sur `http://localhost:3001`.

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/categories` | Liste les catégories (avec tâches et sous-tâches imbriquées) |
| `GET` | `/categories/:id` | Récupère une catégorie |
| `POST` | `/categories` | Crée une catégorie (`{ name, color }`) |
| `PATCH` | `/categories/:id` | Met à jour une catégorie |
| `DELETE` | `/categories/:id` | Supprime une catégorie (cascade sur tâches/sous-tâches) |
| `GET` | `/tasks` | Liste les tâches |
| `GET` | `/tasks/:id` | Récupère une tâche |
| `POST` | `/tasks` | Crée une tâche (`{ text, categoryId, priority, duration? }`) |
| `PATCH` | `/tasks/:id` | Met à jour une tâche (`text`, `priority`, `duration`, `done`…) |
| `DELETE` | `/tasks/:id` | Supprime une tâche (cascade sur sous-tâches) |
| `GET` | `/sub-tasks` | Liste les sous-tâches |
| `GET` | `/sub-tasks/:id` | Récupère une sous-tâche |
| `POST` | `/sub-tasks` | Crée une sous-tâche (`{ text, taskId, priority, duration? }`) |
| `PATCH` | `/sub-tasks/:id` | Met à jour une sous-tâche |
| `DELETE` | `/sub-tasks/:id` | Supprime une sous-tâche |

> Note : les identifiants sont des `BigInt` en base. Le serveur sérialise les `BigInt` en nombres JSON (voir `main.ts`).
>
> À venir : routes `/meals` et `/workouts` adossées à l'API OpenAI pour la génération de repas et de séances.

---

## Algorithme de planification

La planification de la todo est déclenchée par le bouton **« Planifier »** et calculée côté client dans [`client/src/components/TodoPanel.tsx`](client/src/components/TodoPanel.tsx).

**Créneaux horaires** (modifiables dans le code) :

- **Travail** (`WORK_SLOTS`) : 10h–12h et 14h–19h
- **Loisir** (`LEISURE_SLOTS`) : 21h–24h

**Règles principales :**

1. **Routage par catégorie** — une catégorie nommée `loisir` alimente les créneaux loisir ; toutes les autres alimentent les créneaux travail.
2. **Éligibilité** — seules les tâches/sous-tâches non terminées (`done = false`) sont planifiées. Une tâche avec des sous-tâches planifie ses sous-tâches plutôt qu'elle-même.
3. **Ordonnancement** — les éléments sont regroupés par tâche parente, triés par priorité (`high` > `medium` > `low`) à l'intérieur d'un groupe, puis les groupes sont triés selon leur priorité maximale.
4. **Remplissage glouton** — les éléments sont empilés dans les créneaux disponibles, en privilégiant les sous-tâches d'une même tâche pour les garder contiguës.
5. **Découpage** — une tâche plus longue que le temps restant dans un créneau est scindée ; le reste (suffixé « (suite) ») est reporté sur le créneau suivant.
6. **Tâches sans durée** — un élément sans durée estimée occupe seul un créneau entier.

Les événements générés sont remontés à `App.tsx`, puis affichés par `CalendarPanel.tsx` (FullCalendar). À terme, repas et séances de sport viendront s'insérer dans ce même calendrier.

---

## Modèle de données

Types TypeScript côté client ([`client/src/types/todo.types.ts`](client/src/types/todo.types.ts)) :

```ts
type Priority = 'low' | 'medium' | 'high'

type Category = {
  id: number
  name: string
  color: string       // couleur HEX de la catégorie
  task: Task[]
}

type Task = {
  id: number
  text: string
  done: boolean
  categoryId: number
  priority: Priority
  duration?: number | null  // durée estimée en minutes
  subtask: Subtask[]
}

type Subtask = {
  id: number
  text: string
  done: boolean
  taskId: number
  priority: Priority
  duration?: number | null
}
```

Schéma Prisma côté serveur ([`server/prisma/schema.prisma`](server/prisma/schema.prisma)) :

```prisma
model category {
  id    BigInt @id @default(autoincrement())
  name  String
  color String @default("#3b82f6")
  task  task[]
}

model task {
  id         BigInt    @id @default(autoincrement())
  text       String
  done       Boolean   @default(false)
  categoryId BigInt?
  priority   String    @default("medium")
  duration   Int?
  subtask    subtask[]
  category   category? @relation(fields: [categoryId], references: [id], onDelete: Cascade)
}

model subtask {
  id       BigInt  @id @default(autoincrement())
  text     String
  done     Boolean @default(false)
  taskId   BigInt?
  priority String  @default("medium")
  duration Int?
  task     task?   @relation(fields: [taskId], references: [id], onDelete: Cascade)
}
```

> À venir : modèles `meal` et `workout` (avec préférences utilisateur et favoris) pour les modules IA.

---

## Installation et lancement

### Prérequis

- Node.js >= 18
- Une base de données PostgreSQL (par exemple un projet Supabase)
- *(à venir)* Une clé API OpenAI pour les modules repas et sport

### Étapes

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd Life-Manager

# Installer les dépendances de tous les workspaces
npm install

# Configurer les variables d'environnement du serveur
cp server/.env.exemple server/.env
# Renseigner DATABASE_URL et DIRECT_URL (voir ci-dessous)

# Appliquer les migrations Prisma + générer le client
cd server && npx prisma migrate deploy && npx prisma generate && cd ..

# Lancer client + serveur simultanément
npm run dev
```

- Client : [http://localhost:3000](http://localhost:3000)
- API : [http://localhost:3001](http://localhost:3001)

### Variables d'environnement (serveur)

Le client n'a pas de variable d'environnement requise (il passe par le `proxy` CRA en développement). Le serveur attend :

```env
# Connexion utilisée à l'exécution par l'application (idéalement le pooler)
DATABASE_URL=postgresql://<user>:<password>@<host>:6543/postgres

# Connexion directe utilisée par les migrations Prisma
DIRECT_URL=postgresql://<user>:<password>@<host>:5432/postgres

# Port du serveur NestJS (3001 par défaut)
PORT=3001

# À venir : clé pour les générateurs IA (repas / sport)
# OPENAI_API_KEY=sk-...
```

> ⚠️ Le fichier `server/.env.exemple` actuel référence d'anciennes variables Supabase (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`) qui ne sont plus utilisées par le code. Les variables réellement lues sont `DATABASE_URL` ([`prisma.service.ts`](server/src/prisma.service.ts)) et `DIRECT_URL` ([`prisma.config.ts`](server/prisma.config.ts)).

---

## Commandes disponibles

### Racine (monorepo)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance client (CRA) et serveur (NestJS watch) en parallèle |
| `npm run build` | Compile le client puis le serveur |

### Client (`--workspace=client`)

| Commande | Description |
|----------|-------------|
| `npm start` | Lance le frontend en mode développement |
| `npm run build` | Compile le frontend pour la production |

### Serveur (`--workspace=server`)

| Commande | Description |
|----------|-------------|
| `npm run start:dev` | Lance l'API en mode watch |
| `npm run start:prod` | Lance l'API compilée (`dist/main`) |
| `npm run build` | Compile l'API (`nest build`) |
| `npm run lint` | Lint + fix ESLint |
| `npm run test` | Tests unitaires (Jest) |
| `npm run test:e2e` | Tests end-to-end |
| `npx prisma migrate dev` | Crée/applique une migration en développement |
| `npx prisma generate` | Régénère le client Prisma |

---

## Roadmap

### Socle (todo + calendrier)

- [x] Gestion des catégories avec couleur
- [x] Tâches et sous-tâches avec priorités
- [x] Calendrier hebdomadaire / mensuel
- [x] Ajout de durées estimées sur les tâches
- [x] Planification automatique des tâches dans le calendrier
- [x] Conversion en monorepo avec un back NestJS (+ Prisma / PostgreSQL)
- [ ] Ajout d'un loader (états de chargement)
- [ ] Gestion des erreurs (API + UI)
- [ ] Validation des entrées côté serveur (`class-validator` / `ValidationPipe`)
- [ ] Persistance des événements planifiés en base

### Module Repas (IA)

- [ ] Intégration de l'API OpenAI côté serveur
- [ ] Génération de repas personnalisés selon les préférences
- [ ] Gestion des préférences alimentaires utilisateur
- [ ] Favoris
- [ ] Intégration des repas dans le calendrier

### Module Exercices (IA)

- [ ] Génération de programmes sportifs personnalisés (niveau / objectifs)
- [ ] Favoris
- [ ] Planification automatique des séances dans le calendrier

### Transverse

- [ ] Authentification utilisateur (données par compte)
- [ ] Calendrier unifié (todo + repas + sport)
- [ ] Tests automatisés (unitaires + e2e) et CI
- [ ] Déploiement (client + serveur + base)

---

## Licence

Projet personnel — tous droits réservés.
