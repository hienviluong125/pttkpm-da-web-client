<template>
  <b-container>
    <b-form @submit="onSubmit" v-if="workspaceTypeList.length > 0" class="my-5">
      <h3>Create a workspace</h3>
      <b-form-group label="Name" label-for="name">
        <b-form-input
          id="name"
          v-model="workspace.name"
          type="text"
          placeholder="Workspace name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Address" label-for="address">
        <b-form-input
          id="address"
          v-model="workspace.address"
          type="text"
          placeholder="Workspace address"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Price ($)" label-for="price">
        <b-form-input
          id="price"
          v-model="workspace.price"
          type="number"
          min="10"
          max="1000"
          placeholder="Workspace price"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Workspace type" label-for="workspace_type">
        <b-form-select
          id="workspace_type"
          v-model="workspace.workspace_type_id"
          :options="workspaceTypeList"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Description" label-for="description">
        <b-form-input
          id="description"
          v-model="workspace.description"
          type="text"
          placeholder="Workspace description"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Max capacity" label-for="max_capacity">
        <b-form-input
          id="max_capacity"
          v-model="workspace.max_capacity"
          type="number"
          min="5"
          max="1000"
          placeholder="Workspace max capacity"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Min capacity" label-for="min_capacity">
        <b-form-input
          id="min_capacity"
          v-model="workspace.min_capacity"
          type="number"
          min="1"
          max="100"
          placeholder="Workspace min capacity"
          required
        ></b-form-input>
      </b-form-group>
      <br />
      <h5>Additional Location Information</h5>
      <b-form-group label="Location latitude" label-for="lat">
        <b-form-input
          id="lat"
          v-model="workspace.lat"
          type="text"
          placeholder="Workspace latitude"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Location longitude" label-for="lng">
        <b-form-input
          id="lng"
          v-model="workspace.lng"
          type="text"
          placeholder="Workspace longitude"
        ></b-form-input>
      </b-form-group>
      <br />
      <div class="">
        <h5>Workspace services</h5>
        <div
          class="d-flex align-items-start"
          v-for="(service, idx) in workspace.workspace_services"
          :key="idx"
        >
          <b-form-input
            type="text"
            class="mb-2 mr-1"
            v-model="service.name"
            placeholder="Workspace service"
          />
          <b-button
            @click="onRemovesService(idx)"
            variant="danger"
            class="mt-1"
            size="sm"
            >Delete</b-button
          >
        </div>
        <b-button variant="outline-primary" @click="onAddWorkspaceService"
          >Add new item</b-button
        >
      </div>
      <br />
      <div class="">
        <h5>Workspace attachments</h5>
        <div
          class="d-flex align-items-start"
          v-for="(attachment, idx) in workspace.attachments"
          :key="idx"
        >
          <b-form-input
            type="text"
            class="mb-2 mr-1"
            v-model="attachment.url"
            placeholder="Attachment url"
          />
          <b-button
            @click="onRemoveAttachment(idx)"
            variant="danger"
            class="mt-1"
            size="sm"
            >Delete</b-button
          >
        </div>
        <b-button variant="outline-primary" @click="onAddWorkspaceAttachment"
          >Add new item</b-button
        >
      </div>
      <br />
      <b-button type="submit" variant="primary" class="w-100">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "../../../utils/axiosHelper";
import { getUser } from "../../../libs/token";

export default {
  name: "WorkspaceIndex",
  data() {
    return {
      currentUser: null,
      workspaceTypeList: [],
      workspace: {
        name: null,
        address: null,
        country: "Vietnam",
        lat: null,
        lng: null,
        price: 10,
        description: "",
        max_capacity: 5,
        min_capacity: 1,
        workspace_type_id: null,
        workspace_services: [],
        attachments: [],
        user_id: null,
      },
    };
  },
  mounted() {
    if (getUser()) {
      this.currentUser = getUser();
      this.workspace.user_id = this.currentUser.id;
    }

    this.fetchWorkspaceList();
  },
  methods: {
    onAddWorkspaceAttachment() {
      this.workspace.attachments.push({ url: "" });
    },
    onRemoveAttachment(idx) {
      this.workspace.attachments = this.workspace.attachments.filter(
        (_, _idx) => _idx !== idx
      );
    },
    onAddWorkspaceService() {
      this.workspace.workspace_services.push({ name: "" });
    },
    onRemovesService(idx) {
      this.workspace.workspace_services = this.workspace.workspace_services.filter(
        (_, _idx) => _idx !== idx
      );
    },
    fetchWorkspaceList() {
      axios.get("/api/workspace/type").then((res) => {
        if (res.data.success) {
          this.workspaceTypeList = res.data.workspaceType.map((wto) => ({
            value: wto.id,
            text: wto.name,
          }));
          this.workspace.workspace_type_id = this.workspaceTypeList[0].value;
        }
      });
    },
    onSubmit(e) {
      e.preventDefault();
      axios
        .post("/api/workspace/create", {
          ...this.workspace,
        })
        .then((res) => {
          this.$router.push({
            path: "/partner/workspace",
            query: { success: true },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>