<template>
  <div>
    <client-only>
      <div id="home">
        <section class="section-full full-img" id="welcome">
          <div class="section-content">
            <div class="icon-home-main">
              <svg>
                <use href="#icon-logo-cm-main"/>
              </svg>
            </div>
            <h1>
              <span id="siteTitle1Home">
                <span class="lang-fr">Constantine</span>
                <span class="lang-he">קונסטנטין</span>
              </span>
              <span id="siteTitle2Home">
                <span class="lang-fr">Minhagim</span>
                <span class="lang-he">מנהגים</span>
              </span>
            </h1>
            <div id="site-description">
              <span class="lang-fr">Minhagim constantinois <br>et d'Afrique du Nord</span>
              <span class="lang-he">מנהגי קונסטנטין <br>וצפון אפריקה</span>
            </div>
            <div id="welcome-sections">
              <router-link :to="{ name: 'Halakha' }" class="halakha">
                <svg class="icon-home-section">
                  <use href="#icon-star-david"/>
                </svg>
                <span class="home-section-title lang-fr">Halakha</span>
                <span class="home-section-title lang-he">הלכה</span>
              </router-link>
              <router-link :to="{ name: 'Hazanout' }" class="hazanout">
                <svg class="icon-home-section">
                  <use href="#icon-music-1"/>
                </svg>
                <span class="home-section-title lang-fr">'Hazanout</span>
                <span class="home-section-title lang-he">חזנות</span>
              </router-link>
              <router-link :to="{ name: 'Cuisine' }" class="cuisine">
                <svg class="icon-home-section">
                  <use href="#icon-food-tray"/>
                </svg>
                <span class="home-section-title lang-fr">Cuisine</span>
                <span class="home-section-title lang-he">מתכונים</span>
              </router-link>
              <router-link :to="{ name: 'Articles' }" class="articles">
                <svg class="icon-home-section">
                  <use href="#icon-document"/>
                </svg>
                <span class="home-section-title lang-fr">Articles</span>
                <span class="home-section-title lang-he">מאמרים</span>
              </router-link>
              <a href="https://www.youtube.com/channel/UCuZ5tVv28xXn6kQcv_u5ufg" target="_blank" class="drive"
                 rel="noopener">
                <svg class="icon-home-section">
                  <use href="#icon-youtube"/>
                </svg>
                <span class="home-section-title">
                  <span class="lang-fr">YouTube</span>
                  <span class="lang-he">יוטוב</span>
                  <svg class="icon-label d-none">
                    <use href="#icon-external"/>
                  </svg>
                </span>
              </a>
              <a href="https://www.facebook.com/groups/185262976153983" target="_blank" class="drive" rel="noopener">
                <svg class="icon-home-section">
                  <use href="#icon-fb"/>
                </svg>
                <span class="home-section-title">
                  <span class="lang-fr">Facebook</span>
                  <span class="lang-he">פייסבוק</span>
                  <svg class="icon-label d-none">
                    <use href="#icon-external"/>
                  </svg>
                </span>
              </a>
              <router-link :to="{ name: 'Home' }" class="siddour section-disabled d-none">
                <svg class="icon-home-section">
                  <use href="#icon-book-fill"/>
                </svg>
                <span class="home-section-title lang-fr">Bientôt...</span>
                <span class="home-section-title lang-he">בקרוב</span>
              </router-link>
            </div>
          </div>
        </section>
      </div>
    </client-only>
  </div>
</template>

<style src="./home.scss" lang="scss"></style>

<script>
export default {
  metaInfo() {
    return {
      title: 'Constantine Minhagim | קונסטנטין מנהגים',
      titleTemplate: null
    }
  },
  head() {
    const title = 'home | Constantine Minhagim'
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Homepage: Constantine Minhagim'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'home page of Constantine Minhagim.'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/cm-og-default.jpg'
        }]

    }
  },
  name: 'home',
  // head() {
  //   return {
  //     title: this.pageTitle,
  //     meta: [
  //       {
  //         hid: 'og:title',
  //         name: 'og:title',
  //         content: this.pageTitle,
  //       },
  //       {
  //         hid: 'og:image',
  //         property: 'og:image',
  //         content: this.pageBanner,
  //       },
  //     ],
  //   }
  // },
  data() {
    return {
      // siteTitle1: '',
      // siteTitle2: '',
      pageTitle: '',
    }
  },
  components: {},
  created() {
    // this.getContent();
  },
  watch: {
    locale(newval, oldVal) {
      if (newval !== oldVal) {
        this.getContent()
      }
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    }
  },
  mounted() {
    this.$root.$on('langChanged', this.getContent);
    this.getContent();
  },
  methods: {
    getContent() {
      this.$flamelinkApp.content.get({
        schemaKey: 'general',
      })
        .then(data => {
          // console.log('data: ', data);;
          this.pageTitle = data['56Mopx0dRrhGql4KrFQX'].title;
          // this.siteTitle1 = data['hWHhdCrUx34iDIsPZokP'].title;
          // this.siteTitle2 = data['crXGbshLALxsrrmX0APz'].title;
        })
        .catch(error => console.error('Something went wrong while retrieving the entry. Details:', error));
    }
  },
  beforeCreate: function () {
    if (process.client) {
      document.body.classList.add('is-homepage');
    }
  },
  beforeDestroy: function () {
    if (process.client) {
      document.body.classList.remove('is-homepage');
    }
  },
  // async asyncData({app}) {
  //   try {
  //     const myContent = await app.flamelink.content.get('schemaKey', {
  //       schemaKey: 'general'
  //     })
  //     return {myContent}
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

};
</script>
