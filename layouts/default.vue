<template>
  <v-app>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs"
      v-model="drawer"
      app
      fixed
      nav
      temporary
      right
    >
      <v-list-item v-if="loggedIn">
        <v-list-item-avatar>
          <v-img v-if="user.img" :src="user.img" />
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="user.name" />
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="loggedIn" />
      <v-list dense nav>
        <v-list-item v-for="(item, index) in items.concat(loggedIn ? loggedInItems : notLoggedInItems) " :key="index" router :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      v-if="$vuetify.breakpoint.xs"
      app
      dark
      color="primary"
    >
      <v-toolbar-title>Shoplistr</v-toolbar-title>
      <v-spacer />
      <v-app-bar-nav-icon @click="drawer = true" />
    </v-app-bar>

    <v-app-bar
      v-else
      app
      dark
      color="primary"
    >
      <v-toolbar-title>Shoplistr</v-toolbar-title>
      <v-spacer />
      <v-btn rounded to="/" text>
        <v-icon left>
          mdi-home
        </v-icon>
        Home
      </v-btn>
      <v-btn v-if="!loggedIn" rounded to="/login" text>
        <v-icon left>
          mdi-arrow-right-circle
        </v-icon>
        Login
      </v-btn>
      <v-menu v-else offset-y>
        <template v-slot:activator="{ on }">
          <v-btn rounded text v-on="on">
            <v-avatar v-if="user.img" size="24px">
              <v-img left :src="user.img" />
            </v-avatar>
            <v-icon v-else left>
              mdi-account-circle
            </v-icon>
            <span v-if="user.img">&nbsp;</span>
            {{ user.name }}
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in loggedInItems"
            :key="index"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon rounded @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-text="$vuetify.theme.dark ? 'mdi-brightness-4' : 'mdi-brightness-7'" />
      </v-btn>
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
  fetch () {

  },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    console: () => console,
    user () {
      return this.$store.state.auth.user
    },
    loggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    },
    items () {
      return [
        { icon: 'mdi-home', name: 'Home', link: '/' }
      ]
    },
    notLoggedInItems () {
      return [
        { icon: 'mdi-arrow-right-circle', name: 'Login', link: '/login' }
      ]
    },
    loggedInItems () {
      return [
        { icon: 'mdi-format-list-bulleted-square', name: 'Lists', link: '/lists' },
        { icon: 'mdi-cog', name: 'Settings', link: '/settings' },
        { icon: 'mdi-arrow-left-circle', name: 'Logout', link: '/logout' }
      ]
    }
  }
}
</script>

<style>
</style>
