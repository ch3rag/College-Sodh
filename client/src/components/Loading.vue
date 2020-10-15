<template>
  <v-dialog v-model="show" :width="width" :persistent="isPersistent" hide-overlay>
    <v-card class="mx-auto" loading disabled>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Loading',
  data: () => ({
    title: 'Loading Title',
    message: 'Loading Message',
    width: 0,
    isPersistent: false,
    show: false,
  }),
  methods: {
    showDialog(title, message, width, isPersistent) {
      this.title = title;
      this.message = message;
      this.width = width;
      this.isPersistent = isPersistent;
      this.show = true;
    },
    hideDialog() {
      this.show = false;
    },
  },
};
</script>
