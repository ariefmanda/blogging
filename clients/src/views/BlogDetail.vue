<template>
  <div>
      <h1 class="mt-4">{{blog.title}}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a :href="'mailto:'+blog.UserId.email">{{blog.UserId.name}}</a>
          </p>

          <hr>

          <!-- Date/Time -->
          <p>Created At: {{blog.createdAt}}

          <hr>

          <!-- Preview Image -->
          <img class="img-fluid rounded" :src="blog.imgUrl" alt="">

          <hr>

          <blockquote class="blockquote">
            <p class="mb-0">{{blog.content}}</p>
            <footer class="blockquote-footer">Category
              <cite title="Source Title">{{blog.category}}</cite>
            </footer>
          </blockquote>
  </div>
</template>

<script>
export default {
  data(){
    return {
      blog:{}
    }
  },
  props:['id'],
  created(){  
    this.start()
  },
  methods: {
    start(){
      this.$axios.get(`/blog/${this.id}`)
        .then(({data})=>{
          this.blog=data
        })
        .catch(err => {
          this.$notify({
              type: "error",
              text: err.message
            });
        });
    }
  }
}
</script>

<style>

</style>
