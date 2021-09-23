<template>
    <page-mix :pageId="pageId"></page-mix>    
</template>

<script>

export default {
    head () {
        const title = 'Donate | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'Donate page of Constantine Minhagim.'
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
            content: 'Donate page of Constantine Minhagim.'
            },
            {
            property: 'og:image',
            content: '/cm-logo-full.png'
            }]
            
        }
    },
    name: "Donate",
    data() {
    	return {
    		pageId: "donate"
    	}
    }
};
</script>
