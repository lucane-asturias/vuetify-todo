<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="750" app>
      <v-img
        class="pa-3 pt-7"
        src="mountains.jpg"
        lazy-src='https://picsum.photos/id/11/10/6'
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img 
            src="https://lh3.googleusercontent.com/a-/AOh14Gjxb1ka71iUIYkb2Id8Y_nL-9fAuxHJKCzqRH7L3g=s83-c-mo" 
            alt="Lucane Asturias">
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Lucane Asturias</div>
        <div class="white--text text-subtitle-2">lucane-asturias</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="mountains.jpg"
      prominent
      :height="$route.path === '/' ? '232' :'170'"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container fluid class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">{{ $store.state.appTitle }}</v-app-bar-title>
        </v-row>
        <v-row>
         <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>

    </v-app-bar>
      
    <v-main>
      <router-view></router-view>
      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'Todo', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'About', icon: 'mdi-help-box', to: '/about' },
      ], 
    }),
    components: {
      'search': require('@/components/Tools/Search.vue').default,
      'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
      'field-add-task' : require('@/components/Todo/FieldAddTask.vue').default,
      'snackbar': require('@/components/Shared/Snackbar.vue').default,
    },
    mounted() {
      this.$store.dispatch('getTasks');
    }
  }
</script>

<style lang=sass>
  .header-container
    // max-width: none !important
    // note: adding fluid prop to v-container achieves the same result
    // fluid → removes viewport maximum-width size breakpoints
</style>