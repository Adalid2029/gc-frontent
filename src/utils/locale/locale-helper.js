const localesMapping = {
  Afrikaans: "af",
  Arabic: "ar",
  Bengali: "bn",
  Bulgarian: "bg",
  Catalan: "ca",
  Chinese: "zh-CN",
  Croatian: "hr",
  Czech: "cs",
  Danish: "da",
  Dutch: "nl",
  English: "en-US",
  French: "fr",
  German: "de",
  Greek: "el",
  Hindi: "hi",
  Hungarian: "hu",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Lithuanian: "lt",
  Mongolian: "mn",
  Norwegian: "nn",
  Persian: "fa-IR",
  Polish: "pl",
  Romanian: "ro",
  Russian: "ru",
  Slovak: "sk",
  Spanish: "es",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Vietnamese: "vi",
  "pt-BR.Portuguese": "pt-BR",
  "pt-PT.Portuguese": "pt",
};

const monthFirstShort = "M/d/yyyy";
const monthFirstLong = "MM/dd/yyyy";
const dayFirstShort = "d/M/yyyy";
const dayFirstLong = "dd/MM/yyyy";

// Original list from here: https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript
const dateFormatMapping = {
  af: "yyyy/MM/dd",
  ar: dayFirstLong,
  "ar-AE": dayFirstLong,
  "ar-BH": dayFirstLong,
  "ar-DZ": "dd-MM-yyyy",
  "ar-EG": dayFirstLong,
  "ar-IQ": dayFirstLong,
  "ar-JO": dayFirstLong,
  "ar-KW": dayFirstLong,
  "ar-LB": dayFirstLong,
  "ar-LY": dayFirstLong,
  "ar-MA": "dd-MM-yyyy",
  "ar-OM": dayFirstLong,
  "ar-QA": dayFirstLong,
  "ar-SA": "dd/MM/yy",
  "ar-SY": dayFirstLong,
  "ar-TN": "dd-MM-yyyy",
  "ar-YE": dayFirstLong,
  bg: "dd.M.yyyy",
  bn: "dd-MM-yy",
  ca: dayFirstLong,
  cs: "d.M.yyyy",
  da: "dd-MM-yyyy",
  de: "dd.MM.yyyy",
  el: dayFirstShort,
  "en-029": monthFirstLong,
  "en-AU": "d/MM/yyyy",
  "en-BZ": dayFirstLong,
  "en-CA": dayFirstLong,
  "en-GB": dayFirstLong,
  "en-IE": dayFirstLong,
  "en-IN": "dd-MM-yyyy",
  "en-JM": dayFirstLong,
  "en-MY": dayFirstShort,
  "en-NZ": "d/MM/yyyy",
  "en-PH": monthFirstShort,
  "en-SG": dayFirstShort,
  "en-TT": dayFirstLong,
  "en-US": monthFirstShort,
  "en-ZA": "yyyy/MM/dd",
  "en-ZW": monthFirstShort,
  es: dayFirstLong,
  "es-AR": dayFirstLong,
  "es-BO": dayFirstLong,
  "es-CL": "dd-MM-yyyy",
  "es-CO": dayFirstLong,
  "es-CR": dayFirstLong,
  "es-DO": dayFirstLong,
  "es-EC": dayFirstLong,
  "es-ES": dayFirstLong,
  "es-GT": dayFirstLong,
  "es-HN": dayFirstLong,
  "es-MX": dayFirstLong,
  "es-NI": dayFirstLong,
  "es-PA": monthFirstLong,
  "es-PE": dayFirstLong,
  "es-PR": dayFirstLong,
  "es-PY": dayFirstLong,
  "es-SV": dayFirstLong,
  "es-US": monthFirstShort,
  "es-UY": dayFirstLong,
  "es-VE": dayFirstLong,
  "et-EE": "d.MM.yyyy",
  "eu-ES": "yyyy/MM/dd",
  "fa-IR": monthFirstLong,
  fr: dayFirstLong,
  "fr-BE": "d/MM/yyyy",
  "fr-CA": "yyyy-MM-dd",
  "fr-CH": "dd.MM.yyyy",
  "fr-FR": dayFirstLong,
  "fr-LU": dayFirstLong,
  "fr-MC": dayFirstLong,
  hi: "dd-MM-yyyy",
  hr: "d.M.yyyy.",
  "hr-BA": "d.M.yyyy.",
  "hr-HR": "d.M.yyyy",
  hu: "yyyy. MM. dd.",
  id: dayFirstLong,
  it: dayFirstLong,
  "it-CH": "dd.MM.yyyy",
  "it-IT": dayFirstLong,
  ja: "yyyy/MM/dd",
  ko: "yyyy. MM. dd",
  lt: "yyyy.MM.dd",
  mn: "yy.MM.dd",
  "mn-MN": "yy.MM.dd",
  "mn-Mong-CN": "yyyy/M/d",
  // TODO: remove some others below this line
  nl: "d/MM/yyyy",
  "nl-BE": "d/MM/yyyy",
  "nl-NL": "d-M-yyyy",
  nn: "dd.MM.yyyy",
  pl: "dd.MM.yyyy",
  pt: "dd-MM-yyyy",
  "pt-BR": dayFirstShort,
  "pt-PT": "dd-MM-yyyy",
  ro: "dd.MM.yyyy",
  ru: "dd.MM.yyyy",
  sk: "d. M. yyyy",
  th: dayFirstShort,
  tr: "dd.MM.yyyy",
  uk: "dd.MM.yyyy",
  vi: dayFirstLong,
  zh: "yyyy/M/d",
  "zh-CN": "yyyy/M/d",
  "zh-HK": dayFirstShort,
  "zh-MO": dayFirstShort,
  "zh-SG": dayFirstShort,
  "zh-TW": "yyyy/M/d",
  "zu-ZA": "yyyy/MM/dd",
};

const getBrowserLocale = () => {
  return navigator.language;
};

export const getDateFormatFromLocale = (locale) => {
  // As we are trying to automatically understand which language and region the user uses, we are trying to
  // combine it with the default language of the CRUD

  // Step 1. Check if the language of the browser is the same as the CRUD language
  const browserLocale = getBrowserLocale();
  if (browserLocale.substring(0, 2) === locale.substring(0, 2)) {
    // Same language, try to find the region
    if (dateFormatMapping[browserLocale]) {
      return dateFormatMapping[browserLocale];
    }
  }

  // Step 2. The browser locale doesn't help much so search from the locale of the language
  if (dateFormatMapping[locale]) {
    return dateFormatMapping[locale];
  }

  // Step 3. Fallback just in case
  return "yyyy-MM-dd";
};

export const getLocaleFromLanguage = (language) => {
  if (localesMapping[language]) {
    return localesMapping[language];
  }

  return localesMapping["English"];
};
