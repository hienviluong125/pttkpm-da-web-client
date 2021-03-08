<template>
  <b-container class="pt-4">
    <h3 class="mb-4">Your workspaces</h3>
    <b-table
      v-if="workspacePagy"
      responsive
      striped
      hover
      :items="dataMapper(workspacePagy.data)"
      :fields="fields"
    >
      <template #cell(services)="data">
        <b-badge
          v-for="service in data.item.WorkspaceServices"
          :key="service.id"
          variant="success"
        >
          {{ service.name }}
        </b-badge>
      </template>

      <template #cell(attachments)="data">
        <b-button
          variant="info"
          size="sm"
          @click="onClickAttachments(data.item.Attachments)"
          >See more</b-button
        >
      </template>

      <template #cell(action)="data">
        <router-link :to="`/locations/${data.item.id}`">
          <b-button size="sm" variant="primary">Detail</b-button>
        </router-link>
        <router-link :to="`/partner/workspace/${data.item.id}/edit`">
          <b-button size="sm" class="text-white mt-1" variant="warning"
            >Edit</b-button
          >
        </router-link>
        <b-button
          @click="onClickDeleteWorkspace(data.item.id)"
          size="sm"
          variant="danger"
          class="mt-1"
          >Delete</b-button
        >
      </template>
    </b-table>
    <b-pagination
      v-model="workspacePagy.currentPage"
      align="center"
      v-if="workspacePagy"
      :total-rows="workspacePagy.count"
      :per-page="10"
      @page-click="onClickPagination"
    ></b-pagination>
    <b-modal id="attachment-modal" hide-footer title="Attachments" size="xl">
      <b-carousel
        v-if="activeAttachments"
        img-width="1024"
        img-height="480"
        controls
        indicators
      >
        <b-carousel-slide
          v-for="(attachment, index) in activeAttachments"
          :key="attachment.id"
          :img-src="attachment.url + '?random=' + index"
        ></b-carousel-slide>
      </b-carousel>
    </b-modal>

    <b-modal
      id="confirm-modal"
      title="Confirmation"
      @ok="confirmDelete"
      ok-variant="success"
      cancel-variant="danger"
      ok-title="Confirm"
    >
      <p>Are you sure you want to delete this workspace ?</p>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "../../../utils/axiosHelper";
import { getUser } from "../../../libs/token";

export default {
  name: "WorkspaceIndex",
  data() {
    return {
      activeDeleteId: null,
      activeAttachments: null,
      workspacePagy: null,
      fields: [
        "id",
        "name",
        "type",
        "price",
        "min_capacity",
        "max_capacity",
        "country",
        "lat",
        "lng",
        "services",
        "attachments",
        "action",
      ],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    confirmDelete() {
      axios
        .post(`/api/workspace/${this.activeDeleteId}/delete`)
        .then((res) => {
          if (res.data.success) {
            this.$bvToast.toast("Workspace deleted succesfully", {
              title: `Notify`,
              variant: "success",
              solid: true,
            });
            this.fetchData(this.workspacePagy.currentPage)
          }

          if (!res.data.success) {
            this.$bvToast.toast("Failure to delete workspace", {
              title: `Notify`,
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch((err) => {
          this.$bvToast.toast("Something went wrong", {
            title: `Notify`,
            variant: "danger",
            solid: true,
          });
        });
    },
    onClickDeleteWorkspace(id) {
      this.$bvModal.show("confirm-modal");
      this.activeDeleteId = id;
    },
    dataMapper(data) {
      return data.map((workspaceObj) => ({
        ...workspaceObj,
        type: workspaceObj.WorkspaceType.name,
      }));
    },
    onClickPagination(e, page) {
      this.fetchData(page);
    },
    fetchData(page = 1) {
      axios
        .get(`/api/workspace?page=${page}`)
        .then((res) => {
          const { success, workspacePagy } = res.data;
          if (success) {
            this.workspacePagy = workspacePagy;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickAttachments(attachments) {
      this.$bvModal.show("attachment-modal");
      this.activeAttachments = attachments;
    },
  },
  beforeRouteEnter(to, from, next) {
    return next((self) => {
      if (to.query.success === "true") {
        let message =
          from.path === "/partner/workspace/new"
            ? "Workspace created succesfully"
            : "Workspace updated succesfully";
        self.$bvToast.toast(message, {
          title: `Notify`,
          variant: "success",
          solid: true,
        });
      }
    });
  },
};
</script>