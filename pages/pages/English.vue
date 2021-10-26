<template>
  <page-mix :pageId="pageId"></page-mix>
</template>

<script>

export default {
  metaInfo() {
    return {
      title: 'English',
    }
  },
  head() {
    const title = 'English | Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'English page of Constantine Minhagim.'
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
          content: 'English page of Constantine Minhagim.'
        },
        {
          name: 'og:image',
          content: '/cm-og-default.jpg'
        }]

    }
  },
  name: "English",
  data() {
    return {
      pageId: "english"
    }
  }
};
</script>
