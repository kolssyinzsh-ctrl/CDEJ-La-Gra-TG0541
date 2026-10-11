# CDEJ TG 0541 — application Android

1. Importer tout le contenu de ce dossier dans un dépôt GitHub (branche `main`),
   y compris le dossier caché `.github/workflows/build-apk.yml`.
2. Onglet **Actions** → « Build APK CDEJ TG 0541 » → attendre ~5 à 8 min (coche verte).
3. Récupérer `CDEJ-TG-0541.apk` dans **Releases** (colonne de droite du dépôt) ou dans les « Artifacts ».
4. Installer sur le téléphone (autoriser « sources inconnues »).

**Mises à jour de l'application** : remplacer `www/index.html` par la nouvelle version
(en conservant la ligne `<script src="cdej-native.js">` et les adaptations du partage), puis commit.
La clé `signing/debug.keystore` ne doit JAMAIS changer : elle permet d'installer
la nouvelle version par-dessus l'ancienne sans perdre les données.

**Échange entre collègues** : Paramètres → « Exporter pour partage » → menu Partager (WhatsApp, Drive…)
→ chez le collègue : « Importer et fusionner ». Faire aussi une « Sauvegarde » régulière.
