<template>
  <b-row class="mt-5">
    <b-col lg="7" md="12" sm="12" xs="12" class="section-image">
      <img class="rounded w-100" :src="imagePath" />
    </b-col>
    <b-col lg="5" md="12" sm="12" xs="12" class="section-info">
      <slot />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'LandingPageSection',
  props: {
    imagePath: String,
    videoUrl: String
  },
  data() {
    return {
    }
  }
}
</script>
