<template>
  <b-container class="mt-3">
    <b-row>
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
                v-model="findLocationForm.location"
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
            v-model="slide"
            :interval="4000"
            controls
            img-width="1024"
            img-height="480"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52" />
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54" />
            <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide>
            <b-carousel-slide>
              <template #img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="https://picsum.photos/1024/480/?image=55"
                  alt="image slot"
                >
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>



<script>
export default {
  name: 'Home',
  data() {
    return {
      findLocationForm: {
        location: 'TPHCM'
      },
      locations: ['TPHCM', 'HN', 'ĐN']
    }
  }
}
</script>

<style scoped>
  .find-workspace-form {
    width: 300px;
    min-width: 300px;
    height: auto;
    top: 25px;
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
