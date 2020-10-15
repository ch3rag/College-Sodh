<template>
  <v-main>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="8" md="4">
        <v-carousel hide-delimiters :show-arrows="false" :value="carouselVal" height="500px" fluid> </v-carousel>
      </v-col>
    </v-row>
  </v-main>
</template>
<script>
export default {
  name: 'CardCaroselSmall',
  data: () => ({
    carouselVal: 0,
  }),
};
</script>
