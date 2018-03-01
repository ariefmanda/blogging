<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to="/" class="navbar-brand" style="cursor:pointer;color:white">Bloging Simple</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/category" style="cursor:pointer;color:white">Blog
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
      </ul>
      <div v-if="!token">
        <button class="btn btn-primary my-2 my-sm-0" @click="login()">Login Facebook</button>
      </div>
      <div v-else>
        <button class="btn btn-primary my-2 my-sm-0" @click="dashboard">
        Dasboard
        </button>
        <button class="btn btn-primary my-2 my-sm-0" @click="logout">Logout</button>
      </div>
    </div>
  </nav>
  <notifications/>
</div>
</template>

<script>
window.fbAsyncInit = function() {
  FB.init({
    appId: '1239370809540745',// 1007524822728521 localhost: 1239370809540745 amazon: 1718336034878910
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.8', // use graph api version 2.8
  });
  FB.getLoginStatus((response) => {
    console.log(response);
  });
};
// Load the SDK asynchronously
(function(d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
export default {
  data() {
    return {
      create: {},
      categories: [],
    };
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  created() {
    this.start();
  },
  methods: {
    setLogin(cb) {
      console.log('login fb');
      FB.login(
        (response) => {
          if (response.authResponse) {
            localStorage.setItem('fbtoken', response.authResponse.accessToken);
            cb(response.authResponse.accessToken);
          } else {
            console.log(response, 'belum connect');
          }
        }, {
          scope: 'public_profile,email'
        },
      );
    },
    login() {
      this.setLogin((e) => {
        this.$axios.get('/auth', {
            headers: {
              fbtoken: e,
            },
          })
          .then(({
            data
          }) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('UserId', data.UserId);
            this.$store.dispatch('setToken', data.token);
            this.$store.dispatch('setUserId', data.UserId);
            this.$notify({
              type: 'success',
              text: 'Selamat datang di blog  Simple',
            });
          }).catch((err) => {
            console.error(err);
          });
      });
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUserId', null);
    },
    dashboard(){
      this.$router.push({
        name:'dashboard'
      })
    }
  },
};
</script>

<style>

</style>
