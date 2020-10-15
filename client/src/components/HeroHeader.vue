<template>
  <v-container fluid class="py-14">
    <div class="text-center text-md-h2 text-h3">{{ title }}</div>
    <div class="text-center text-md-h5 text-h5 my-4 font-weight-light">
      {{ subtitle }}
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'CardHeroHeader',
  props: {
    title: {
      type: String,
      default: 'Hero Header Title',
    },
    subtitle: {
      type: String,
      default: 'Hero Header Subtitle',
    },
  },
};
</script>
