<template>
  <b-row class="mt-5">
    <b-col lg="8" md="12" sm="12" xs="12">
      <div class="section-info d-flex align-items-center h-100 p-3 pr-lg-5 mr-lg-5">
        <div>
          <h2 class="font-weight-bold">Helping you navigate your new normal</h2>
          <div class="d-flex justify-content-around mt-4">
            <a href="#" @click="e => onNagivateSection(e, 0)" class="text-decoration-none">Global portfolio</a>
            <a href="#" @click="e => onNagivateSection(e, 1)" class="text-decoration-none">Clean environments</a>
            <a href="#" @click="e => onNagivateSection(e, 2)" class="text-decoration-none">Flexible commitments</a>
          </div>
          <p class="mt-4">
            {{contentList[activeItem]}}
          </p>
        </div>
      </div>
    </b-col>

    <b-col lg="4" md="12" sm="12" xs="12">
      <img class="section-info-image rounded h-100 w-100" :src="imageList[activeItem]" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'NavigateSection',
  data() {
    return {
      activeItem: 0,
      imageList: [
        "image/workspaces/workspace2.jpg",
        "image/workspaces/workspace3.jpg",
        "image/workspaces/workspace4.jpg"
      ],
      contentList: [
        "Our 800+ locations offer you a workspace where and how you need it, whether your goal is to be closer to home, empower your distributed teams, or have a dedicated space to focus.",
        "We’ve partnered with industry experts to introduce frequent cleanings, sanitization equipment, and signage that help you go about your workday safely and confidently.",
        "Future-proof your business and navigate change with flexible options that are tailored to help you make moves on your terms."
      ]
    }
  },
  methods: {
    onNagivateSection(e, index) {
      e.preventDefault();
      this.activeItem = index;
    }
  }
}
</script>

<style scoped>
  .h-100 {
    height: 100%;
  }

  .section-info-image {
    max-height: 500px;
    object-fit: cover;
  }
</style>
