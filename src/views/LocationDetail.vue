<template>
  <b-container v-if="workspace">
    <b-row>
      <b-col cols="12" class="mt-3">
        <router-link to="locations" class="text-primary text-decoration-none">
          <b-icon icon="chevron-left" font-scale="1"></b-icon>
          Search
        </router-link>
      </b-col>
      <b-col cols="12" class="mt-3">
        <div class="d-flex justify-content-between">
          <h1>{{ workspace.name }}</h1>
          <div>
            <p>
              {{ workspace.address }},
              <br />
              {{ workspace.country }}
            </p>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col cols="8">
        <b-row>
          <b-col cols="12">
            <b-carousel
              v-if="workspace.Attachments"
              id="workspace-images"
              class="workspace-images"
              img-width="1024"
              img-height="480"
              :interval="4000"
              controls
              indicators
            >
              <b-carousel-slide
                v-for="(attachment, index) in workspace.Attachments"
                :key="attachment.id"
                :img-src="attachment.url + '?random=' + index"
              ></b-carousel-slide>
            </b-carousel>
          </b-col>
          <b-col cols="12" class="mt-5">
            <h2>Pricing</h2>
            <strong>$ {{ parseInt(workspace.price) }}</strong>
            / hour
          </b-col>
          <b-col cols="12" class="mt-4">
            <h2>Additional Services</h2>
            <b-row>
              <b-col
                v-for="workspaceService in workspace.WorkspaceServices"
                :key="workspaceService.id"
                cols="3"
              >
                <div class="workspace-service-cell text-center p-3 my-3">
                  <small>{{ workspaceService.name }}</small>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" class="mt-4">
            <h2>Location</h2>
            <mapbox
              access-token="pk.eyJ1IjoiaGllbnZpbHVvbmcxMjUiLCJhIjoiY2tsZXZueGZhMGtnYjJvcG1rZno1cGlxNSJ9.jfM9Qy6sGhBQqj5mG5ySZQ"
              :map-options="{
                style: 'mapbox://styles/mapbox/light-v10',
                center: [-80.9852, 46.49751],
                zoom: 18,
              }"
              :fullscreen-control="{
                show: true,
                position: 'top-right',
              }"
              @map-init="onInitMap"
            />
          </b-col>

          <b-col cols="12" class="mt-4 mb-5">
            <h2>Nearby Buildings</h2>
              <div class="w-100 mt-4 active-blog d-lg-flex" v-for="(nWorkspace, index) in nearbyWorkspaces"
              :key="nWorkspace.id">
                <img
                  class="w-25 rounded-left blog-image"
                  :src="nWorkspace.Attachments[0].url + '?random=' + index"
                />
                <div
                  class="info w-75 rounded-right border border-left-0 d-flex p-4 flex-column justify-content-center"
                >
                  <div class="botton-info">
                    <router-link :to="'/locations/' + nWorkspace.id">
                      <p
                        class="m-0 font-weight-light truncate-text"
                        v-b-tooltip.hover
                        :title="nWorkspace.address + ' - ' + nWorkspace.country"
                      >
                        {{ nWorkspace.address }} - {{ nWorkspace.country }}
                        &emsp;
                        <b-badge variant="light"
                        >$ {{ parseInt(nWorkspace.price) }}
                        <small class="fw-normal">/ hour</small></b-badge
                      >
                      </p>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="4">
        <b-row>
          <b-col cols="12">
            <div
              class="book-a-tour-form bg-light p-4 d-flex flex-column justify-content-between"
            >
              <h4>Interested in this building?</h4>
              <p>Book an in-person or virtual tour.</p>
              <b-button @click="onClickBook" variant="primary" class="w-100"
                >Book now!</b-button
              >
            </div>
          </b-col>
          <b-col cols="12" class="p-4" v-if="blogPagy">
            <h4 class="ml-4 mb-3">Top topics</h4>
            <router-link
              class="d-block mx-4 mb-3"
              :to="'/ideas/' + blogObj.id"
              v-for="(blogObj, index) in blogPagy.data"
              :key="blogObj.id"
            >
              {{ index + 1 }}. {{ blogObj.title }}
            </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal
      id="modal-1"
      title="Alert"
      hide-footer
      header-bg-variant="danger"
      header-text-variant="light"
    >
      <p class="my-4">Cannot perform this action as a Workspace Owner</p>
    </b-modal>

    <b-modal
      id="modal-2"
      title="Notice"
      hide-footer
      header-bg-variant="primary"
      header-text-variant="light"
    >
      <p class="my-4">
        Please
        <span class="font-weight-bold nagivate-login" @click="onNagivateToLogin"
          >login</span
        >
        to perform this action
      </p>
    </b-modal>

    <b-modal
      id="modal-3"
      title="Confirm booking"
      header-bg-variant="success"
      header-text-variant="light"
      ok-variant="success"
      cancel-variant="outline-secondary"
      ok-title="Yes, Book it!"
    >
      <p class="my-4">Are you sure want to book this workspace ?</p>
    </b-modal>
  </b-container>
</template>
<script>
import axios from "../utils/axiosHelper";
import { getUser } from "./../libs/token";
import Mapbox from "mapbox-gl-vue";

export default {
  name: "LocationDetail",
  components: {
    Mapbox,
  },
  data() {
    return {
      workspace: null,
      nearbyWorkspaces: [],
      blogPagy: null,
      currentUser: null,
    };
  },
  mounted() {
    if (getUser()) {
      this.currentUser = getUser();
    }

    axios
      .get(`/api/workspace/${this.$route.params.id}/show`)
      .then((res) => {
        const { success, workspace, nearbyWorkspaces } = res.data;
        if (success) {
          this.workspace = workspace;
          this.nearbyWorkspaces = nearbyWorkspaces;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/api/blog/hot_blogs?limit=3")
      .then((res) => {
        const { success, blogPagy } = res.data;
        if (success) {
          this.blogPagy = blogPagy;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    onNagivateToLogin() {
      localStorage.setItem("redirect_path", window.location.href);
      this.$router.push("/login");
    },
    onInitMap(map) {
      let popup = new mapboxgl.Popup().setText(this.workspace.name);

      new mapboxgl.Marker()
        .setLngLat([-80.9852, 46.49751])
        .setPopup(popup)
        .addTo(map);
    },
    onClickBook() {
      if (this.currentUser) {
        if (this.currentUser.role !== "member") {
          this.$bvModal.show("modal-1");
        } else if (this.currentUser.role === "member") {
          this.$bvModal.show("modal-3");
        }
      } else {
        this.$bvModal.show("modal-2");
      }
    },
  },
};
</script>

<style scoped>
.workspace-service-cell {
  background: #f7f7f7;
}

.light-bg {
  background: #e9e9e9;
}
.book-a-tour-form {
  /* min-height: 200px; */
}

#map {
  width: 100%;
  height: 500px;
}

.nagivate-login:hover {
  cursor: pointer;
}

.blog-image {
  object-fit: cover;
  max-height: 100px;
}

.active-blog {
  max-height: 100px;
}
</style>
