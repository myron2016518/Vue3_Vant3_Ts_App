import { createI18n } from "vue-i18n"; // import from runtime only

// import { getLanguage } from '@/utils/cookies'

// import elementEnLocale from 'element-plus/lib/locale/lang/en'
// import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
// import enUS from "vant/es/locale/lang/en-US";
// import zhCN from "vant/es/locale/lang/zh-CN";

// User defined lang
import enLocale from "@/locales/en";
import zhLocale from "@/locales/zh-cn";

const messages = {
  en: {
    ...enLocale,
    // ...enUS,
  },
  // "zh-cn": {
  //   ...zhLocale,
  //   // ...zhCN,
  // },
};

export const getLocale = () => {
  const cookieLanguage = sessionStorage.lang;
  if (cookieLanguage) {
    return cookieLanguage;
  }
  const language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }

  // Default language is english
  return "en";
};

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en", // set fallback locale
  // legacy: false,
  silentTranslationWarn: true,
  // messages,
  messages: messages,
});

// export default i18n;
/*  */

// import { nextTick } from "vue";
// import { createI18n } from "vue-i18n";

export const loadedLanguages = ["en"];

export function setI18nLanguage(lang: string, load = true) {
  if (load) {
    /* eslint-disable @typescript-eslint/no-use-before-define */
    loadLanguageAsync(lang).then(() => {
      sessionStorage.lang = lang;
      return lang;
    });
  } else {
    i18n.global.locale = lang;
    // axios.defaults.headers.common['Accept-Language'] = lang
    (document.querySelector("html") as HTMLElement).setAttribute("lang", lang);
    sessionStorage.lang = lang;
    return lang;
  }
}

export function loadLanguageAsync(lang: string) {
  if (
    i18n.global.locale !== lang ||
    !loadedLanguages.includes(lang)
    // (!loadedLanguages.includes(lang) &&
    //   LanguageList.find((l: { code: string; }) => l.code == lang))
  ) {
    if (!loadedLanguages.includes(lang)) {
      return import(
        /* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.ts`
      ).then((msgs) => {
        console.log(msgs);
        i18n.global.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang, false));
  }
  return Promise.resolve(setI18nLanguage(lang, false));
}
