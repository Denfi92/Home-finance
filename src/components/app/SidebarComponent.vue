<template>
  <ul class="sidenav app-sidenav" :class="{open: modelValue}">
    <li
      v-for='{title, url, axact} in links'
      :key='title'
    >
      <router-link
        :to='url'
        class='waves-effect waves-orange pointer'
        active-class="active"
        :exact='axact'
      >
      {{title}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import localizeFilter from '@/filters/localize.filter';

export default {
  props: ['modelValue'],
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/', axact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' },
    ],
  }),
};
</script>

<style scoped>

.active {
  background-color: rgba(0,0,0,0.05);
}
</style>
