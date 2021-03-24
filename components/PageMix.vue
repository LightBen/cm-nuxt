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
  name: 'PageMix',
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
      pageTitle: this.pageTitle,
      pageContent: this.pageContent,
      loading: true
    }
  },
  props: {
    pageId: {
      type: String
    }
  },
  async asyncData({app}) {
    try {
      const pageContent = app.flamelink.content.get({
        schemaKey: 'pages',
        entryId: this.$route.meta.entryId,
        // entryId: 'EJPLGthI0WMQ0tlrqPsA', // example: about page entry ID
        // populate: true
      })
      return {
        pageTitle: pageContent.title,
        pageContent: pageContent.content,
        dataEntryId: this.$route.meta.entryId,
        loading: false,
      }
    } catch(error) {
      console.error('Something went wrong while retrieving the entry. Details:', error);
      return { loading: false, error: true }
    }
  },
}
</script>
