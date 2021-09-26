<template>
  <div id="page-halakha" class="page-page">
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
          content: 'Minhaguei Halakha | מנהגי הלכה'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:title',
          content: 'Halakha | הלכה'
        },
        {
          property: 'og:description',
          content: 'Minhaguei Halakha | מנהגי הלכה'
        },
        {
          property: 'og:image',
          content: '/cm-logo-full.png'
        }
      ]

    }
  },
  name: 'PageHalakha',
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
    ogPageHalakha() {
      return this.$store.state.ogPageHalakha
    }
  },
  async mounted() {
    this.dataEntryId = this.entryId;
    if (!this.dataEntryId) {
      this.dataEntryId = this.$route.params.halakha_url
    }
    await this.getContent();
    this.$root.$on('langChanged', this.getContent);
    document.querySelector('meta[name="og:title"]').setAttribute("content", this.ogPageHalakha.pageTitle)
    document.querySelector('meta[property="og:image"]').setAttribute("content", this.ogPageHalakha.pageThumbnail)
    document.querySelector('title').textContent = this.ogPageHalakha.pageTitle
  },
  methods: {
    async getContent() {
      try {
        const pageContent = await this.$flamelinkApp.content.get({
          schemaKey: 'minhag',
          entryId: this.dataEntryId
        })
        if (pageContent) {
          // console.log(pageContent.thumbnail)
          let ogJson = {
            pageTitle: pageContent.title,
            pageThumbnail: pageContent.thumbnail
          }
          this.$store.commit('setogPageHalakha', ogJson)
          this.pageTitle = pageContent.title;
          this.pageContent = pageContent.content;
          this.pageBanner = pageContent.banner;
          this.loading = false;
        }
      } catch (error) {
        console.error('Something went wrong while retrieving the entry. Details:', error);
      }

      // })
      // .catch(error => );
    }
  }
};
</script>
