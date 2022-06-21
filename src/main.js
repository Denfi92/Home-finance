import { createApp } from 'vue';
import messagePlugin from '@/utlis/message.plugin';
import titlePlugin from '@/utlis/title.plugin';
import firebase from 'firebase/compat/app';
import tooltipDirective from '@/directives/tooltip.directive';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import Pagination from 'v-pagination-3';
import localizeFilter from '@/filters/localize.filter';
import { createMetaManager } from 'vue-meta';
import Loader from './components/app/LoaderComponent.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';
import currencyFilter from './filters/currency.filter';
import dateFilter from './filters/date.filter';

firebase.initializeApp({
  apiKey: 'AIzaSyDTAKmoWXVGt_ZPvcOWr_hW1Btfj_IsPvI',
  authDomain: 'vue-course-crm-vm.firebaseapp.com',
  projectId: 'vue-course-crm-vm',
  storageBucket: 'vue-course-crm-vm.appspot.com',
  messagingSenderId: '1083096947251',
  appId: '1:1083096947251:web:979424d7ee64d9543ea146',
});
let application;

firebase.auth().onAuthStateChanged(() => {
  if (!application) {
    const app = createApp(App);
    app.config.globalProperties.$filters = {
      localize(value) {
        return localizeFilter(value);
      },
      currency(value, currency = 'RUB') {
        const cur = currencyFilter(value, currency);
        return cur;
      },
      date(value, format = 'date') {
        const date = dateFilter(value, format);
        return date;
      },
    };
    app.use(messagePlugin);
    app.use(titlePlugin);
    app.component('LoaderComponent', Loader);
    app.component('PaginationComponent', Pagination);
    app.directive('tooltip', tooltipDirective);
    app.use(store);
    app.use(router);
    app.use(createMetaManager());
    router.isReady().then(() => app.mount('#app'));
  }
});
