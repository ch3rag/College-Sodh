<template>
  <v-main class="pa-0">
    <v-carousel height="100%" hide-delimiters :show-arrows="false" :value="carouselVal">
      <v-carousel-item>
        <CardMedium title="Basic Account Summary" tooltip="Account Summary">
          <template v-slot:card-content>
            <v-container fluid class="text-center ma-0 pa-0">
              <v-avatar v-if="user.avatarId" size="184">
                <v-img :src="user.avatar"></v-img>
              </v-avatar>
              <v-avatar v-else size="184" color="grey">
                <v-icon class="icon-xxl white--text">fa-user </v-icon>
              </v-avatar>
              <p class="text-md-h4 text-h5 mt-10 font-weight-light">{{ user.name }}</p>
              <p class="text-h5">Account Details</p>
              <v-simple-table class="account-table mx-auto">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center text-md-h5 text-h6">Name</th>
                      <th class="text-center  text-md-h5 text-h6">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-h7 text-left text-left">
                        <v-icon left>mdi-account</v-icon>
                        Account Name
                      </td>
                      <td class="text-h7 text-left">{{ user.name }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>mdi-email</v-icon>Email</td>
                      <td class="text-h7 text-left">{{ user.email }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>mdi-phone</v-icon>Mobile</td>
                      <td class="text-h7 text-left">{{ user.mobile }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>mdi-account</v-icon>Account Type</td>
                      <td class="text-h7 text-left">{{ user.userType }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>mdi-map-marker</v-icon>City</td>
                      <td class="text-h7 text-left">{{ user.city }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>fa-globe</v-icon>State</td>
                      <td class="text-h7 text-left">{{ user.state }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>fa-calendar</v-icon>Joining Date</td>
                      <td class="text-h7 text-left">{{ new Date(user.createdAt).toISOString().substr(0, 10) }}</td>
                    </tr>
                    <tr>
                      <td class="text-h7 text-left"><v-icon left>fa-check</v-icon>Verified Profile</td>
                      <td class="text-h7 text-left">{{ user.isVerified ? 'Yes' : 'No' }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-container>
          </template>
          <template v-slot:card-actions>
            <v-spacer />
            <v-btn class="primary ma-2 pa-4" @click="carouselVal = 1"> <v-icon left>mdi-pen</v-icon>Edit Profile</v-btn>
          </template>
        </CardMedium>
      </v-carousel-item>
      <v-carousel-item>
        <CardMedium title="Edit Profile" tooltip="Edit Profile">
          <template v-slot:card-content>
            <v-container fluid class="text-center ma-0 pa-0">
              <v-avatar v-if="user.avatarId && (formValues? !formValues.avatar : true)" size="184">
                <v-img :src="defaultAvatar"></v-img>
              </v-avatar>
              <v-avatar v-else-if="(formValues? formValues.avatar : false)" size="184">
                <v-img :src="imageData"></v-img>
              </v-avatar>
              <v-avatar v-else size="184" color="grey">
                <v-icon class="icon-xxl white--text">fa-user </v-icon>
              </v-avatar>
              <p class="text-md-h4 text-h5 mt-10 font-weight-light">{{ user.name }}</p>
              <p class="text-h5">Edit Profile</p>
              <Form ref="form" :schema="fields" @mounted="formMounted" />
            </v-container>
          </template>
          <template v-slot:card-actions>
            <v-spacer />
            <v-btn color="error" class="ma-2" v-on:click="carouselVal = 0">
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn class="warning ma-2 pa-4" @click="carouselVal = 1"> <v-icon left>mdi-key</v-icon>Password</v-btn>
            <v-btn class="success ma-2 pa-4" @click="saveUserProfile"> <v-icon left>mdi-floppy</v-icon>Save</v-btn>
          </template>
        </CardMedium>
      </v-carousel-item>
    </v-carousel>
    <Dialog ref="dialog" />
    <Loading ref="ldialog" />
  </v-main>
</template>
<style scoped>
.icon-xxl {
  font-size: 100px;
}
.account-table {
  max-width: 700px;
}
</style>
<script>
import { mapGetters } from 'vuex';
import CardMedium from '@/components/CardMedium.vue';
import Form from '@/components/Form.vue';
import Dialog from '@/components/Dialog.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';

export default {
  name: 'Profile',
  methods: {
    formMounted() {
      this.formValues = this.$refs.form.values;
    },
    getAvatar() {
      const { Upload } = this.$FeathersVuex.api;
      const { File } = this.$FeathersVuex.api;
      Upload.get(this.user.avatarId).then((result) => {
        if (result) {
          File.get(result.name).then((finalResult) => {
            this.defaultAvatar = finalResult.uri;
          });
        }
      });
    },
    saveUserProfile() {
      if (this.formValues.avatar) {
        this.$refs.ldialog.showDialog(
          'Uploading Your Avatar...',
          'Please wait while your avatar is being uploaded to our servers...',
          400,
          true,
        );
        axios
          .post(`${process.env.VUE_APP_SERVER_ADDR}/files`, {
            uri: this.imageData,
            userId: this.user.id,
            type: 'AVATAR',
          })
          .then((result) => {
            this.$refs.ldialog.hideDialog();
            this.user.avatarId = result.data.uploadId;
            this.save();
          })
          .catch(() => {
            this.$refs.ldialog.hideDialog();
            this.$refs.dialog.showDialog(
              'error',
              'Error',
              'An error occured while uploading your avatar.',
              [{ text: 'RETRY', onClick: 'CLOSE' }],
              400,
            );
          });
      } else {
        this.save();
      }
    },
    save() {
      Object.assign(this.user, this.formValues);
      this.user
        .save()
        .then(() => {
          this.$refs.dialog.showDialog(
            'success',
            'Success',
            'Your changes has been saved successfully',
            [{ text: 'OK', onClick: 'CLOSE' }],
            400,
          );
        })
        .catch(() => {
          this.$refs.dialog.showDialog(
            'error',
            'Error',
            'An error occured while saving your changes.',
            [{ text: 'Retry', onClick: 'CLOSE' }],
            400,
          );
        });
    },
  },
  watch: {
    // eslint-disable-next-line
    'user.avatarId': function() {
      this.getAvatar();
    },
    // eslint-disable-next-line
    'formValues.avatar': function() {
      if (this.formValues.avatar) {
        this.readFileAsUrl(this.formValues.avatar).then((result) => {
          this.imageData = result;
        });
      }
    },
  },
  data: () => ({
    imageData: '',
    defaultAvatar: '',
    carouselVal: 0,
    editUser: null,
    fields: [],
    formValues: null,
  }),
  computed: {
    ...mapGetters('auth', ['user']),
  },
  mounted() {
    this.getAvatar();
  },
  beforeMount() {
    this.editUser = this.user;
    this.fields = [
      {
        defaults: 'name',
        defaultValue: this.user.name,
        disabled: true,
      },
      {
        defaults: 'email',
        defaultValue: this.user.email,
        disabled: true,
      },
      {
        defaults: 'mobile',
        defaultValue: this.user.mobile,
      },
      {
        defaults: 'state',
        defaultValue: this.user.state,
        disabled: true,
      },
      {
        defaults: 'city',
        defaultValue: this.user.city,
        disabled: true,
      },
      {
        defaults: 'avatar',
      },
    ];
  },
  components: {
    CardMedium,
    Form,
    Dialog,
    Loading,
  },
  mixins: ['readFileAsUrl'],
};
</script>
