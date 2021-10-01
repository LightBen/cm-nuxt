<template>
    <div id="page-articles" class="page-page">
        <transition name="fade">
            <Loading v-if="loading" />
        </transition>
        <slot name="page-content">
            <div class="page-title-container">
                <figure v-if="pageBanner && pageBanner.length" :style="{ 'background-image': 'url(' + pageBanner + ')' }"></figure>
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
    async asyncData({route, app}) {
        try {
            const appData = await app.flamelink.content.get({
                schemaKey: 'articles',
                entryId: route.params.articles_url
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
        } catch (error) {
            console.error('Something went wrong while retrieving the entry. Details:', error);
        }
    },
    head () {
    const title = (this.pageTitle) + ' | Constantine Minhagim'
      return {
      title,
      meta: [
          {
            hid:  'description',   
            name: 'description',
            content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !). מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!)'
          },
          {
            hid: 'og:type',
            name: 'og:type',
            content: 'website'
          },
          {
            hid: 'og:title',
            name: 'og:title',
            content:  'Constantine Minhagim'
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !). מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!)'
          },
          {
            hid: 'og:image',
            property: 'og:image',
            content: (this.pageThumbnail ? this.pageThumbnail : '/cm-logo-full.png' )
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
    watch: {
        locale (newval, oldVal) {
            if (newval !== oldVal) {
            this.getContent()
            }
        }
    },
    computed: {
        ogPageArticles () {
            return this.$store.state.ogPageArticles
        },
        locale () {
            return this.$store.state.locale
        }
    },
    async mounted() {
        this.dataEntryId = this.entryId;
        if (!this.dataEntryId) {
            this.dataEntryId = this.$route.params.articles_url
        }
        // await this.getContent();
        this.$root.$on('langChanged', this.getContent());
    },
    methods: {
        async getContent() {
            const pageContent = await this.$flamelinkApp.content.get({
                schemaKey: 'articles',
                entryId: this.dataEntryId
            })
            if (pageContent) {
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
        }
    }
};
</script>
