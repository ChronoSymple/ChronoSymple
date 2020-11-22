import i18n from 'i18next';

i18n.init({
  // we init with resources
  resources: {
    en: {
      translations: {
        profile: 'Profile',
        disconnect: 'Disconnect',
        settings: 'Settings',
        search: 'Search...',
        lang: 'choose website language',
        lastname: 'Lastname',
        fullname: 'Full Mame',
        firstname: 'Firstname',
        birthDate: 'Birth date',
        patState: 'patient status',
        contact: 'Contact us',
        list: 'List',
        language: 'English',
        diabetes: 'Diabetes',
        born: 'born',
        changePasswd: '* To change any information you need to enter your password',
        specialities: 'specialities: Admin',
        password: 'password',
        choose: 'Choose a profile picture :',
        filters: 'Filters'
      }
    },

    fr: {
      translations: {
        profile: 'Profil',
        disconnect: 'Déconnection',
        settings: 'Paramètres',
        search: 'Recherche...',
        lang: 'choisissez la langue du site',
        lastname: 'Nom',
        fullname: 'Nom Complet',
        firstname: 'Prénom',
        birthDate: 'Date de naissance',
        patState: 'Etat du patient',
        contact: 'Contactez nous',
        list: 'Liste',
        language: 'Français',
        diabetes: 'Diabète',
        born: 'né(e) le',
        changePasswd: '* Pour changer toute information, vous avez besoin de changer le mot de passe',
        password: 'mot de passe',
        specialities: 'spécialités: Admin',
        choose: 'Choisissez votre photo de profil :',
        filters: 'Filtres'
      }
    }
  },
  fallbackLng: 'fr',
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
});

export default i18n;