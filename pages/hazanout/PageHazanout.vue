<template>
    <div id="page-hazanout" class="page-page">
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
                schemaKey: 'hazanout',
                entryId: route.params.hazanout_url
            })
            if (appData) {
                console.log(appData.thumbnail)
                return {
                    pageTitle : appData.title,
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
                name: 'description',
                content: 'Minhagim constantinois et sefarade d\'Afrique du Nord (Torah, Halakha, Hazanout, Cuisine !).מנהגי קונסטנטין וספרדי צפון אפריקה (תורה, הלכה, חזנות ומתכונים!)'
            },
            {
                name: 'og:type',
                content: 'website'
            },
            {
                name: 'og:title',
                content:  title
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
    watch: {
        locale (newval, oldVal) {
            if (newval !== oldVal) {
                this.getContent()
            }
        }
    },
    computed: {
        ogPageHazanout () {
            return this.$store.state.ogPageHazanout
        },
        locale () {
            return this.$store.state.locale
        }
    },
    async mounted() {
        this.dataEntryId = this.entryId;
        if (!this.dataEntryId) {
            this.dataEntryId = this.$route.params.hazanout_url
        }
        // await this.getContent();
        this.$root.$on('langChanged', this.getContent());
    },
    methods: {
        async getContent() {
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
        }
    }
};
</script>
