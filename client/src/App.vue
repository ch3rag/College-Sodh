<template>
  <v-app>
    <!-- Mobile -->
    <section v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-icon small>fa-graduation-cap</v-icon>
        <h4 class="ml-1">CollgeSodh</h4>
        <v-spacer></v-spacer>
        <NavUserMenu />
        <SearchPopup />
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" app>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <template v-for="menu in menus">
              <v-list-group :prepend-icon="menu.icon" :key="menu.name" v-if="menu.tabHeaders">
                <template v-slot:activator>
                  <v-list-item-title>{{ menu.name }}</v-list-item-title>
                </template>
                <v-list-group v-for="tabHeader in menu.tabHeaders" :key="tabHeader.name" link sub-group>
                  <template v-slot:activator>
                    <v-list-item-title v-text="tabHeader.name"></v-list-item-title>
                  </template>
                  <v-list-group v-for="tabSubHeader in tabHeader.tabSubHeaders" :key="tabSubHeader.name" sub-group>
                    <template v-slot:activator>
                      <v-list-item-title v-text="tabSubHeader.name"></v-list-item-title>
                    </template>
                    <v-list-item v-for="item in tabSubHeader.data" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </v-list-group>
              </v-list-group>
              <v-list-item v-else :key="menu.name">
                <v-list-item-icon>
                  <v-icon>{{ menu.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ menu.name }}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </section>

    <v-app-bar app color="primary" dark class="px-5" v-if="$vuetify.breakpoint.lgAndUp">
      <v-icon large>fa-graduation-cap</v-icon>
      <h2 class="ml-5">CollegeSodh</h2>
      <v-spacer></v-spacer>

      <!-- Navbar Menu -->
      <v-menu
        v-model="menu.activator"
        :close-on-content-click="false"
        v-for="menu in menus"
        :key="menu.name"
        offset-y
        min-width="99vw"
        open-on-hover
      >
        <!-- Menu Button -->
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            text
            height="120%"
            @click="menu.link ? $router.push(menu.link).catch(() => {}) : null"
          >
            <span class="mr-2">{{ menu.name }}</span>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-btn>
        </template>

        <!-- Menu Expanded -->
        <v-card v-if="menu.tabHeaders">
          <!-- Menu Header -->
          <v-list>
            <v-list-item>
              <v-icon large class="mr-5">{{ menu.icon }}</v-icon>
              <v-list-item-content>
                <v-list-item-title>{{ menu.name }}</v-list-item-title>
                <v-list-item-subtitle>Universities &amp; Colleges</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <!-- Tabbing Headers -->
          <v-tabs center-active v-model="tab">
            <v-tab v-for="tabHeader in menu.tabHeaders" :key="tabHeader.name" :v-model="menu.tabHeaders">{{
              tabHeader.name
            }}</v-tab>
          </v-tabs>

          <!-- Tab Items -->
          <!-- TODO: Make tabSubHeader.data an object with clickable links -->
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="tabHeader in menu.tabHeaders" :key="tabHeader.name">
              <v-row>
                <v-col v-for="tabSubHeader in tabHeader.tabSubHeaders" :key="tabSubHeader.name" class="ml-8">
                  <v-row class="text-uppercase font-weight-bold">{{ tabSubHeader.name }}</v-row>
                  <br />
                  <v-row v-for="item in tabSubHeader.data" :key="item.name">
                    <a class="text-button">{{ item }}</a>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-menu>

      <!-- User Menu -->
      <NavUserMenu />
      <SearchPopup />
    </v-app-bar>

    <!-- View Injection -->
    <router-view />

    <!-- TODO: Rethink Bottom Navigation -->
    <!-- <v-bottom-navigation color="indigo">
      <v-btn>
        <span>History</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn v-if="$vuetify.breakpoint.lgAndUp">
        <span>Top Colleges &amp; Universities</span>
        <v-icon>fa-chart-line</v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.breakpoint.lgAndUp">
        <span>News</span>
        <v-icon>fa-newspaper</v-icon>
      </v-btn>

      <v-btn>
        <span>Reviews</span>
        <v-icon>fa-star-half-alt</v-icon>
      </v-btn>
      <v-btn>
        <span>Write A Review</span>
        <v-icon>fa-pen</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>

