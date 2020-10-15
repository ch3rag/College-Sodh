<template>
      <v-row class="ma-0 pa-0">
        <v-col cols="12" sm="12" offset-sm="3" class="ma-0 pa-0">
          <v-card class="mx-0 pa-0" elevation="0">
            <v-toolbar color="primary" dark>
              <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
              <v-spacer />
              <v-icon x-large>{{ icon }}</v-icon>
            </v-toolbar>
          <v-card-text>
            <slot name="card-content"/>
          </v-card-text>
          <v-card-actions>
            <slot name="card-actions" />
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
</template>
<script>
export default {
  name: 'CardFull',
  props: {
    title: {
      type: String,
      default: 'Card Title',
    },
    icon: {
      type: String,
      default: 'mdi-information-outline',
    },
    subHeader: {
      type: String,
      default: 'Card SubHeader',
    },
  },
};
</script>
