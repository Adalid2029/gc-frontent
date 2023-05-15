import localForage from "localforage";
import { languageEnglish } from "./language-english";

class translationsLibrary {
  translations = {};
  debug = false;

  constructor() {
    // Always making sure that we have at least English as a fallback
    this.translations = languageEnglish;

    // try to get any value from localForage
    // so we will not have an empty translation object at the very beginning
    localForage.getItem("gc-i18n").then((translationsFromLocalForage) => {
      if (translationsFromLocalForage !== null) {
        this.translations = translationsFromLocalForage;
      }
    });
  }

  init(translationsObject) {
    this.translations = translationsObject;

    localForage
      .setItem("gc-i18n", {
        ...translationsObject,
        subject: "",
        subject_plural: "",
      })
      .catch(() => {
        console.warn("Cannot set item in localForage for gc-i18n");
      });
  }

  t(translation) {
    // When we are in debug mode, just return the key without the translation
    if (this.debug) {
      return translation;
    }

    if (this.translations[translation]) {
      return this.translations[translation];
    }
    return "";
  }

  format(strRaw, args) {
    let str = strRaw;
    if (!args && !args.length) {
      return str;
    }
    Object.keys(args).forEach((argName) => {
      str = str.replace(RegExp("\\{" + argName + "\\}", "gi"), args[argName]);
    });
    return str;
  }
}

const i18n = new translationsLibrary();

export default i18n;
