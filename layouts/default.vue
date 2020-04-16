<template>
  <v-app>
    <v-navigation-drawer 
      app 
      v-model="drawer"
      fixed
      nav
      temporary
      right
      v-if="isMobile"
    >
    
    
    <v-list-item v-if="loggedIn">
      <v-list-item-avatar>
        <v-img v-if="user.img" :src="user.img"></v-img>
        <v-icon v-else >mdi-account-circle</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider v-if="loggedIn"></v-divider>
    <v-list dense nav>
      <v-list-item v-for="(item, index) in items.filter(i => i.condition === undefined || i.condition )" router :to="item.link" :key="index" >
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </v-list>
    </v-navigation-drawer>
  

    <v-app-bar 
      app
      v-if="isMobile"
      dark
      color="primary"
    >
      <v-toolbar-title>Shoplistr</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-app-bar 
      app
      v-else
    >
      <v-toolbar-title>Shoplistr</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon v-if="!loggedIn">mdi-arrow-right-circle</v-icon>
      <v-avatar v-else color="blue"><v-icon>mdi-account-circle</v-icon></v-avatar>
    </v-app-bar>

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
        { icon: 'mdi-format-list-bulleted-square', name: 'Lists', link: '/lists', condition: this.$store.getters['auth/isLoggedIn']},
        { icon: 'mdi-cog', name: 'Settings', link: '/settings', condition: this.$store.getters['auth/isLoggedIn']},
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
