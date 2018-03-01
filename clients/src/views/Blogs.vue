<template>
  <div class="container">
   <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">LIST BLOG
          </h1>
          <Blog v-for="(blog,i) in blogs" :key="i" :blog="blog"></Blog>
        </div>
     <div class="col-md-4">

          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for category">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>
     </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Blog from '@/components/Blog.vue'

export default {
  name: 'home',
  components: {
    Blog
  },
  created () {
      this.start()
  },
  methods: {
      start(){
      }
  }
}
</script>
