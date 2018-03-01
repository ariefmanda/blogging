<template>
  <div class="card mb-4">
    <img class="card-img-top" :src="blog.imgUrl" alt="Card image cap">
    <div class="card-body">
        <h2 class="card-title">{{blog.title}}</h2>
        <h6 class="card-title"> Category: {{blog.category}}</h6>
        <p class="card-text">{{blog.content}}</p>
        <router-link :to="'/blog/'+blog._id">
            <button class="btn btn-primary">
                Read More &rarr;
            </button>
        </router-link>
    </div>
    <div class="card-footer text-muted">
        {{blog.createdAt}}
    </div>
  </div>
</template>

<script>
export default {
    props:['blog']
};
</script>

<style>

</style>
