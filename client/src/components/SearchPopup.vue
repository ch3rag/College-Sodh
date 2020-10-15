<template>
  <v-dialog>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" small class="ml-2" fab>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: 'SearchPopup.vue',
  data: () => ({
    select: '',
    search: null,
    items: [
      'Colleges',
      'Courses',
      'Reviews',
      'News',
      'Admissions',
      'Top Colleges',
      'Trending',
    ],
  }),
};
</script>
