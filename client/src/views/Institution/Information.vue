<template>
  <v-carousel hide-delimiters :show-arrows="false" light :value="carouselVal">
    <v-carousel-item>
      <CardFull title="Institution Information" subHeader="Current Information">
        <template v-slot:card-content>
          <v-layout align-center justify-center>
            <p class="text-center text-h2 font-weight-thin">No Information Added</p>
          </v-layout>
        </template>
        <template v-slot:card-actions>
          <v-spacer />
          <v-btn class="primary ma-2 pa-4" @click="carouselVal = 1">
            <v-icon left>mdi-pen</v-icon>Edit Information</v-btn
          >
        </template>
      </CardFull>
    </v-carousel-item>
    <v-carousel-item>
      <CardFull title="Institution Information" subHeader="Edit Infomation" icon="mdi-pen">
        <template v-slot:card-content>
          <ejs-richtexteditor ref="defaultRTE" height="100%"> </ejs-richtexteditor>
        </template>
        <template v-slot:card-actions>
          <v-spacer />
          <v-btn color="error" class="ma-2" v-on:click="carouselVal = 0">
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
          <v-btn class="success ma-2 pa-4" @click="saveUserProfile"> <v-icon left>mdi-floppy</v-icon>Save</v-btn>
        </template>
      </CardFull>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
/* eslint-disable */
import {
  RichTextEditorPlugin,
  Toolbar,
  Link,
  Image,
  Count,
  HtmlEditor,
  QuickToolbar,
} from '@syncfusion/ej2-vue-richtexteditor';
import CardFull from '@/components/CardFull.vue';

/* eslint-enable */
export default {
  name: 'Information',
  data: () => ({
    carouselVal: 0,
  }),
  components: {
    CardFull,
  },
  provide: {
    richtexteditor: [Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar],
  },
};
</script>
