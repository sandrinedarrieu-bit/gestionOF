# GestionOF — Formulaire prospect L'Okara

## Contenu
- `index.html` — page publique du formulaire
- `api/formations.js` — liste les formations pour le menu déroulant
- `api/submit.js` — crée le stagiaire (statut "Prospect") dans Airtable

## Mise en place sur Vercel

1. Crée le projet Vercel `gestionOF` et importe ce dossier (ou pousse-le d'abord sur un dépôt GitHub, comme pour tes autres projets).
2. Dans les réglages du projet Vercel → **Environment Variables**, ajoute :
   - `AIRTABLE_API_KEY` = ton token API Airtable (Personal Access Token avec les scopes `data.records:read` et `data.records:write` sur la base `L'Okara - Gestion Stagiaires`)
3. Déploie. Vercel détecte automatiquement les fichiers du dossier `api/` comme fonctions serverless.

## Vérifications avant mise en ligne

- Le champ `Nom de la formation` doit être rempli sur au moins une ligne de la table `Formations` pour que le menu déroulant ne soit pas vide.
- Le champ `Formation souhaitée` dans `Stagiaires` doit être un lien vers `Formations` (déjà fait).
- Le champ `Statut` doit contenir l'option exacte "Prospect" (déjà confirmé).

## Prochaine étape

Une fois ce formulaire en ligne et testé, l'étape suivante est l'automatisation Make : dès qu'un enregistrement est créé avec `Statut = Prospect`, envoyer un email avec le programme PDF de la formation choisie et le lien vers le questionnaire de pré-inscription Tally.
