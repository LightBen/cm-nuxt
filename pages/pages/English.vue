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
