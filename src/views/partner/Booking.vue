<template>
  <b-container class="pt-4">
    <h3 class="mb-4">Who books your workspace ? Check it now!</h3>
    <b-table
      v-if="orderPagy"
      responsive
      striped
      hover
      :items="dataMapper(orderPagy.data)"
      :fields="fields"
    >
      <template #cell(status)="data">
        <b-badge
          class="hover-badge"
          @click="onToggleUpdateModal(data.item)"
          :variant="statusEnum[data.item.status][1]"
        >
          {{ statusEnum[data.item.status][0] }}
        </b-badge>
      </template>

      <template #cell(workspace)="data">
        <router-link target="_blank" :to="'/locations/' + data.item.Workspace.id">
          {{ data.item.Workspace.name }}
        </router-link>
      </template>
    </b-table>
    <b-pagination
      v-model="orderPagy.currentPage"
      align="center"
      v-if="orderPagy"
      :total-rows="orderPagy.count"
      :per-page="10"
      @page-click="onClickPagination"
    ></b-pagination>

    <b-modal
      id="confirmUpdateOrder"
      title="Confirm"
      ok-title="Confirm"
      cancel-title="Cancel"
      ok-variant="success"
      cancel-variant="danger"
      @ok="onConfirmUpdate"
    >
      <p>Are you sure you want to perform this action ?</p>
    </b-modal>

    <b-modal id="updateOrder" title="Update order" hide-footer>
      <div class="" v-if="activeOrder">
        <p>You can make this booking to have one of following statuses:</p>
        <b-button
          v-for="(status, index) in getObjectWithoutProperties(statusEnum, [
            activeOrder.status,
          ])"
          :key="index"
          :variant="status[1]"
          class="w-100 mb-1"
          @click="toggleConfirmUpdateOrder(status)"
        >
          {{ status[0] }}
        </b-button>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "../../utils/axiosHelper";
import { getUser } from "../../libs/token";

export default {
  name: "Booking",
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(page = 1) {
      axios
        .get(`/api/order/partner/${this.currentUser.id}/index?page=${page}`)
        .then((res) => {
          const { success, orderPagy } = res.data;
          if (success) {
            this.orderPagy = orderPagy;
            console.log(orderPagy)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClickPagination(e, page) {
      this.fetchData(page);
    },
    dataMapper(data) {
      return data.map((order) => {
        return {
          ...order,
          order_id: order.id,
          note: order.note || "Empty",
          amount: order.amount || "Unpaid",
          user: `${order.User.first_name} ${order.User.last_name}`,
        };
      });
    },
    onToggleUpdateModal(order) {
      this.activeOrder = order;
      this.$bvModal.show("updateOrder");
    },
    getObjectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    },
    toggleConfirmUpdateOrder(status) {
      this.updateStatus = status;
      this.$bvModal.hide("updateOrder");
      this.$bvModal.show("confirmUpdateOrder");
    },
    onConfirmUpdate() {
      axios
        .post(`/api/order/${this.activeOrder.id}/update`, {
          order: {
            status: this.updateStatus[2],
          },
        })
        .then((res) => {
          const { success } = res.data;
          if (success) {
            this.updateStatus = null;
            this.activeOrder = null;
            this.fetchData(this.orderPagy.currentPage)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      activeOrder: null,
      updateStatus: null,
      statusEnum: {
        pending: ["Pending", "primary", "pending"],
        paid: ["Paid", "success", "paid"],
        unpaid: ["Unpaid", "warning", "unpaid"],
        rejected: ["Rejected", "danger", "rejected"],
      },
      currentUser: getUser() || null,
      fields: [
        "order_id",
        "note",
        "capacity",
        "date",
        "workspace",
        "amount",
        "status",
        "user",
      ],
      orderPagy: null,
    };
  },
};
</script>

<style scoped>
.hover-badge:hover {
  cursor: pointer;
}
</style>