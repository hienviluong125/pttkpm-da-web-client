<template>
  <div>
    <!-- authentication page layout  -->
    <div v-if="['/login', '/sign_up'].includes(currentPath())" id="app">
      <slot></slot>
    </div>
    <!-- End authentication page layout  -->

    <!-- Client page layout  -->
    <div
      v-if="['/', '/locations', '/ideas', '/about', '/partner'].includes(currentPath())"
      id="app"
    >
      <Header />
      <slot></slot>
      <Footer />
    </div>
    <!-- End client page layout  -->
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "DynamicLayout",
  components: {
    Header,
    Footer,
  },
  methods: {
    currentPath() {
      return `/${window.location.hash.split("/")[1]}`;
    },
  },
};
</script>
