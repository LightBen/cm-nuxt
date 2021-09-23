<template>
  <div id="page-cuisine" class="page-page">
    <transition name="fade">
      <Loading v-if="loading"/>
    </transition>
    <slot name="page-content">
      <div class="page-title-container">
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
          <img :src="pageBanner" alt="Illustration" class="" />
        </div>
        <div id="page-content" v-html="pageContent"></div>
      </div>
    </slot>
    <!-- {{ this.cuisinePage }} ----- -->
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapMutations } from 'vuex'

export default {
  head () {
    const title = 'Constantine Minhagim'
      return {
      title,
      meta: [
          {
          name: 'description',
          content: 'Halakha section.'
          },
          {
          name: 'og:type',
          content: 'website'
          },
          {
          name: 'og:title',
          content: 'Constantine Minhagim'
          },
          {
          name: 'og:description',
          content: 'Halakha section.'
          },
          {
            name: 'og:image',
            content: '/cm-logo-full.png'
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
  computed: {
    cuisinePage () {
      return this.$store.state.cuisinePage
    }
  },
  props: ['entryId'],
  mounted () {
    this.dataEntryId = this.entryId;
    if (!this.dataEntryId) {
      this.dataEntryId = this.$route.params.cuisine_url
    }
    this.getContent();
    this.$root.$on('langChanged', this.getContent);
        
  },
  methods: {
    getContent() {
      this.$flamelinkApp.content.get({
        schemaKey: 'cuisine',
        entryId: this.dataEntryId
      })
        .then(pageContent => {
          this.$store.commit('setCuisinePage', pageContent.title)
          document.querySelector('meta[name="og:title"]').setAttribute("content", pageContent.title)
          document.querySelector('meta[name="og:image"]').setAttribute("content", pageContent.thumbnail)
          document.querySelector('title').textContent = pageContent.title
          this.pageTitle = pageContent.title;
          this.pageAuthor = pageContent.author;
          this.pageContent = pageContent.content;
          this.pageBanner = pageContent.banner;
          this.pageThumbnail = pageContent.thumbnail;
          this.loading = false;
        })
        .catch(error => console.error('Something went wrong while retrieving the entry. Details:', error));
    }
  }
};
</script>
