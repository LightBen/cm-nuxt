<template>
  <div>
    <client-only>
      <div id="home">
        <section class="section-full full-img" id="welcome">
          <div class="section-content">
            <div class="icon-home-main">
              <svg>
                <use href="#icon-logo-cm-main" />
              </svg>
            </div>
            <h1>
              <span id="siteTitle1Home">
                <span class="lang-fr">Constantine</span>
                <span class="lang-he">קונסטנטין</span>
              </span>
              <span id="siteTitle2Home">
                <span class="lang-fr">Minhagim</span>
                <span class="lang-he">מנהגים</span>
              </span>
            </h1>
            <div id="site-description">
              <span class="lang-fr"
                >Minhagim constantinois <br />et d'Afrique du Nord</span
              >
              <span class="lang-he">מנהגי קונסטנטין <br />וצפון אפריקה</span>
            </div>
            <div id="welcome-sections">
              <NuxtLink :to="{ name: 'Halakha' }" class="halakha">
                <svg class="icon-home-section">
                  <use href="#icon-star-david" />
                </svg>
                <span class="home-section-title lang-fr">Halakha</span>
                <span class="home-section-title lang-he">הלכה</span>
              </NuxtLink>
              <NuxtLink :to="{ name: 'Hazanout' }" class="hazanout">
                <svg class="icon-home-section">
                  <use href="#icon-music-1" />
                </svg>
                <span class="home-section-title lang-fr">'Hazanout</span>
                <span class="home-section-title lang-he">חזנות</span>
              </NuxtLink>
              <NuxtLink :to="{ name: 'Cuisine' }" class="cuisine">
                <svg class="icon-home-section">
                  <use href="#icon-food-tray" />
                </svg>
                <span class="home-section-title lang-fr">Cuisine</span>
                <span class="home-section-title lang-he">מתכונים</span>
              </NuxtLink>
              <NuxtLink :to="{ name: 'Articles' }" class="articles">
                <svg class="icon-home-section">
                  <use href="#icon-document" />
                </svg>
                <span class="home-section-title lang-fr">Articles</span>
                <span class="home-section-title lang-he">מאמרים</span>
              </NuxtLink>
              <a
                href="https://www.youtube.com/channel/UCuZ5tVv28xXn6kQcv_u5ufg"
                target="_blank"
                class="drive"
                rel="noopener"
              >
                <svg class="icon-home-section">
                  <use href="#icon-youtube" />
                </svg>
                <span class="home-section-title">
                  <span class="lang-fr">YouTube</span>
                  <span class="lang-he">יוטוב</span>
                  <svg class="icon-label d-none">
                    <use href="#icon-external" />
                  </svg>
                </span>
              </a>
              <a
                href="https://www.facebook.com/groups/185262976153983"
                target="_blank"
                class="drive"
                rel="noopener"
              >
                <svg class="icon-home-section">
                  <use href="#icon-fb" />
                </svg>
                <span class="home-section-title">
                  <span class="lang-fr">Facebook</span>
                  <span class="lang-he">פייסבוק</span>
                  <svg class="icon-label d-none">
                    <use href="#icon-external" />
                  </svg>
                </span>
              </a>
              <a
                href="https://drive.google.com/drive/folders/0BzlEWQTUwxa6YnRYYkJFU0NWalE?usp=sharing"
                target="_blank"
                class="drive d-none"
                rel="noopener"
              >
                <svg class="icon-home-section">
                  <use href="#icon-storage" />
                </svg>
                <span class="home-section-title">
                  <span class="lang-fr">Drive</span>
                  <span class="lang-he">דרייב</span>
                  <svg class="icon-label">
                    <use href="#icon-external" />
                  </svg>
                </span>
              </a>
              <NuxtLink
                :to="{ name: 'Home' }"
                class="siddour section-disabled d-none"
              >
                <svg class="icon-home-section">
                  <use href="#icon-book-fill" />
                </svg>
                <span class="home-section-title lang-fr">Bientôt...</span>
                <span class="home-section-title lang-he">בקרוב</span>
              </NuxtLink>
            </div>
          </div>
        </section>
      </div>
    </client-only>
  </div>
</template>

<style src="./home.scss" lang="scss"></style>

<script>
export default {
  name: "home",
  metaInfo() {
    return {
      title: "Constantine Minhagim | קונסטנטין מנהגים",
      titleTemplate: null,
    };
  },
  async asyncData({ route, app }) {
    try {
      const data = await app.flamelink.content.get({
        schemaKey: "general",
        // populate: true
      });
      // console.log({data})
      return {
        // pageTitle: general.title,
        pageTitle: data["56Mopx0dRrhGql4KrFQX"].title,
        siteTitle1: data["hWHhdCrUx34iDIsPZokP"].title,
        siteTitle2: data["crXGbshLALxsrrmX0APz"].title,
        loading: false,
      };
    } catch (error) {
      console.error(
        "Something went wrong while retrieving the entry. Details:",
        error
      );
      return { loading: false, error: true };
    }
  },
  components: {},
  mounted() {
    this.$root.$on("langChanged", this.getContent);
    document.body.classList.add("is-homepage");

    console.log("index");
  },
  beforeCreate: function () {},
  beforeDestroy: function () {
    document.body.classList.remove("is-homepage");
  },
};
</script>
