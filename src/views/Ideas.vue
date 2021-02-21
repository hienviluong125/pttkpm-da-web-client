<template>
  <b-container class="mb-5">
    <b-row class="p-0" v-if="blogPagy">
      <h3 class="mt-5 mb-4 pl-3">Ideas by ZeroBugs</h3>
      <b-col
        :lg="index == 0 ? '12' : '4'"
        md="12"
        sm="12"
        xs="12"
        v-for="(blog, index) in blogPagy.data"
        :key="index"
      >
        <div v-if="index == 0">
          <div class="mt-4 active-blog d-lg-flex d-none">
            <img
              class="w-50 rounded-left blog-image"
              :src="'https://picsum.photos/500/500' + '?random=' + index"
            />
            <div
              class="info w-50 rounded-right border border-left-0 p-5 d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="blog.title">
                  <h3 class="truncate-text" v-b-tooltip.hover.topright :title="blog.title">{{ blog.title }}</h3>
                </router-link>
                <p class="mt-3 truncate-text" v-b-tooltip.hover.topright :title="blog.short_description">
                  {{ blog.short_description }}
                </p>
              </div>
            </div>
          </div>

          <div class="d-lg-none d-md-block d-sm-block d-xs-block">
            <img
              class="w-100 rounded-top blog-image"
              :src="'https://picsum.photos/500/500' + '?random=' + index"
            />
            <div
              class="info px-3 py-4 border-left border-right border-bottom rounded-bottom d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="blog.title">
                  <h3 class="truncate-text" v-b-tooltip.hover.topright :title="blog.title">{{ blog.title }}</h3>
                </router-link>
                <p class="mt-3 cut-text truncate-text">
                  {{ blog.short_description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="mt-4">
          <div>
            <img
              class="w-100 rounded-top blog-image"
              :src="'https://picsum.photos/500/500' + '?random=' + index"
            />
            <div
              class="info px-3 py-4 border-left border-right border-bottom rounded-bottom d-flex flex-column justify-content-between"
            >
              <div class="top-info">
                <router-link :to="blog.title">
                  <h3 class="truncate-text" v-b-tooltip.hover.topright :title="blog.title">{{ blog.title }}</h3>
                </router-link>
                <p class="mt-3 truncate-text" v-b-tooltip.hover.topright :title="blog.short_description">
                  {{ blog.short_description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="12" class="text-center mt-4">
        <b-button :variant="blogPagy.nextPage == -1 ? 'light' : 'primary'" class="w-100" :disabled="blogPagy.nextPage == -1" @click="loadMore()">{{blogPagy.nextPage == -1 ? 'No more blogs' : 'Load more'}}</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "../utils/axiosHelper";
export default {
  name: "Ideas",
  data() {
    return {
      blogPagy: null,
    };
  },
  mounted() {
    axios.get("/api/blog/hot_blogs").then((res) => {
      if (res.data.success) {
        this.blogPagy = res.data.blogPagy;
        console.log(this.blogPagy)
      }
    });
  },
  methods: {
    loadMore() {
      axios.get(`/api/blog/hot_blogs?page=${this.blogPagy.nextPage}`).then((res) => {
        if (res.data.success) {
          const previousblog = this.blogPagy.data;
          const newblogPagy = {
            ...res.data.blogPagy,
            data: [...previousblog, ...res.data.blogPagy.data]
          }
          this.blogPagy = newblogPagy
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

.blog-image {
  height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>