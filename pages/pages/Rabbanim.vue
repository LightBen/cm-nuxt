<template>
  <page-mix :pageId="pageId"></page-mix>
</template>

<script>

export default {
  metaInfo() {
    return {
      title: 'Rabbins | רבנים',
    }
  },
  head() {
    const title = 'Rabbanim | Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'Rabbanim page of Constantine Minhagim.'
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
          content: 'Rabbanim page of Constantine Minhagim.'
        },
        {
          name: 'og:image',
          content: '/cm-og-default.jpg'
        }]

    }
  },
  name: "Rabbanim",
  data() {
    return {
      pageId: "rabbanim"
    }
  }
};
</script>
