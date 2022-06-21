import localizeFilter from '@/filters/localize.filter';
import * as M from 'materialize-css/dist/js/materialize.min';

export default {
  beforeMount(el, { value, modifiers }) {
    M.Tooltip.init(el, { html: modifiers.noloc ? value : localizeFilter(value) });
  },
  unmounted(el) {
    const tooltip = M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
