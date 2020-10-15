<template>
  <v-dialog v-model="show" :width="width" :persistent="isPersistent">
    <v-card>
      <v-card-title class="title lighten-1 white--text" primary-title :class="color">
        <v-icon left color="white">{{ icon }}</v-icon>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <br />
        {{ message }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="button in this.buttons"
          :key="button.text"
          :color="button.color ? button.color : color"
          text
          @click="getClickFunction(button.onClick, button.param)()"
        >
          {{ button.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    buttons: [],
    title: 'Dialog Title',
    color: 'info',
    icon: 'mdi-alert-circle',
    message: 'Dialog Message',
    isPersistent: false,
    show: false,
    width: 0,
  }),
  methods: {
    getClickFunction(type, param) {
      switch (type) {
        case 'REDIRECT':
          return () => {
            setTimeout(() => {
              this.show = false;
            });

            this.$router.push(param);
          };
        case 'CLOSE':
          return () => {
            this.show = false;
          };
        default:
          return () => {};
      }
    },
    showDialog(type, title, message, buttons, width) {
      this.show = true;
      switch (type) {
        case 'info':
          this.buttonColor = 'info';
          this.icon = 'mdi-information';
          this.color = this.buttonColor;
          break;
        case 'error':
          this.buttonColor = 'error';
          this.icon = 'mdi-alert-circle';
          this.color = this.buttonColor;
          break;
        case 'warning':
          this.buttonColor = 'warning';
          this.icon = 'mdi-bell-ring-outline';
          this.color = this.buttonColor;
          break;
        case 'success':
          this.buttonColor = 'success';
          this.icon = 'fa-check-circle';
          this.color = this.buttonColor;
          break;
        default:
          return {};
      }
      this.title = title;
      this.message = message;
      this.buttons = buttons;
      this.width = width;
      return true;
    },
  },
  props: ['config'],
};
</script>
