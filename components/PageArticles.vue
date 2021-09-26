<template>
  <div id="page-articles" class="page-page">
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
        <div id="page-content" v-html="pageContent"></div>
      </div>
    </slot>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  head() {
    const title = 'Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'Articles | מאמרים'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:title',
          content: 'Articles | Constantine Minhagim'
        },
        {
          property: 'og:description',
          content: 'Articles | מאמרים'
        },
        {
          property: 'og:image',
          content: '/cm-og-default.jpg'
        }
      ]

    }
  },
  name: 'PageArticles',
  components: {
    Loading
  },
  metaInfo() {
    return {
      title: this.pageTitle,
    }
  },
  data() {
    return {
      dataEntryId: '',
      pageTitle: '',
      pageAuthor: '',
      pageContent: '',
      pageBanner: '',
      loading: true
    }
  },
  props: ['entryId'],
  computed: {
    ogPageArticles() {
      return this.$store.state.ogPageArticles
    }
  },
  async mounted() {
    this.dataEntryId = this.entryId;
    if (!this.dataEntryId) {
      this.dataEntryId = this.$route.params.articles_url
    }
    await this.getContent();
    this.$root.$on('langChanged', this.getContent);
    document.querySelector('meta[name="og:title"]').setAttribute("content", this.ogPageArticles.pageTitle)
    document.querySelector('meta[property="og:image"]').setAttribute("content", this.ogPageArticles.banner)
    document.querySelector('title').textContent = this.ogPageArticles.pageTitle
  },
  methods: {
    async getContent() {
      const pageContent = await this.$flamelinkApp.content.get({
        schemaKey: 'articles',
        entryId: this.dataEntryId
      })
      if (pageContent) {
        // let newTitleVal = this.cuisinePage + '| Constantine Minhagim'
        // let ogThumbnail = pageContent.thumbnail
        let ogJson = {
          pageTitle: pageContent.title,
          pageBanner: pageContent.banner
        }
        this.$store.commit('setOgPageArticles', ogJson)
        this.pageTitle = pageContent.title;
        this.pageAuthor = pageContent.author;
        this.pageContent = pageContent.content;
        this.pageBanner = pageContent.banner;
        this.loading = false;
      }
      // .then(pageContent => {

      // })
      // .catch(error => console.error('Something went wrong while retrieving the entry. Details:', error));
    }
  }
};
</script>
