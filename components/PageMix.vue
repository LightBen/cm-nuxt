<template>
  <div class="page-mix page-page" :id="pageId">
    <transition name="fade">
      <Loading v-if="loading"/>
    </transition>
    <slot name="page-content">
      <div class="page-title-container">
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
          hid: 'description',
          name: 'description',
          content: 'Page du site'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'Page du site | Constantine Minhagim'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Page du site'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.pageThumbnail ? this.pageThumbnail : '/cm-og-default.jpg'
        }
      ]

    }
  },
  name: 'PageMix',
  components: {
    Loading
  },
  data() {
    return {
      pageTitle: this.pageTitle,
      pageContent: this.pageContent,
      pageThumbnail: this.pageThumbnail,
      loading: true
    }
  },
  props: {
    pageId: {
      type: String
    }
  },
  computed: {
    ogPagemix() {
      return this.$store.state.ogPagemix
    },
    locale () {
      return this.$store.state.locale
    }
  },
  watch: {
    locale (newval, oldVal) {
      if (newval !== oldVal) {
        this.loadData()
      }
    }
  },
  async mounted() {
    // console.log(this, "vueapp")
    await this.loadData({app})
    document.querySelector('meta[name="og:title"]').setAttribute("content", this.ogPagemix.pageTitle)
    // document.querySelector('meta[property="og:image"]').setAttribute("content", this.ogPageHazanout.pageThumbnail)
    document.querySelector('title').textContent = this.ogPagemix.pageTitle

  },
  methods: {
    async loadData(app) {
      try {
        const pageContent = await this.$flamelinkApp.content.get({
          schemaKey: 'pages',
          entryId: this.$route.meta.entryId,
          // entryId: 'EJPLGthI0WMQ0tlrqPsA', // example: about page entry ID
          // populate: true
        })
        if (pageContent) {
          let ogJson = {
            pageTitle: pageContent.title,
            pageThumbnail: pageContent.thumbnail
          }
          // console.log(pageContent)
          this.$store.commit('setogPagemix', ogJson)
          this.pageTitle = pageContent.title
          this.pageContent = pageContent.content
          this.pageBanner = pageContent.banner
          this.pageThumbnail = pageContent.thumbnail
          this.dataEntryId = this.$route.meta.entryId
          this.loading = false
        }
      } catch (error) {
        console.error('Something went wrong while retrieving the entry. Details:', error);
        this.error = true;
        this.loading = false;
      }
      // .then((data) =>{

      // })
      // .catch((err) =>{

      // })
    }
  }
}
</script>
