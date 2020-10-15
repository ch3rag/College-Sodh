<template>
  <v-main>
    <v-toolbar style="postition: fixed; top: 0">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>Institution Dashboard</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary style="z-index: 9999;">
      <v-list-item>
        <v-list-item-avatar>
          <v-img v-if="user.avatar" :src="user.avatar"></v-img>
          <v-icon v-if="!user.avatar" large class="mr-2">mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, index) in items" :key="item.title" link @click="componentIndex = index">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <Profile v-if="componentIndex == 0" />
    <Information v-if="componentIndex == 1" />
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
import Profile from './Profile.vue';
import Information from './Information.vue';

export default {
  name: 'DashboardInstitution',
  data() {
    return {
      componentIndex: 0,
      drawer: null,
      items: [
        { title: 'Profile', icon: 'mdi-view-dashboard' },
        { title: 'Info', icon: 'mdi-pen' },
        { title: 'Courses', icon: 'mdi-book' },
        { title: 'Reviews', icon: 'mdi-star' },
        { title: 'Gallary', icon: 'mdi-image' },
        { title: 'News', icon: 'mdi-newspaper' },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  components: {
    Profile,
    Information,
  },
};
</script>
