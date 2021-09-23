<template>
    <page-mix :pageId="pageId"></page-mix>
</template>

<script>

export default {
    head () {
        const title = 'Rabbanim | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'Rabbanim page of Constantine Minhagim.'
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
            content: 'Rabbanim page of Constantine Minhagim.'
            },
            {
            property: 'og:image',
            content: '/cm-logo-full.png'
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
