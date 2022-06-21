/* eslint-disable no-param-reassign */
import localizeFilter from '@/filters/localize.filter';
import * as M from 'materialize-css/dist/js/materialize.min';

export default {
  install(app) {
    app.config.globalProperties.$message = function message(html) {
      M.toast({ html });
    };
    app.config.globalProperties.$error = function error(html) {
      M.toast({ html: `[${localizeFilter('Error')}]: ${html}` });
    };
  },
};
