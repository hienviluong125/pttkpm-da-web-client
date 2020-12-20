<template>
  <div id="app">
    <Header v-if="currentPath() !== '/login'" />
    <div class="h-auto min-vh-100">
      <router-view />
    </div>
    <Footer v-if="currentPath() !== '/login'" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    currentPath() {
      return this.$router.history.current.path;
    }
  }
};
</script>
