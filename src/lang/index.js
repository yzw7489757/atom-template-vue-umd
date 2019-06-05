import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
};

const i18n = new VueI18n({
  // set locale
  locale: Cookies.get('language') || 'zh',
  // set locale messages
  messages,
});

export default i18n;
