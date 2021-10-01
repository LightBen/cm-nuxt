<template>
<client-only>
  <div id="page-cuisine" class="page-page">
    <transition name="fade">
      <Loading v-if="loading"/>
    </transition>
    <slot name="page-content">
      <div class="page-title-container bharat is here">
        <figure v-if="pageBanner && pageBanner.length"
                :style="{ 'background-image': 'url(' + pageBanner + ')' }"></figure>
        <div class="container">
          <h1 id="page-title">
            <span class="lang" v-html="pageTitle"></span>
          </h1>
        </div>
      </div>
      <div class="container">
        <div id="page-details">
          <div id="page-author">
            <span class="lang-fr">Auteur : </span>
            <span class="lang-he">המחבר: </span>
            <span class="author-content" v-html="pageAuthor"></span>
          </div>
        </div>
        <div class="page-illustration" v-if="pageBanner && pageBanner.length">
          <img :src="pageBanner" alt="Illustration" class=""/>
        </div>
        <div id="page-content" v-html="pageContent"></div>
      </div>
    </slot>
    <!-- {{ this.cuisinePage }} ----- -->
  </div>
  </client-only>
</template>

<script>
import Loading from '@/components/Loading'

export default {
    async asyncData({route, app}) {
        const appData = await app.flamelink.content.get({
            schemaKey: 'cuisine',
            entryId: route.params.cuisine_url
        })
        if (appData) {
            return {
                pageTitle : appData.title,
                pageAuthor : appData.author,
                pageContent : appData.content,
                pageBanner : appData.banner,
                pageThumbnail : appData.thumbnail,
                loading : false
            }
            
      }
    },
    head() { 
      const title = (this.pageTitle) + ' | Constantine Minhagim'
      return {
        title,
        meta: [{
            hid:   'description',
            name: 'description',
            content: 'Cuisine | Constantine Minhagim'
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
            property: 'og:description',
            content: 'Recettes de cuisine | מתכונים'
          },
          {
              hid: 'og:image',
              property: 'og:image',
              content: (this.pageThumbnail ? this.pageThumbnail : '/cm-logo-full.png' )
          }
          ]
            
      }
  },
  name: 'PageCuisine',
  components: {
    Loading
  },
  // metaInfo() {
  //   return {
  //     title: this.pageTitle,
  //   }
  // },
  // head() {
  //   return {
  //     title: this.pageTitle,
  //     meta: [
  //       {
  //         hid: 'og:title',
  //         name: 'og:title',
  //         content: this.pageContent.title,
  //       },
  //       {
  //         hid: 'og:image',
  //         property: 'og:image',
  //         content: this.pageThumbnail,
  //       },
  //     ],
  //   }
  // },
  data() {
    return {
      dataEntryId: '',
      pageTitle: '',
      pageAuthor: '',
      pageContent: '',
      pageBanner: '',
      pageThumbnail: '',
      loading: true,
      titleVal: null
    }
  },
  watch: {
    locale (newval, oldVal) {
      if (newval !== oldVal) {
        this.getContent()
      }
    }
  },
  computed: {
    cuisinePage () {
      return this.$store.state.ogPageArticles
    },
    locale () {
      return this.$store.state.locale
    }
  },
  props: ['entryId'],
  async mounted () {
    this.dataEntryId = this.entryId;
    if (!this.dataEntryId) {
      this.dataEntryId = this.$route.params.cuisine_url
    }
    // await this.getContent();
    this.$root.$on('langChanged', this.getContent());
        
  },
  methods: {
    async getContent() {
      try {
        const pageContent = await this.$flamelinkApp.content.get({
          schemaKey: 'cuisine',
          entryId: this.dataEntryId
        })

      if (pageContent) {
        let ogJson = {
          pageTitle: pageContent.title,
          pageThumbnail: pageContent.thumbnail
        }
        this.$store.commit('setOgPageArticles', ogJson)
          this.pageTitle = pageContent.title;
          this.pageAuthor = pageContent.author;
          this.pageContent = pageContent.content;
          this.pageBanner = pageContent.banner;
          this.pageThumbnail = pageContent.thumbnail;
          this.loading = false;
      }
      } catch (error) {
        console.error('Something went wrong while retrieving the entry. Details:', error);
      }
        // .then(pageContent => {
          
        // })
        // .catch(error => console.error('Something went wrong while retrieving the entry. Details:', error));
    }
  }
};
</script>
