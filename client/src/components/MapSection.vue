<template>
  <b-row class="bg-gray p-5 m-5">
    <b-col lg="5" md="12" sm="12" xs="12" class="pr-lg-5 mt-sm-5">
      <p>GLOBAL REACH</p>
      <h3 class="mt-4">Workspace where and how you need it</h3>
      <p class="mt-4">With over 800 locations worldwide, WeWork offers you workspace where and how you need it, whether your goal is to be closer to home, empower your team in different cities, or have a go-to private space where you can actually focus.
      </p>
      <router-link :to="linkTo" class="text-decoration-none mt-4">
        <div class="d-flex align-items-center">
          <span class="mr-1">Explore</span>
          <b-icon icon="arrow-right" font-scale="1" variant="primary" />
        </div>
      </router-link>
    </b-col>
    <b-col lg="7" md="12" sm="12" xs="12" class="mt-md-5 mt-xs-5">
      <img src="image/earth.jpg" class="w-100" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'MapSection',
  props: {
    linkTo: String
  }
}
</script>

<style scoped>
  .bg-gray {
    background: #f7f7f7;
  }
</style>
