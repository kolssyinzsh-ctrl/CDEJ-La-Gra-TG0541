import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { App } from '@capacitor/app';

if (Capacitor.isNativePlatform()) {
  const toBase64 = (blob) => new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(',')[1] || '');
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });

  window.CDEJ_NATIVE = {
    // Écrit le fichier dans le cache de l'app puis ouvre le menu Android
    // "Partager / Enregistrer" (WhatsApp, Drive, Fichiers, e-mail...).
    async save(blob, name) {
      const safe = String(name).replace(/[^\w.\-]+/g, '_');
      try {
        const data = await toBase64(blob);
        const res = await Filesystem.writeFile({
          path: 'export/' + safe, data, directory: Directory.Cache, recursive: true,
        });
        await Share.share({ title: name, dialogTitle: 'Enregistrer / envoyer ' + name, url: res.uri });
      } catch (e) {
        const m = String((e && e.message) || e);
        if (!/cancel/i.test(m)) alert('Impossible de partager le fichier : ' + m);
      }
    },
    exit() { App.exitApp(); },
  };

  // Android : le sélecteur grise parfois les fichiers .json reçus par WhatsApp.
  // On retire donc le filtre "accept" des champs d'import (données + sauvegarde).
  const fixInputs = () => document.querySelectorAll('#share-file,#st-file')
    .forEach((i) => i.hasAttribute('accept') && i.removeAttribute('accept'));
  new MutationObserver(fixInputs).observe(document.documentElement, { childList: true, subtree: true });
  fixInputs();

  // Bouton retour Android.
  App.addListener('backButton', () => {
    const ov = document.querySelector('.cdejx-ov');
    if (ov) { ov.remove(); return; }
    const page = document.querySelector('.page.active');
    if (page && page.id !== 'dashboard' && typeof window.go === 'function') { window.go('dashboard'); return; }
    App.exitApp();
  });
}
