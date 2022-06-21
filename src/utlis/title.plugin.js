/* eslint-disable no-param-reassign */
import locaizeFilter from '@/filters/localize.filter';

export default {
  install(app) {
    app.config.globalProperties.$title = function title(titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      return `${locaizeFilter(titleKey)} | ${appName}`;
    };
  },
};
