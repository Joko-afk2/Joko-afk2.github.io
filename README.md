# Joko

Site personnel statique. La page française est à la racine, la page anglaise dans `en/`.

## Fichiers

- `index.html` — page française
- `en/index.html` — page anglaise
- `css/style.css` — mise en page
- `js/site.js` — menu, tiroirs, formats du papier
- `favicon.svg` — icône
- `papiers/dou-vient-la-monnaie.pdf` — papier
- `papiers/dou-vient-la-monnaie.tex` — source du papier
- `images/` — images de la galerie

## Galerie

Déposer l’image dans `images/`, puis l’ajouter dans la galerie des deux pages :

```html
<img src="images/nom.jpg" alt="ce que montre l'image">
```

Sur la page anglaise, le chemin est `../images/nom.jpg`.

## Ressources

Dans la liste du menu, une ligne par ressource :

```html
<li><a href="https://…">Nom</a></li>
```

## Ouvrir en local

Ouvrir `index.html` dans un navigateur, ou lancer un serveur dans ce dossier :

```bash
python -m http.server 8765
```
