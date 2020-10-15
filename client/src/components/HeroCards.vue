<template>
  <v-col cols="12">
    <v-row align="center" justify="center">
      <v-hover v-for="card in cards" :key="card.title">
        <template v-slot="{ hover }">
          <v-card
            rounded
            max-width="400"
            min-height="420"
            :elevation="hover ? 24 : 6"
            class="card-parent transition-swing ma-8 text-center"
          >
            <v-icon class="card-icon pa-5 mt-6">{{ card.icon }}</v-icon>
            <v-card-title class="justify-center text-md-h4 text-h5 font-weight-light">{{ card.title }}</v-card-title>
            <v-card-text class="card-text text-center text--primary">{{ card.description }}</v-card-text>
            <v-card-actions class="justify-center card-action">
              <v-btn color="orange" outlined @click="card.buttonLink || null">{{ card.buttonText }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-hover>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'HeroCards',
  props: {
    cards: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.card-icon {
  font-size: 100px;
}

.card-text {
  font-size: 15px;
}
.card-action {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-bottom: 10%;
}

.card-parent {
  position: relative;
}
</style>
