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
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: 'contact us page of Constantine Minhagim.'
        },
        {
          property: 'og:image',
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
