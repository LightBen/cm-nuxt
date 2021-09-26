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
            name: 'og:type',
            content: 'website'
            },
            {
            name: 'og:title',
            content: title
            },
            {
            name: 'og:description',
            content: 'Donate page of Constantine Minhagim.'
            },
            {
            name: 'og:image',
            content: '/cm-og-default.jpg'
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
