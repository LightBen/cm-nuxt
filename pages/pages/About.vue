<template>
  <page-mix :pageId="pageId"></page-mix>
</template>

<script>
export default {
  head () {
    const title = 'About' + ' | Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'Share feedbacks & suggestions about  with our team to help us shape our product.'
        },
        {
          name: 'og:type',
          content: 'website'
        },
        {
          name: 'og:title',
          content: title
        },
        {
          name: 'og:description',
          content: 'Share feedbacks & suggestions about with our team to help us shape our product.'
        },
        {
          name: 'og:image',
          content: '/cm-logo-full.png'
        }]
        
    }
  },
  name: "About",
  data() {
    return {
      pageId: "about"
    }
  }
};
</script>
