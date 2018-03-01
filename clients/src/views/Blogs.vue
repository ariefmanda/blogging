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
            <h5 class="card-header">Search By Category</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" v-model="search" class="form-control" placeholder="Search for category">
                <span class="input-group-btn">
                  <button @click="searching" class="btn btn-secondary" type="button">Go!</button>
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
import Blog from "@/components/Blog.vue"

export default {
  name: "home",
  data () {
      return {
          blogs:[],
          blogsAboslute:[],
          search:'',
      }
  },
  components: {
    Blog
  },
  computed: {
    token() {
      return this.$store.state.token
    },
    UserId() {
      return this.$store.state.UserId
    },
  },
  created() {
    this.start()
  },
  methods: {
      start(){
          this.$axios.get('/blog')
            .then(({data})=>{
                this.blogs = data
                this.blogsAboslute = data
            })
      },
      searching(){
          if(this.search){
        this.blogs = this.blogsAboslute.filter(e=>{
          let s=false
          if(e.category.toLowerCase().split(' ').join('').split(this.search.toLowerCase().split(' ').join('')).length>1){
            s=true
          }
          return s
        })
        this.search=""
      }else{
        this.blogs = this.blogsAboslute
      }
      }

  }
};
</script>
