# Le Bon Tuyaux - Projet MERN

## Introduction

Le Bon Tuyaux est une application MERN stack conçue pour gérer des annonces. Elle inclut l'authentification des
utilisateurs, la gestion des produits et un tableau de bord avec le CRUD utilisateurs.

## Démarrage

### Prérequis

- Node.js
- npm
- MongoDB

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/samueltomen/ipssi_singletp_mern.git
   cd ipssi_singletp_mern
   ```

2. Installez les dépendances pour le frontend et le backend :
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

### Démarrer l'application

1. Démarrez le serveur backend :
   ```bash
   cd backend
   npm start
   ```

2. Démarrez le serveur frontend :
   ```bash
   cd frontend
   npm run dev
   ```
3. Créer un .env dans le backend avec ces variables
   ```bash
    JWT_SECRET=[remplacer ici avec votre secret_key ]
    JWT_EXPIRES_IN=[remplacer ici pour determiner la durée de vie du token]
    ``` 

## Packages Utilisés

### Backend

- `express` : Framework web pour Node.js.
- `mongoose` : Outil de modélisation d'objets MongoDB.
- `bcryptjs` : Hachage de mots de passe.
- `jsonwebtoken` : Génération et vérification de tokens.
- `cors` : Activer le partage de ressources entre origines multiples.
- `dotenv` : Charger les variables d'environnement.

### Frontend

- `react` : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- `react-router-dom` : Bibliothèque de routage pour React.
- `axios` : Client HTTP.
- `react-toastify` : Notifications pour React.
- `bootstrap` : Framework frontend pour le design réactif.

## Pages Disponibles

### Home

- Affiche tous les produits.
- Permet le filtrage par catégorie.
- Fournit des options pour ajouter, mettre à jour et supprimer des produits (pour les utilisateurs connectés).

### Login

- Permet aux utilisateurs de se connecter à leur compte.

### Register

- Permet aux nouveaux utilisateurs de créer un compte.

### Gestion des utilisateurs (Admin)

- Tableau de bord administrateur pour gérer les utilisateurs et les produits.
- !! Les droits admin n'ont pas été set pour le moment !!

## Fonctionnalités

- **Authentification des utilisateurs** : Les utilisateurs peuvent s'inscrire et se connecter.
- **Gestion des produits** : Ajouter, mettre à jour et supprimer des produits.
- **Gestion des utilisateurs** : CRUD utilisateurs.
- **Filtrage** : Filtrer les produits par catégorie.
- **Notifications** : Notifications en temps réel avec `react-toastify`.

## Sécurité

### Routes Privées

- Les routes privées sont protégées et accessibles uniquement aux utilisateurs connectés.
- Implémentées avec le composant `PrivateRoute`.

### Token

- Les tokens JWT sont utilisés pour l'authentification.
- Les tokens sont stockés dans `localStorage` et envoyés avec chaque requête axios.

### Contexte d'Authentification

- `AuthContext` gère l'état d'authentification (`isLogged`).
- Fournit `isLogged` et `setIsLogged` aux composants.
