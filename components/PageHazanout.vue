<template>
  <div id="page-hazanout" class="page-page">
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
          content: 'Hazanout | חזנות'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:title',
          content: 'Hazanout | חזנות'
        },
        {
          property: 'og:description',
          content: 'Hazanout | חזנות'
        },
        {
          property: 'og:image',
          content: '/cm-logo-full.png'
        }
      ]

    }
  },
  name: 'PageHazanout',
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
      pageContent: '',
      pageBanner: '',
      loading: true
    }
  },
  props: ['entryId'],
  computed: {
    ogPageHazanout() {
      return this.$store.state.ogPageHazanout
    }
  },
  async mounted() {
    this.dataEntryId = this.entryId;
    if (!this.dataEntryId) {
      this.dataEntryId = this.$route.params.hazanout_url
    }
    await this.getContent();
    this.$root.$on('langChanged', this.getContent);
    document.querySelector('meta[name="og:title"]').setAttribute("content", this.ogPageHazanout.pageTitle)
    document.querySelector('meta[property="og:image"]').setAttribute("content", this.ogPageHazanout.pageThumbnail)
    document.querySelector('title').textContent = this.ogPageHazanout.pageTitle
  },
  methods: {
    async getContent() {
      // console.log(this.$flamelinkApp, 'FLAM')
      const pageContent = await this.$flamelinkApp.content.get({
        schemaKey: 'hazanout',
        entryId: this.dataEntryId
      })
      if (pageContent) {
        let ogJson = {
          pageTitle: pageContent.title,
          pageThumbnail: pageContent.thumbnail
        }
        this.$store.commit('setogPageHazanout', ogJson)
        this.pageTitle = pageContent.title;
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
