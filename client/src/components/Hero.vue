<template>
  <v-parallax :style="heroStyle" :src="backgroundImage">
    <v-layout column align-center justify-center>
      <v-container fluid class="py-6 py-md-12">
        <v-responsive max-width="1300px" class="mx-auto">
          <v-row justify="center" class="text-md-left text-center">
            <v-col cols="12" md="6">
              <slot name="content-left">
                <div class="font-weight-light text-md-h1 text-h2">
                  {{ title }}
                </div>
                <div class="text-md-h4 my-6 mx-2 text-h5">
                  {{ subtitle }}
                </div>
              </slot>
            </v-col>
            <v-col cols="12" md="6">
              <slot name="content-right">
                <div class="text-md-h4 font-weight-thin text-h5">
                  {{ description }}
                </div>
              </slot>
            </v-col>
          </v-row>
        </v-responsive>
      </v-container>
    </v-layout>
  </v-parallax>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    subtitle: {
      type: String,
      default: 'Subtitle',
    },
    description: {
      type: String,
      default: 'Description of your Hero!',
    },
    backgroundStyle: {
      type: String,
      default: 'linear-gradient(to top, #00c6ff, #0072ff);',
    },
    backgroundImage: {
      type: String,
    },
    heroHeight: {
      type: String,
      default: '100vh',
    },
  },
  name: 'Hero',
  computed: {
    heroStyle() {
      let style;
      if (!this.backgroundImage) {
        style = `background: ${this.backgroundStyle}; height: ${this.heroHeight};`;
      } else {
        style = `height: ${this.heroHeight};`;
      }
      return style;
    },
  },
};
</script>
