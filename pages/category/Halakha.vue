<template>
  <div>
    <client-only>
      <div id="halakha" class="page-category" :class="[ (this.grid) ? 'grid' : 'list' ]">
        <transition name="fade">
          <Loading v-if="loading"/>
        </transition>
        <div class="page-title-container">
          <div class="container">
            <h1 id="page-title" v-if="!loading">
              <span class="lang-fr">Halakha</span>
              <span class="lang-he">הלכה</span>
            </h1>
          </div>
        </div>
        <div class="container">
          <div id="search-container">
            <div id="search-filter">
              <input type="text" required @input="filterSearch">
              <label class="lang-fr">Rechercher</label>
              <label class="lang-he">לחפש</label>
            </div>
            <div class="display-switch-container">
              <div class="display-switch">
                <div class="display-choice display-grid" @click="grid = true">
                  <svg class="icon-grid">
                    <use xlink:href="#icon-grid" href="#icon-grid"/>
                  </svg>
                  <div class="display-label">
                    <span class="lang-fr">Grille</span>
                    <span class="lang-he">רשת</span>
                  </div>
                </div>
                <div class="display-choice display-list" @click="grid = false">
                  <svg class="icon-list">
                    <use xlink:href="#icon-list" href="#icon-list"/>
                  </svg>
                  <div class="display-label">
                    <span class="lang-fr">Liste</span>
                    <span class="lang-he">רשימה</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="halakhaContent" class="grid-container" v-if="!loading">
            <router-link class="grid-element card" v-for="(element, key) in elements" :key="key"
                         :to="{ name: 'halakha-url', params: {entryId: key, halakha_url: key} }">
              <figure class="card-content" tabindex="0">
                <div class="card-img" v-if="grid === true && element.thumbnail && element.thumbnail.length"
                     :style="{ 'background-image': 'url(' + element.thumbnail + ')' }"></div>
                <div class="card-img" v-else></div>
                <figcaption class="card-text">
                  <div class="card-title mdc-typography mdc-typography--headline6">{{ element.title }}</div>
                  <div class="card-tags d-none">{{ element.tags }}</div>
                </figcaption>
              </figure>
            </router-link>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import Loading from '@/components/Loading'

export default {
  metaInfo() {
    return {
      title: 'Halakha | הלכה',
    }
  },
  head() {
    const title = 'Halakha | Constantine Minhagim'
    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Minhaguei Halakha | מנהגי הלכה'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Minhaguei Halakha | מנהגי הלכה'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/cm-og-default.jpg'
        }
      ]

    }
  },
  name: "Halakha",
  components: {
    Loading
  },
  data() {
    return {
      elements: [],
      pageTitle: 'Halakha',
      pageTitleHe: 'הלכה',
      loading: true,
      grid: true
    }
  },
  watch: {
    locale(newval, oldVal) {
      if (newval !== oldVal) {
        this.getContent()
      }
    }
  },
  computed: {
    locale() {
      return this.$store.state.locale
    }
  },
  mounted() {
    this.$nuxt.$on('langChanged', this.getContent());
    this.setPageTitle();
    this.getContent()
  },
  created() {
    // this.getContent()
  },
  methods: {
    getContent() {
      this.$flamelinkApp.content.get({
        schemaKey: 'minhag',
        fields: ['title', 'url', 'author', 'description', 'thumbnail', 'tags']
      })
        .then(elements => {
          this.elements = elements;
          this.loading = false;
          setTimeout(() => {
            this.entries = document.querySelectorAll('.grid-element')
          }, 100);
        })
    },
    setPageTitle() {
      this.$flamelinkApp.settings.getLocale()
        .then(locale => {
          if (locale === 'he') {
            this.pageTitle = this.pageTitleHe
          }
        })
    },
    filterSearch(event) {
      let value = event.target.value;
      for (var i = 0, l = this.entries.length; i < l; i++) {
        var entryText = this.entries[i].getElementsByClassName('card-text')[0].innerHTML;
        if (entryText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().indexOf(value.toLowerCase()) != -1) {
          this.entries[i].classList.remove("card-hidden");
        } else this.entries[i].classList.add("card-hidden");
      }
    }
  },
  //   async asyncData (context) {
  //     try {
  //     //     console.log(context.app.flamelink, 'datacon')
  //     //   this.elements = await context.app.flamelink.content.get({
  //     //     schemaKey: 'minhag',
  //     //     fields: ['title', 'url', 'author', 'description', 'thumbnail', 'tags'],
  //     //     populate: true
  //     //   })
  //     //   this.loading = false;
  //         // this.getContent()
  //         console.log(context)
  //     } catch (error) {
  //         console.log(error, 'err')
  //       console.error('Something went wrong while retrieving the entry. Details:', error);
  //     //   return { loading: false, error: true }
  //     }
  //   },
  fetchOnServer: false
};
</script>
