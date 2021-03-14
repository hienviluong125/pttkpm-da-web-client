<template>
  <b-container>
    <b-form @submit="onSubmit" class="my-5">
      <h3>Edit your post</h3>
      <b-form-group label="Title" label-for="title">
        <b-form-input
          id="title"
          type="text"
          v-model="blog.title"
          placeholder="title..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Short description" label-for="short_description">
        <b-form-input
          id="short_description"
          type="text"
          v-model="blog.short_description"
          placeholder="short description..."
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="image's url" label-for="image">
        <b-form-input
          id="image"
          type="text"
          v-model="blog.image"
          placeholder="image's url ..."
          required
        ></b-form-input>
      </b-form-group>
      <VueEditor v-model="blog.content"></VueEditor>
      <b-button type="submit" variant="primary" class="w-100 mt-3"
        >Submit</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import axios from "./../../utils/axiosHelper";
import { getUser } from '../../libs/token'

export default {
  name: "BlogEdit",
  components: { VueEditor },
  data() {
    return {
      currentUser: null,
      blog: {
        title: "",
        content: "",
        short_description: "",
        image: "",
      },
    };
  },
  mounted() {
    if (getUser()) {
      this.currentUser = getUser();
    }

    axios
      .get(`/api/blog/${this.$route.params.id}/show`)
      .then((res) => {
        const { success, blog } = res.data;
        if (success) {
          if (!blog) {
            this.$router.push({
              path: "/blog/index",
              query: { success: false },
            });
          }
          this.blog.title = blog.title;
          this.blog.short_description = blog.short_description;
          this.blog.content = blog.content;
          this.blog.image= blog.image;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      axios
        .post(`/api/blog/${this.$route.params.id}/update`, {
          ...this.blog,
        })
        .then((res) => {
          if (res.data.success) {
            this.$router.push({
              path: "/blog/index",
              query: { success: true },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>