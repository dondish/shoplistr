<template>
  <v-app dark>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>

export default {
  fetch() {

  },
  data()  {
    return {
      drawer: false,
      isMobile: false,
      
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    console: () => console,
    user() {
      return this.$store.state.auth.user;
    },
    loggedIn() {
      return this.$store.getters['auth/isLoggedIn'];
    },
    items() {
      return [
        { icon: 'mdi-home', name: 'Home', link: '/'},
        { icon: 'mdi-format-list-bulleted-square', name: 'Lists', link: '/lists'},
        { icon: 'mdi-arrow-right-circle', name: 'Log In', link: '/login', condition: !this.$store.getters['auth/isLoggedIn']},
        { icon: 'mdi-arrow-left-circle', name: 'Log Out', link: '/logout', condition: this.$store.getters['auth/isLoggedIn']}
      ]
    } 
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    }
  }
}
</script>

<style>
</style>
