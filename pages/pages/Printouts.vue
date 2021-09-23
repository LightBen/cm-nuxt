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
            name: 'og:type',
            content: 'website'
            },
            {
            name: 'og:title',
            content: title
            },
            {
            name: 'og:description',
            content: 'Printouts page of Constantine Minhagim.'
            },
            {
            name: 'og:image',
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
