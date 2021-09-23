<template>
    <page-mix :pageId="pageId"></page-mix>  
</template>

<script>

export default {
    head () {
        const title = 'Siddour | Constantine Minhagim'
        return {
        title,
        meta: [
            {
            name: 'description',
            content: 'Siddour page of Constantine Minhagim.'
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
            content: 'Siddour page of Constantine Minhagim.'
            },
            {
            property: 'og:image',
            content: '/cm-logo-full.png'
            }]
            
        }
    },
    name: "Siddour",
    data() {
        return {
            pageId: "siddur"
        }
    }
};
</script>