<script>
import NavUserMenu from './components/NavUserMenu.vue';
import SearchPopup from './components/SearchPopup.vue';

export default {
  name: 'App',

  components: {
    NavUserMenu,
    SearchPopup,
  },
  data: () => ({
    menus: [
      {
        name: 'Home',
        icon: 'fa-home ',
        link: '/',
      },
      {
        name: 'Commerce',
        icon: 'fa-university ',
        activator: false,
        tabHeaders: [
          {
            name: 'B.COM. Colleges',
            cols: 4,
            tabSubHeaders: [
              {
                name: 'By Course',
                data: [
                  'OFFICE MANAGEMENT',
                  'TAXATION',
                  'BANKING',
                  'FINANCE',
                  'ACCOUNTING',
                  'COMPUTER APPLICATION STUDIES',
                ],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
          {
            name: 'M.COM. Colleges',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: ['ENTREPRENEURSHIP', 'INTERNATIONAL BUSINESS', 'BUSINESS MANAGEMENT'],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
        ],
      },
      {
        name: 'Engineering',
        icon: 'fa-flask ',
        activator: false,
        tabHeaders: [
          {
            name: 'BE/B.TECH COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: [
                  'ELECTRICAL',
                  'INFORMATION TECHNOLOGY',
                  'ELECTRICAL & ELECTRONICS',
                  'ELECTRONICS & COMMUNICATION',
                  'CIVIL ENGINEERING',
                  'MECHANICAL ENGINEERING',
                ],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
          {
            name: 'ME/M.TECH COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: [
                  'CONTROL ENGINEERING',
                  'METALLURGICAL ENGINEERING',
                  'NANOTECHNOLOGY',
                  'ROBOTICS',
                  'SOFTWARE ENGINEERING',
                  'GENERAL',
                ],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
        ],
      },
      {
        name: 'Medical',
        icon: 'fa-user-md ',
        activator: false,
        tabHeaders: [
          {
            name: 'MBBS COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: ['GENERAL'],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
          {
            name: 'MS COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: ['HUMAN ANATOMY', 'AYURVED', 'OPHTHALMOLOGY', 'OBSTETRICS', 'E.N.T', 'ORTHOPAEDICS'],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
        ],
      },
      {
        name: 'Management',
        icon: 'fa-user-tie',
        activator: false,
        tabHeaders: [
          {
            name: 'BBA/BBM COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: [
                  'COMPUTER SCIENCE',
                  'DESIGN MANAGEMENT',
                  'HOSPITAL MANAGEMENT',
                  'AGRI MANAGEMENT',
                  'CORPORATE LAW',
                  'BANKING',
                ],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
          {
            name: 'MBA/PGDM COLLEGES',
            tabSubHeaders: [
              {
                name: 'By Course',
                data: [
                  'FOREIGN TRADE',
                  'INFORMATION TECHNOLOGY',
                  'OPERATIONS MANAGEMENT',
                  'HUMAN RESOURCES MANAGEMENT',
                  'MARKETING',
                  'FINANCE',
                ],
              },
              {
                name: 'By State',
                data: ['TAMIL NADU', 'KARNATAKA', 'MAHARASHTRA', 'UTTAR PRADESH', 'KERALA', 'DELHI NCR'],
              },
              {
                name: 'By City',
                data: ['BANGALORE', 'CHENNAI', 'MUMBAI', 'KOLKATA', 'INDORE', 'PUNE'],
              },
              { name: 'By Reviews', data: ['Best Reviewed Colleges'] },
            ],
          },
        ],
      },
      {
        name: 'More',
        icon: 'fa-expand ',
        activator: false,
      },
    ],
    loading: false,
    tab: null,
    drawer: false,
  }),
};
</script>
<style scoped>
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css';
</style>
