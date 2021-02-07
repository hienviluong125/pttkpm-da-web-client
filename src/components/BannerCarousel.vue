<template>
  <b-row class="mt-3">
    <b-col lg="2" md="12" sm="12" xs="12">
      <div class="find-workspace-form bg-white rounded p-3 m-auto">
        <h3>
          Reimagine your workspace
        </h3>
        <p class="mt-4">
          Whether you’re an established enterprise or a growing startup, discover flexible spaces and solutions to move your business forward.
        </p>
        <b-form>
          <b-form-group id="input-group-3" label="Find workspace in" label-for="location-input">
            <b-form-select
              id="location-input"
              v-model="selected"
              :options="locations"
              required
            ></b-form-select>
          </b-form-group>

          <b-button type="submit" class="w-100" variant="primary">Start</b-button>
        </b-form>
      </div>
    </b-col>
    <b-col lg="10" md="12" sm="12" xs="12">
      <div>
        <b-carousel
          :interval="0"
          controls
          img-width="920"
          img-height="520"
        >
          <b-carousel-slide img-src="image/banners/banner1.jpg" />
          <b-carousel-slide img-src="image/banners/banner2.jpg" />
          <b-carousel-slide img-src="image/banners/banner3.jpg" />
          <b-carousel-slide img-src="image/banners/banner4.jpg" />
        </b-carousel>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import tinh_tp from './../utils/tinh_tp.json';
export default {
  name: 'BannerCarousel',
  data() {
    return {
      selected: null,
      locations: []
    }
  },
  mounted() {
    this.locations = Object.keys(tinh_tp).map(code => {
      return {
        value: tinh_tp[code],
        text: tinh_tp[code].name
      }
    });

    this.selected = tinh_tp["79"]
  }
}
</script>

<style scoped>
  .find-workspace-form {
    width: 300px;
    min-width: 300px;
    height: auto;
    top: 55px;
    z-index: 2;
  }

  /* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
  @media (min-width: 576px) {
    .find-workspace-form {
      position: relative;
      min-width: 400px;
    }
  }

  @media (min-width: 992px) {
    .find-workspace-form {
      position: absolute;
      min-width: 300px;
    }
  }

</style>
