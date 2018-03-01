<template>
<div class="row">
    <div class="col-md-8">
        <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Content</th>
      <th scope="col">Category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-active" v-for="(blog,i) in blogs" :key="i">
      <th scope="row">{{blog.title}}</th>
      <td>{{blog.content.slice(0,50)}}</td>
      <td>{{blog.category}}</td>
      <td>
          <button type="button" class="btn btn-info" @click="updated(blog)">Edit</button>
          <button type="button" class="btn btn-danger" @click="destroy(blog._id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
<div class="col-md-3">
    <form @submit.native="add">
    <fieldset>
        <div class="form-group">
        <label for="exampleInputEmail1">title</label>
        <input type="text" class="form-control"  v-model="title">
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1" >Category</label>
        <input type="text" class="form-control" v-model="category">
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Content</label>
        <textarea class="form-control" v-model="content" rows="3"></textarea>
        </div>
        <div class="form-group" v-if="!editId">
            <label for="exampleInputFile">File input</label>
            <input type="file" class="form-control-file" id="imgUrl" aria-describedby="fileHelp">
        </div>
        <button type="submit" class="btn btn-primary">{{(!editId)?'Add':'Update'}}</button>
    </fieldset>
    </form>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      blogs: [],
      title: "",
      content: "",
      category: "",
      file: "",
      editId: null
    };
  },
  computed: {
    UserId() {
      return this.$store.state.UserId;
    },
    token() {
      return this.$store.state.token;
    }
  },
  created() {
    this.login();
    this.start();
  },
  methods: {
    login() {
      if (!this.token) {
        router.push({
          name: "blog"
        });
      }
    },
    start() {
      this.$axios
        .get(`/blog/user/${this.UserId}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.blogs = data;
          this.clear();
        })
        .catch(err => {
          this.$notify({
            type: "error",
            text: err.message
          });
        });
    },
    updated(data) {
      this.editId = data._id;
      this.title = data.title;
      this.category = data.category;
      this.content = data.content;
    },
    add() {
      if (this.editId) {
        this.$axios
          .put(
            `/blog/${this.editId}`,
            {
              title: this.title,
              content: this.content,
              category: this.category
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(() => {
            this.start();
            this.$notify({
              type: "success",
              text: "Data Berhasil diupdate"
            });
          })
          .catch(err => {
            this.$notify({
              type: "error",
              text: err.message
            });
          });
      } else {
        let formdata = new FormData();
        formdata.append("title", this.title);
        formdata.append("content", this.content);
        formdata.append("category", this.category);
        formdata.append("imgUrl", document.getElementById("imgUrl").files[0]);
        this.$axios
          .post("/blog", formdata, {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then(() => {
            this.start();
            this.$notify({
              type: "success",
              text: "Data Berhasil ditambah"
            });
          })
          .catch(err => {
            this.$notify({
              type: "error",
              text: err.message
            });
          });
      }
    },
    clear() {
      this.editId = null;
      this.title = "";
      this.category = "";
      this.content = "";
    },
    destroy(id) {
      this.$axios
        .delete(`/blog/${id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(() => {
          this.start();
          this.$notify({
            type: "success",
            text: "Data Berhasil dihapus"
          });
        })
        .catch(err => {
          this.$notify({
            type: "error",
            text: err.message
          });
        });
    }
  }
};
</script>

<style>

</style>
