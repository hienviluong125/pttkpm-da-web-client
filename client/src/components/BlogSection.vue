<template>
  <b-row class="p-0">
    <h3 class="mt-5 mb-4">Workplace trends and insights</h3>
    <b-col
      :lg="index==0 ? '12' : '4'"
      md="12"
      sm="12"
      xs="12"
      v-for="(blog, index) in blogList"
      :key="index"
    >
      <div v-if="index == 0">
        <div class="mt-4 active-blog d-lg-flex d-none">
          <img class="w-50 rounded-left blog-image" :src="blog.image" />
          <div class="info w-50 rounded-right border border-left-0 p-5">
            <router-link :to="blog.link">
              <h3>{{blog.title}}</h3>
            </router-link>
            <p class="mt-3">{{blog.content}}</p>
          </div>
        </div>

        <div class="d-lg-none d-md-block d-sm-block d-xs-block">
          <img class="w-100 rounded-top blog-image" :src="blog.image"/>
          <div class="info px-3 py-4 border-left border-right border-bottom rounded-bottom">
            <router-link :to="blog.link">
              {{blog.title}}
            </router-link>
            <p class="mt-3">{{blog.content}}</p>
          </div>
        </div>
      </div>
      <div v-else class="mt-4">
        <div>
          <img class="w-100 rounded-top blog-image" :src="blog.image"/>
          <div class="info px-3 py-4 border-left border-right border-bottom rounded-bottom">
            <router-link :to="blog.link">
              {{blog.title}}
            </router-link>
            <p class="mt-3">{{blog.content}}</p>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "BlogSection",
  data() {
    return {
      blogList: [
        {
          title: "The conditions necessary for a successful return to work",
          content:
            "A new study shows what policies make employees more satisfied and productive when they return to the office",
          link: "/about",
          image: 'image/blogs/blog0.jpg',
        },
        {
          title: "How to build a flexible real estate portfolio of the future",
          content:
            "More companies are turning to flexible real estate to solve long-held challenges exacerbated by the pandemic",
          link: "/about",
          image: 'image/blogs/blog1.jpg',
        },
        {
          title: "Spaces to study and extend the university experience",
          content:
            "For those who can’t get to campus this semester, being in a WeWork space sustains the educational momentum",
          link: "/about",
          image: 'image/blogs/blog2.jpg',
        },
        {
          title: "The role of new sensors in managing indoor air quality",
          content:
            "With miniaturized, low-cost sensors, it is possible to visualize indoor air quality at unprecedented scale",
          link: "/about",
          image: 'image/blogs/blog3.jpg',
        },
      ],
    };
  },
};
</script>

<style scoped>
  .active-blog {
    height: 375px;
  }

  .blog-image {
    object-fit: cover;
  }
</style>
