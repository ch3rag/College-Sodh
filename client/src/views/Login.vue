<template>
  <v-main>
    <v-carousel :show-arrows="false" hide-delimiters height="100%" :value="carouselVal">
      <v-carousel-item>
        <CardSmall title="Login To Your Account" icon="mdi-login" tooltip="Login">
          <template v-slot:card-content>
            <Form :schema="fields" ref="form" />
          </template>
          <template v-slot:card-actions>
            <v-spacer />
            <v-btn color="error" class="ma-2" v-on:click="carouselVal = 1">
              Forgot Password?
            </v-btn>
            <v-btn color="primary" class="ma-2" v-on:click="login"> <v-icon left>mdi-login</v-icon>Login</v-btn>
          </template>
        </CardSmall>
      </v-carousel-item>
      <v-carousel-item>
        <CardSmall title="Forgot Password" icon="mdi-history" tooltip="Forgot Password">
          <template v-slot:card-content>
            <Form :schema="fieldsForgotPassword" ref="formForgotPassword" />
          </template>
          <template v-slot:card-actions>
            <v-spacer />
            <v-btn color="error" class="ma-2" v-on:click="carouselVal = 0">
              <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
            <v-btn color="primary" class="ma-2" v-on:click="sendForgotPasswordEmail">
              <v-icon left>mdi-email</v-icon>Send Email</v-btn
            >
          </template>
        </CardSmall>
      </v-carousel-item>
    </v-carousel>
    <Dialog ref="dialog" />
    <Loading ref="ldialog" />
  </v-main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Dialog from '@/components/Dialog.vue';
import Loading from '@/components/Loading.vue';
import CardSmall from '../components/CardSmall.vue';
import Form from '../components/Form.vue';

export default {
  name: 'Login',
  methods: {
    sendForgotPasswordEmail() {
      // Send Email
    },
    login() {
      if (this.$refs.form.validate()) {
        this.$refs.ldialog.showDialog('Hold On..', 'Please wait while we log you in.', 400, true);
        Object.assign(this.user, this.$refs.form.values);
        this.authenticate({
          strategy: 'local',
          ...this.user,
        })
          .then(() => {
            this.$refs.ldialog.hideDialog();
            this.$refs.dialog.showDialog(
              'success',
              'Success',
              'Successfully logged In!',
              [{ text: 'OK', onClick: 'REDIRECT', param: '/' }],
              400,
            );
          })
          .catch((error) => {
            this.$refs.ldialog.hideDialog();
            if (error.code === 401 || error.code === 404) {
              this.$refs.dialog.showDialog(
                'error',
                'An error occured',
                'User not found. Please check your email and password.',
                [{ text: 'Retry', onClick: 'CLOSE' }],
                400,
              );
            } else {
              this.$refs.dialog.showDialog(
                'error',
                'An error occured',
                'Unknown server error has occured.',
                [{ text: 'Retry', onClick: 'CLOSE' }],
                400,
              );
            }
          });
      }
    },
    ...mapActions('auth', ['authenticate']),
  },
  computed: {
    ...mapState('auth', ['isAuthenticatePending']),
  },
  data: () => ({
    carouselVal: 0,
    dConfig: {},
    lConfig: {
      isPersistent: true,
      show: 'true',
      message: 'Loggin in...',
    },
    user: {
      email: '',
      password: '',
    },
    fields: [
      {
        defaults: 'email',
      },
      {
        defaults: 'password',
      },
    ],
    fieldsForgotPassword: [
      {
        defaults: 'email',
      },
    ],
  }),
  components: {
    Dialog,
    Loading,
    CardSmall,
    Form,
  },
};
</script>
