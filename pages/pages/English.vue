<template>
    <page-mix :pageId="pageId"></page-mix>  
</template>

<script>

export default {
    head () {
        const title = 'English | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'English page of Constantine Minhagim.'
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
            content: 'English page of Constantine Minhagim.'
            },
            {
            property: 'og:image',
            content: '/cm-logo-full.png'
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
