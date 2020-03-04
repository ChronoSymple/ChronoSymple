import i18n from 'i18next';

i18n.init({
  // we init with resources
  resources: {
    en: {
      translations: {
        profile: "Profile",
        disconnect: "Disconnect",
        settings: "Settings",
        search: "Search...",
         lang: "choose website language",
         lastname:"Lastname",
         firstname:"Firstname",
         birthDate:"Birth date",
         patState:"patient status",
         contact:"Contact us",
         list: "list",
        language: "English",
        diabetes: "Diabetes",
        born: "born in",
      }
    },
    
    fr: {
      translations: {
        profile: "Profil",
        disconnect: "Déconnection",
        settings: "Paramètres",
        search: "Recherche...",
        lang: "choisissez la langue du site",
        lastname:"Nom",
        firstname:"Prénom",
        birthDate:"Date de naissance",
        patState:"Etat du patient",
        contact:"Contactez nous",
        list: "liste",
        language: "Français",
        diabetes: "Diabète",
        born: "né(e) le",
      }
    }
  },
  fallbackLng: "fr",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;