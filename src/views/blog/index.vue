<template>
  <b-container class="pt-4">
    <h3 class="mb-4">Your posts</h3>
    <router-link to="/blog/new">
      <b-button size="sm" variant="primary" class="mb-3">Add new</b-button>
    </router-link>

    <b-table
      v-if="blogPagy"
      responsive
      striped
      hover
      :items="dataMapper(blogPagy.data)"
      :fields="fields"
    >
      <template #cell(action)="data">
        <router-link :to="`/blog/${data.item.id}`">
          <b-button class="mt-1 mr-1" size="sm" variant="primary"
            >Detail</b-button
          >
        </router-link>
        <router-link :to="`/blog/${data.item.id}/edit`">
          <b-button size="sm" class="text-white mt-1 mr-1" variant="warning"
            >Edit</b-button
          >
        </router-link>
        <b-button
          @click="onClickDeleteWorkspace(data.item.id)"
          size="sm"
          variant="danger"
          class="mt-1 mr-1"
          >Delete</b-button
        >
      </template>
    </b-table>
    <b-pagination
      v-model="blogPagy.currentPage"
      align="center"
      v-if="blogPagy"
      :total-rows="blogPagy.count"
      :per-page="10"
      @page-click="onClickPagination"
    ></b-pagination>

    <b-modal
      id="confirm-modal"
      title="Confirmation"
      @ok="confirmDelete"
      ok-variant="success"
      cancel-variant="danger"
      ok-title="Confirm"
    >
      <p>Are you sure you want to delete this post?</p>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "./../../utils/axiosHelper";
import { getUser } from "../../libs/token";

export default {
  name: "BlogIndex",
  data() {
    return {
      activeItemId: null,
      fields: ["id", "title", "short_description", "image", "action"],
      blogPagy: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onClickDeleteWorkspace(activeItemId) {
      this.activeItemId = activeItemId;
      this.$bvModal.show("confirm-modal");
    },

    confirmDelete() {
      axios
        .post(`/api/blog/${this.activeItemId}/delete`)
        .then((res) => {
          if (res.data.success) {
            this.$bvToast.toast("Post deleted succesfully", {
              title: `Notify`,
              variant: "success",
              solid: true,
            });
            this.activeItemId = null;
            this.fetchData(this.blogPagy.currentPage);
            this.$bvModal.hide("confirm-modal");
          } else {
            this.$bvToast.toast("Failure to delete post", {
              title: `Notify`,
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch((err) => {
          console.log(err)
          this.$bvToast.toast("Something went wrong", {
              title: `Notify`,
              variant: "danger",
              solid: true,
            });
        });
    },
    dataMapper(data) {
      return data.map((_dt) => ({
        ..._dt,
        action: "",
      }));
    },
    fetchData(page = 1) {
      axios
        .get(`/api/blog?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.blogPagy = res.data.blogPagy;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickPagination(e, page) {
      this.fetchData(page);
    },
  },
  beforeRouteEnter(to, from, next) {
    return next((self) => {
      if (to.query.success === "true") {
        let message =
          from.path === "/blog/new"
            ? "Post created succesfully"
            : "Post updated succesfully";
        self.$bvToast.toast(message, {
          title: `Notify`,
          variant: "success",
          solid: true,
        });
      } else if (to.query.success === "false") {
        self.$bvToast.toast("Cannot perform this action", {
          title: `Notify`,
          variant: "danger",
          solid: true,
        });
      }
    });
  },
};
</script>