<template>
  <v-main>
    <CardSmall title="Sign Up As Institution" icon="fa-university" tooltip="Sign Up As Institution">
      <template v-slot:card-content>
        <Form ref="form" :schema="fields" />
      </template>
      <template v-slot:card-actions>
        <v-spacer />
        <v-btn color="primary" class="mb-2" v-on:click="validate">
          <v-icon left>mdi-account-plus</v-icon>Continue</v-btn
        >
      </template>
    </CardSmall>
    <Dialog ref="dialog" />
    <Loading ref="ldialog" />
  </v-main>
</template>

<script>
import Dialog from '@/components/Dialog.vue';
import Loading from '@/components/Loading.vue';
import CardSmall from '@/components/CardSmall.vue';
import Form from '@/components/Form.vue';

import { mapState } from 'vuex';

export default {
  name: 'SignUpInstitution',
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        Object.assign(this.user, this.$refs.form.values);
        this.$refs.ldialog.showDialog('Hold On..', 'Please wait while we sign you up.', 400, true);
        const { User } = this.$FeathersVuex.api;
        const newUser = new User(this.user);
        newUser
          .save()
          .then(() => {
            this.$refs.ldialog.hideDialog();
            this.$refs.dialog.showDialog(
              'success',
              'Success',
              'Sign up sucessful! Please Check Your Email For The Verification Link.',
              [{ text: 'OK', onClick: 'REDIRECT', param: '/login' }],
              400,
            );
          })
          .catch((error) => {
            this.$refs.ldialog.hideDialog();
            if (error.code === 400) {
              this.$refs.dialog.showDialog(
                'error',
                'An error occured',
                'An account with the same e-mail already exists.',
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
  },
  components: {
    Dialog,
    Loading,
    CardSmall,
    Form,
  },
  computed: {
    ...mapState('users', ['isCreatePending']),
  },
  data: () => ({
    user: {
      userType: 'INSTITUTION',
    },
    fields: [
      {
        defaults: 'name',
        placeholder: 'Name Of The Institution',
        hint: 'Enter your institution name',
        maxLength: 80,
      },
      {
        defaults: 'email',
        placeholder: "Institution's Email",
        hint: "Enter your institution's email",
      },
      {
        defaults: 'mobile',
        placeholder: "Institution's Mobile Number",
      },
      {
        defaults: 'password',
      },
      {
        defaults: 'confirmPassword',
      },
      {
        defaults: 'state',
      },
      {
        defaults: 'city',
      },
    ],
  }),
};
</script>
