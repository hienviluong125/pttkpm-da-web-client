<template>
  <b-container class="mb-5">
    <b-row class="p-0" v-if="workspacePagy">
      <h3 class="mt-5 mb-4 pl-3">All locations we supported</h3>
      <b-col
        :lg="index == 0 ? '12' : '4'"
        md="12"
        sm="12"
        xs="12"
        v-for="(workspace, index) in workspacePagy.data"
        :key="index"
      >
        <div v-if="index == 0">
          <div class="mt-4 active-blog d-lg-flex d-none">
            <img
              class="w-50 rounded-left blog-image"
              :src="workspace.Attachments[0].url + '?random=' + index"
            />
            <div
              class="info w-50 rounded-right border border-left-0 p-5 d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="'locations/' + workspace.id">
                  <h3 class="truncate-text" v-b-tooltip.hover :title="workspace.name">{{ workspace.name }}</h3>
                </router-link>
                <p class="mt-3 truncate-text" v-b-tooltip.hover :title="workspace.description">
                  {{ workspace.description }}
                </p>
              </div>

              <div class="botton-info">
                <p class="m-0 font-weight-light truncate-text" v-b-tooltip.hover :title="workspace.address + ' - ' + workspace.country">
                  {{ workspace.address }} - {{ workspace.country }}
                </p>
                <h5>
                  <b-badge variant="light"
                    >$ {{ parseInt(workspace.price) }}
                    <small class="fw-normal">/ hour</small></b-badge
                  >
                </h5>
              </div>
            </div>
          </div>

          <div class="d-lg-none d-md-block d-sm-block d-xs-block">
            <img
              class="w-100 rounded-top blog-image"
              :src="workspace.Attachments[0].url + '?random=' + index"
            />
            <div
              class="info px-3 py-4 border-left border-right border-bottom rounded-bottom d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="'locations/' + workspace.id">
                  <h3 class="truncate-text" v-b-tooltip.hover :title="workspace.name">{{ workspace.name }}</h3>
                </router-link>
                <p class="mt-3 cut-text truncate-text">
                  {{ workspace.description }}
                </p>
              </div>

              <div class="botton-info">
                <p class="m-0 font-weight-light truncate-text" v-b-tooltip.hover :title="workspace.address + ' - ' + workspace.country">
                  {{ workspace.address }} - {{ workspace.country }}
                </p>
                <h5>
                  <b-badge variant="light"
                    >$ {{ parseInt(workspace.price) }}
                    <small class="fw-normal">/ hour</small></b-badge
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mt-4">
          <div>
            <img
              class="w-100 rounded-top blog-image"
              :src="workspace.Attachments[0].url + '?random=' + index"
            />
            <div
              class="info px-3 py-4 border-left border-right border-bottom rounded-bottom d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="'locations/' + workspace.id">
                  <h3 class="truncate-text" v-b-tooltip.hover :title="workspace.name">{{ workspace.name }}</h3>
                </router-link>
                <p class="mt-3 truncate-text" v-b-tooltip.hover :title="workspace.description">
                  {{ workspace.description }}
                </p>
              </div>

              <div class="botton-info">
                <p class="m-0 font-weight-light truncate-text" v-b-tooltip.hover :title="workspace.address + ' - ' + workspace.country">
                  {{ workspace.address }} - {{ workspace.country }}
                </p>
                <h5>
                  <b-badge variant="light"
                    >$ {{ parseInt(workspace.price) }}
                    <small class="fw-normal">/ hour</small></b-badge
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12" class="text-center mt-4">
        <b-button :variant="workspacePagy.nextPage == -1 ? 'light' : 'primary'" class="w-100" :disabled="workspacePagy.nextPage == -1" @click="loadMore()">{{workspacePagy.nextPage == -1 ? 'No more workspaces' : 'Load more'}}</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "../utils/axiosHelper";
export default {
  name: "Locations",
  data() {
    return {
      workspacePagy: null,
    };
  },
  mounted() {
    axios.get("/api/workspace/hot_workspaces").then((res) => {
      if (res.data.success) {
        this.workspacePagy = res.data.workspacePagy;
      }
    });
  },
  methods: {
    loadMore() {
      axios.get(`/api/workspace/hot_workspaces?page=${this.workspacePagy.nextPage}`).then((res) => {
        if (res.data.success) {
          const previousWorkspace = this.workspacePagy.data;
          const newWorkspacePagy = {
            ...res.data.workspacePagy,
            data: [...previousWorkspace, ...res.data.workspacePagy.data]
          }
          this.workspacePagy = newWorkspacePagy
        }
      });
    }
  }
};
</script>

<style scoped>
/* // Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .truncate-text {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 250px;
    white-space: nowrap;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .truncate-text {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 300px;
    white-space: nowrap;
  }
}
</style>