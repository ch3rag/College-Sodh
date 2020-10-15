<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-card max-width="500" elevation="12" rounded class="fill-width mx-2 mx-lg-0" light>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title class="text--white">{{ title }}</v-toolbar-title>
          <v-spacer />
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on">
                <v-icon>{{ icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>
        </v-toolbar>
        <v-card-text>
          <slot name="card-content"></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="card-actions"></slot>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'CardSmall',
  props: {
    title: {
      type: String,
      default: 'Card Title',
    },
    icon: {
      type: String,
      default: 'mdi-information-outline',
    },
    tooltip: {
      type: String,
      default: 'Card Tool Tip',
    },
  },
};
</script>
<style scoped>
.fill-width {
  width: 100%;
}
</style>
