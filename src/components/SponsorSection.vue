<template>
  <b-row>
    <h3 class="mt-4">Trusted by the world’s top companies</h3>
    <div class="">
      <p class="mt-4">From entrepreneurs to Fortune 500s, we’re listening and learning from our global community of businesses as they adapt and reinvent.</p>
    </div>
    <b-col
      :key="index"
      v-for="(sponsorImage, index) in sponsorImageList"
      lg="2"
      md="4"
      sm="6"
      xs="6"
    >
      <div class="sponsor-icon bg-gray d-flex justify-content-center align-items-center mt-sm-4 mb-sm-1 mt-xs-4 mb-sm-1">
        <img :src="sponsorImage" width="100" height="auto" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "SponsorSection",
  data() {
    return {
      sponsorImageList: [
        "image/brands/sponsor0.png",
        "image/brands/sponsor1.png",
        "image/brands/sponsor2.png",
        "image/brands/sponsor3.png",
        "image/brands/sponsor4.png",
        "image/brands/sponsor5.png",
      ],
    };
  },
};
</script>

<style scoped>
  .sponsor-icon {
    width: auto;
    height: 112px;
  }

  .bg-gray {
    background: #f7f7f7;
  }
</style>
