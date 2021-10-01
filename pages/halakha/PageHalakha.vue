<template>
    <div id="page-halakha" class="page-page">
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
                schemaKey: 'minhag',
                entryId: route.params.halakha_url
            })
            // this.$route.params.halakha_url
            if (appData) {
                return {
                    pageTitle : appData.title,
                    // pageAuthor : appData.author,
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
        const title = (this.pageTitle) + 'Constantine Minhagim'
        return {
        title,
        meta: [
            {
                name: 'description',
                content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !).מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!)'
            },
            {
                name: 'og:type',
                content: 'website'
            },
            {
                name: 'og:title',
                content:  this.pageTitle + ' | Constantine Minhagim'
            },
            {
                property: 'og:description',
                content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !).מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!)'
            },
            {
                property: 'og:image',
                content: (this.pageThumbnail ? this.pageThumbnail : '/cm-logo-full.png' )
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
        ogPageHalakha () {
            return this.$store.state.ogPageHalakha
        },
        locale () {
            return this.$store.state.locale
        }
    },
    watch: {
        locale (newval, oldVal) {
            if (newval !== oldVal) {
                this.getContent()
            }
        }
    },
    async mounted() {
        this.dataEntryId = this.entryId;
        if (!this.dataEntryId) {
            this.dataEntryId = this.$route.params.halakha_url
        }
        // await this.getContent();
        this.$root.$on('langChanged', this.getContent());
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
