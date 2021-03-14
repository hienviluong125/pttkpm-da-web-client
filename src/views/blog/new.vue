<template>
  <b-container>
    <b-form @submit="onSubmit" class="my-5">
      <h3>Create a new post</h3>
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
      <b-button type="submit" variant="primary" class="w-100 mt-3">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import axios from './../../utils/axiosHelper';

export default {
  name: "BlogNew",
  components: { VueEditor },
  data() {
    return {
      blog: {
        title: '',
        content: '',
        short_description: '',
        image: ''
      }
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      axios.post('/api/blog/create', {
        ...this.blog
      }).then(res => {
        if(res.data.success) {
          this.$router.push({ path: '/blog/index', query: { success: true } })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
};
</script>