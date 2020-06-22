<template>
  <div id="app">
    <app-header></app-header>
    <memo-app></memo-app>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import MemoApp from './components/MemoApp.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    MemoApp
  }
};
</script>

<style>
@import './styles/reset.css';

#app {
  width: 560px;
  margin: 0 auto;
}
</style>
