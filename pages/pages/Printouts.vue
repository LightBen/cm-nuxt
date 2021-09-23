<template>
        <page-mix :pageId="pageId"></page-mix>   
</template>

<script>

export default {
    head () {
        const title = 'Printouts | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'Printouts page of Constantine Minhagim.'
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
            content: 'Printouts page of Constantine Minhagim.'
            },
            {
            property: 'og:image',
            content: '/cm-logo-full.png'
            }]
            
        }
    }, 
    name: "Printouts",
    data() {
    	return {
    		pageId: "printouts"
    	}
    }
};
</script>
