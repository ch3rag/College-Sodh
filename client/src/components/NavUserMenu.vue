<template>
  <v-menu open-on-hover :close-on-content-click="false" offset-y offset-x style="z-index: 9999">
    <!-- Navbar Avatar Button -->
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small v-bind="attrs" v-on="on" light>
        <v-icon v-if="!isAuthenticated || !user || !defaultAvatar">mdi-account-circle</v-icon>
        <!-- <v-list-item-avatar v-else small v-bind="attrs" v-on="on" size="50"> -->
        <v-avatar size="40" v-else><img :src="defaultAvatar" :alt="user.name" /> </v-avatar>
        <!-- </v-list-item-avatar> -->
      </v-btn>
    </template>

    <!-- User Menu -->
    <v-card>
      <!-- User Menu Header -->
      <v-list>
        <v-list-item>
          <v-list-item-avatar v-if="isAuthenticated && user.avatar">
            <img :src="user.avatar" :alt="user.name" />
          </v-list-item-avatar>
          <v-icon v-if="!isAuthenticated || !user || !defaultAvatar" x-large class="mr-2">mdi-account-circle</v-icon>
          <!-- <v-list-item-avatar v-else small v-bind="attrs" v-on="on"> -->
            <v-avatar size="40" class="mr-4" v-else><img :src="defaultAvatar" :alt="user.name" /> </v-avatar>
          <!-- </v-list-item-avatar> -->
          <v-list-item-content>
            <v-list-item-title>{{ user ? user.name : 'Anonymous User' }}</v-list-item-title>
            <v-list-item-subtitle>{{ user ? user.email : 'Log In/Sign Up' }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!-- User Menu Content -->
      <v-list v-if="!isAuthenticated">
        <v-list-item @click="$router.push('/login')">
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Login</v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push('/signupstudent')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Sign Up As Student</v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push('/signupinstitution')">
          <v-list-item-icon>
            <v-icon>fa-university</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Sign Up As Institution</v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-else>
        <v-list-item @click="$router.push('/dashboardinstitution')">
          <v-list-item-icon>
            <v-icon>mdi-card</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Dashboard</v-list-item-content>
        </v-list-item>
        <v-list-item @click="logOut()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavUserMenu',
  data: () => ({
    defaultAvatar: '',
    attrs: null,
    on: null,
  }),
  watch: {
    'user.avatarId': function () {
      this.getAvatar();
    },
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
  },
  methods: {
    getAvatar() {
      const { Upload } = this.$FeathersVuex.api;
      const { File } = this.$FeathersVuex.api;
      if (this.user) {
        Upload.get(this.user?.avatarId).then((result) => {
          if (result) {
            File.get(result.name).then((finalResult) => {
              this.defaultAvatar = finalResult.uri;
            });
          }
        });
      }
    },
    ...mapActions('auth', ['logout']),
    logOut() {
      this.logout()
        .then(() => {
          this.$router.push('/');
          this.$router.go();
        })
        .catch(() => {
          this.$router.push('/');
          this.$router.go();
        });
    },
  },
};
</script>
