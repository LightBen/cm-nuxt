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
  mounted() {
    // console.log(this, "vueapp")
    this.loadData({app})

  },
  methods: {
    async loadData (app) {
      try {
      const pageContent = this.$flamelinkApp.content.get({
        schemaKey: 'pages',
        entryId: this.$route.meta.entryId,
        // entryId: 'EJPLGthI0WMQ0tlrqPsA', // example: about page entry ID
        // populate: true
      })
        .then((data) =>{
        this.pageTitle =  data.title
        this.pageContent = data.content
        this.dataEntryId = this.$route.meta.entryId
        this.loading = false
        })
        .catch((err) =>{
          console.error('Something went wrong while retrieving the entry. Details:', error);
          this.error = true;
          this.loading = false;
        })

    } catch(error) {
      console.error('Something went wrong while retrieving the entry. Details:', error);
      return { loading: false, error: true }
    }
    }
  }
}
</script>
