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
            <!-- Partner -->
            <b-dropdown-item @click="navigateTo('/partner/blog')" v-if="currentUser.role == 'partner'">
              Blogs
            </b-dropdown-item>
            <b-dropdown-item @click="navigateTo('/partner/workspace')" v-if="currentUser.role == 'partner'">
              Workspaces
            </b-dropdown-item>
            <b-dropdown-item @click="navigateTo('/partner/booking')" v-if="currentUser.role == 'partner'">
              Workspace Bookings
            </b-dropdown-item>
            <!-- End Partner -->

            <!-- Member -->
            <b-dropdown-item @click="navigateTo('/member/blog')" v-if="currentUser.role == 'member'">
              Blogs
            </b-dropdown-item>
            <b-dropdown-item @click="navigateTo('/member/booking')" v-if="currentUser.role == 'member'">
              My Bookings
            </b-dropdown-item>
            <!-- End Member -->
            <b-dropdown-item @click="handleLogout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item v-else class="ml-4" to="/login">
            <div class="text-dark">
              <b-icon icon="person" font-scale="1" variant="dark" />
              &ensp; Login
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import axios from "../utils/axiosHelper";
import { setUser, clearAllTokens, getToken, getUser } from "../libs/token";

export default {
  name: "Header",
  data() {
    return {
      currentUser: null,
    };
  },
  mounted() {
    if (getUser()) {
      this.currentUser = getUser();
      return;
    } else {
      if (
        ["/", "/locations", "/ideas", "/about"].includes(this.currentPath()) &&
        getToken()
      ) {
        axios.get("/api/user/profile").then((res) => {
          this.currentUser = res.data.user;
          setUser(res.data.user);
        });
      }
    }
  },
  methods: {
    navigateTo(toUrl) {
      this.$router.push(toUrl)
    },
    handleLogout() {
      clearAllTokens();
      this.$router.push("/login");
    },
    currentPath() {
      return `/${window.location.hash.split("/")[1]}`;
    },
  },
};
</script>

<style scoped>
.nav-item-text > a {
  color: #000000;
}
</style>
