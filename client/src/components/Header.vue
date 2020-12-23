<template>
  <b-navbar class="bg-white" toggleable="lg" type="light" variant="light">
    <b-container>
      <b-navbar-brand to="/">ZeroBugs</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item class="ml-4" to="/locations">
            <div class="text-dark">Locations</div>
          </b-nav-item>
          <b-nav-item class="ml-4" to="/ideas">
            <div class="text-dark">Ideas</div>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="ml-4" to="/about">
            <div class="text-dark">Contact us</div>
          </b-nav-item>

          <b-nav-item-dropdown v-if="currentUser" right class="ml-4">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person" font-scale="1" variant="dark" />
              &ensp;
              <span class="text-dark">User</span>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-else class="ml-4" to="/login">
            <div class="text-dark">
              <b-icon icon="person" font-scale="1" variant="dark" />
              &ensp;
              Login
            </div>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      currentUser: null
    }
  }
}
</script>

<style scoped>
  .nav-item-text > a {
    color: #000000;
  }
</style>
