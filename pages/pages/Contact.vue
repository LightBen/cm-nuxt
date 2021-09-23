<template>
        <page-mix :pageId="pageId"></page-mix>    
</template>

<script>

export default {
    head () {
    const title = 'Contact | Constantine Minhagim'
    return {
      title,
      meta: [
        {
          name: 'description',
          content: 'contact us page of Constantine Minhagim.'
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
          content: 'contact us page of Constantine Minhagim.'
        },
        {
          name: 'og:image',
          content: '/cm-logo-full.png'
        }]
        
    }
  },
    name: "Contact",
    data() {
    	return {
    		pageId: "contact"
    	}
    }
};
</script>
