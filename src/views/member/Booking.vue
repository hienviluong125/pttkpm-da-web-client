<template>
  <b-container class="pt-4">
    <h3 class="mb-4">Booking history</h3>
    <b-table
      v-if="orderPagy"
      responsive
      striped
      hover
      :items="dataMapper(orderPagy.data)"
      :fields="fields"
    >
      <template #cell(action)="data">
        <b-button
          @click="onClickCancel(data.item)"
          v-if="data.item.status == 'pending'"
          variant="danger"
          size="sm"
          >Cancel</b-button
        >
      </template>

      <template #cell(status)="data">
        <b-badge :variant="statusEnum[data.item.status][1]">{{
          statusEnum[data.item.status][0]
        }}</b-badge>
      </template>

      <template #cell(workspace)="data">
        <router-link
          target="_blank"
          :to="'/locations/' + data.item.Workspace.id"
        >
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
      id="confirm-modal"
      title="Confirm"
      ok-title="Yes, just cancel it"
      cancel-title="No, i don't"
      ok-variant="outline-danger"
      cancel-variant="danger"
      @ok="onConfirmCancel(activeOrder)"
    >
      <p>Are you sure you want to cancel this booking ?</p>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "../../utils/axiosHelper";
import { getUser } from "../../libs/token";

export default {
  name: "MyBooking",
  data() {
    return {
      activeOrder: null,
      currentUser: getUser() || null,
      statusEnum: {
        pending: ["Pending", "primary", "pending"],
        paid: ["Paid", "success", "paid"],
        unpaid: ["Unpaid", "warning", "unpaid"],
        rejected: ["Rejected", "danger", "rejected"],
      },
      fields: [
        "date",
        "workspace",
        "capacity",
        "note",
        "amount",
        "status",
        "action",
      ],
      orderPagy: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    onConfirmCancel(activeOrder) {
      axios
        .post(`/api/order/${activeOrder.id}/delete`)
        .then((res) => {
          if (res.data.success) {
            this.$bvToast.toast("Order cancelled succesfully", {
              title: `Notify`,
              variant: "success",
              solid: true,
            });
            this.fetchData()
            this.activeOrder = null
          } else {
            this.$bvToast.toast("Failure to cancel your order", {
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
    onClickCancel(order) {
      this.$bvModal.show("confirm-modal");
      this.activeOrder = order;
    },
    onClickPagination(e, page) {
      this.fetchData(page);
    },
    fetchData(page = 1) {
      axios
        .get(`/api/order/member/${this.currentUser.id}/index?page=${page}`)
        .then((res) => {
          const { success, orderPagy } = res.data;

          if (success) {
            this.orderPagy = orderPagy;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dataMapper(data) {
      return data.map((order, idx) => {
        return {
          ...order,
          "#": idx + 1,
          order_id: order.id,
          note: order.note || "Empty",
          amount: order.amount || "Unpaid",
        };
      });
    },
  },
};
</script>