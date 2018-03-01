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
    <form @submit="add">
    <fieldset>
        <div class="form-group">
        <label for="exampleInputEmail1">title</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
        <label for="exampleInputPassword1">Category</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>

        <div class="form-group">
        <label for="exampleInputPassword1">Content</label>
        <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div class="form-group" v-if="!editId">
            <label for="exampleInputFile">File input</label>
            <input type="file" class="form-control-file" id="imgUrl" aria-describedby="fileHelp">
        </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </fieldset>
    </form>
</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            blogs:[],
            title:'',
            content:'',
            category:'',
            file:'',
            editId:null
        }
    },
    computed:{
        UserId(){
            return this.$store.state.UserId
        },
        token(){
            return this.$store.state.token
        }
    },
    created (){
        this.login()
        this.start()
    },
    methods: {
        login(){
            if(!this.token){
                router.push({
                    name: 'blog'
                })
            }
        },
        start(){
            this.$axios.get(`/blog/user/${this.UserId}`,{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(({data})=>{
                this.blogs = data
                this.editId=null
            })
            .catch(err=>{
                console.error(err);
            })
        },
        updated(data){
            this.editId=data._id
            this.title=data.title
            this.category=data.category
            this.content=data.content
        },
        add(){
            if(this.editId){

            }else{
                let formdata = new FormData()
        formdata.append('title', this.form.title)
        formdata.append('content', this.form.content)
        formdata.append('CategoryId', this.form.category)
        formdata.append('imgUrl', document.getElementById('imgUrl').files[0])
        this.$axios
                this.axios.post('/blog',{

                })
            }
        }
    }
}
</script>

<style>

</style>
