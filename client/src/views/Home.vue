<template>
  <v-main>
    <Hero
      title="College Sodh"
      subtitle="Get Your Colleges Right!"
      description="CollegeSodh is an extensive search engine for the students, parents, and education industry players
                  who are seeking information on higher education sector in India and abroad. One can rely on College
                  Sodh.com for getting most brief and relevant data on colleges and universities."
    >
    </Hero>
    <HeroHeader title="Get Started" subtitle="Choose Who You Are" />
    <HeroCards :cards="cardsOne" />
    <HeroHeader title="Explore More" subtitle="Choose Your Path" />
    <HeroCards :cards="cardsTwo" />
  </v-main>
</template>
<script>
import Hero from '../components/Hero.vue';
import HeroHeader from '../components/HeroHeader.vue';
import HeroCards from '../components/HeroCards.vue';

export default {
  data: () => ({
    cardsOne: [
      {
        title: "I'am a Student",
        description:
          'Get Started As Student, Find Your Best College, Read Reviews And Write Your Own Reviews and Much More',
        buttonText: 'Get Started',
        icon: 'fa-user-graduate',
      },
      {
        title: "I'am an Institution",
        description: 'Add Your Institution, Curate Content, Get Listed With Us And Much More!',
        buttonText: 'Get Started',
        icon: 'fa-school',
      },
      {
        title: "I'am an Admin",
        description: 'Manage All Around Activities Of CollegeShodh, Get Analytics, And Much More!',
        buttonText: 'Get Started',
        icon: 'fa-user-shield',
      },
    ],
    cardsTwo: [
      {
        title: 'Top Colleges',
        description:
          'Find Which Colleges And Universities Tops Our Charts!',
        buttonText: 'Get Started',
        icon: 'fa-chart-line',
      },
      {
        title: 'Latest News',
        description: 'Get Updated With Latest News About Colleges And Universities!',
        buttonText: 'Get Started',
        icon: 'fa-newspaper',
      },
      {
        title: 'Reviews',
        description: 'See What Awesome People Like You Think About Their Colleges And Universities!',
        buttonText: 'Get Started',
        icon: 'fa-star-half-alt',
      },
    ],
  }),
  components: {
    Hero,
    HeroHeader,
    HeroCards,
  },
};
</script>
<style></style>
